import { useSelector, useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from '../redux/user/userSlice';

export default function Profile() {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({});
  const [imageUploading, setImageUploading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // 🔥 CLOUDINARY IMAGE UPLOAD
  const handleImageChange = async (file) => {
    if (!file) return;

    setImageUploading(true);

    const data = new FormData();
    data.append('file', file);
    data.append(
      'upload_preset',
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: 'POST',
          body: data,
        }
      );

      const uploaded = await res.json();

      setFormData((prev) => ({
        ...prev,
        avatar: uploaded.secure_url,
      }));
    } catch (err) {
      console.error('Cloudinary upload failed', err);
    } finally {
      setImageUploading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (err) {
      dispatch(updateUserFailure(err.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='file'
          hidden
          ref={fileRef}
          accept='image/*'
          onChange={(e) => handleImageChange(e.target.files[0])}
        />

        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center'
        />

        {imageUploading && (
          <p className='text-sm text-slate-600 text-center'>
            Uploading image...
          </p>
        )}

        <input
          type='text'
          id='username'
          defaultValue={currentUser.username}
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />

        <input
          type='email'
          id='email'
          defaultValue={currentUser.email}
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />

        <input
          type='password'
          id='password'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>

      <p className='text-red-700 mt-5'>{error}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess && 'User updated successfully!'}
      </p>
    </div>
  );
}