"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CreateListing() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "house",
    listingFor: "sale",
    price: "",
    status: "active",
    bedrooms: 0,
    bathrooms: 0,
    toilets: 0,
    sizeSqm: "",
    location: {
      state: "",
      city: "",
      area: "",
      address: "",
    },
    contact: {
      phone: "",
      whatsapp: "",
      email: "",
    },
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Handle nested fields (location and contact)
    if (id.startsWith("location.") || id.startsWith("contact.")) {
      const [parent, child] = id.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    if (files.length + images.length > 10) {
      setError("Maximum 10 images allowed");
      return;
    }

    setImageUploadLoading(true);
    setError(null);

    const data = new FormData();
    files.forEach((file) => data.append("images", file));

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      setImages((prev) => [...prev, ...result.imageUrls]);
    } catch (err) {
      setError(err.message);
    } finally {
      setImageUploadLoading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setError(null);

    if (images.length === 0) {
      setError("Please upload at least one image");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, images }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-700 mb-2">
          Add New Listing
        </h1>

        {/* Step indicator */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition ${
                s <= step ? "bg-slate-700" : "bg-slate-200"
              }`}
            />
          ))}
        </div>

        {/* Step 1 — Basic Info */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-4">
            <h2 className="font-semibold text-slate-600">Basic Information</h2>

            <div className="flex flex-col gap-1">
              <label htmlFor="title" className="text-sm text-slate-600">
                Property Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="e.g. 3 Bedroom Flat in Lekki Phase 1"
                className="border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="text-sm text-slate-600">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Describe the property..."
                className="border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="type" className="text-sm text-slate-600">
                  Property Type
                </label>
                <select
                  id="type"
                  className="border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="house">House</option>
                  <option value="flat">Flat</option>
                  <option value="land">Land</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="listingFor" className="text-sm text-slate-600">
                  Listing For
                </label>
                <select
                  id="listingFor"
                  className="border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                  value={formData.listingFor}
                  onChange={handleChange}
                >
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="price" className="text-sm text-slate-600">
                Price (₦)
              </label>
              <input
                id="price"
                type="number"
                placeholder="e.g. 5000000"
                className="border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {/* Step 2 — Property Details */}
        {step === 2 && (
          <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-4">
            <h2 className="font-semibold text-slate-600">Property Details</h2>

            {formData.type !== "land" && (
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="bedrooms" className="text-sm text-slate-600">
                    Bedrooms
                  </label>
                  <input
                    id="bedrooms"
                    type="number"
                    min="0"
                    className="border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                    value={formData.bedrooms}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="bathrooms" className="text-sm text-slate-600">
                    Bathrooms
                  </label>
                  <input
                    id="bathrooms"
                    type="number"
                    min="0"
                    className="border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                    value={formData.bathrooms}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="toilets" className="text-sm text-slate-600">
                    Toilets
                  </label>
                  <input
                    id="toilets"
                    type="number"
                    min="0"
                    className="border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                    value={formData.toilets}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label htmlFor="sizeSqm" className="text-sm text-slate-600">
                Size (sqm) — optional
              </label>
              <input
                id="sizeSqm"
                type="number"
                min="0"
                placeholder="e.g. 120"
                className="border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                value={formData.sizeSqm}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="status" className="text-sm text-slate-600">
                Status
              </label>
              <select
                id="status"
                className="border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="sold">Sold</option>
                <option value="rented">Rented</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 3 — Location & Contact */}
        {step === 3 && (
          <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-4">
            <h2 className="font-semibold text-slate-600">Location & Contact</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="location.state"
                  className="text-sm text-slate-600"
                >
                  State
                </label>
                <select
                  id="location.state"
                  className="border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                  value={formData.location.state}
                  onChange={handleChange}
                >
                  <option value="">Select state</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Abuja">Abuja</option>
                  <option value="Rivers">Rivers</option>
                  <option value="Oyo">Oyo</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="location.city"
                  className="text-sm text-slate-600"
                >
                  City
                </label>
                <input
                  id="location.city"
                  type="text"
                  placeholder="e.g. Lekki"
                  className="border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                  value={formData.location.city}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="location.area" className="text-sm text-slate-600">
                Area / Neighbourhood
              </label>
              <input
                id="location.area"
                type="text"
                placeholder="e.g. Lekki Phase 1"
                className="border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                value={formData.location.area}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="location.address"
                className="text-sm text-slate-600"
              >
                Full Address — optional
              </label>
              <input
                id="location.address"
                type="text"
                placeholder="e.g. 12 Admiralty Way"
                className="border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                value={formData.location.address}
                onChange={handleChange}
              />
            </div>

            <hr className="border-slate-100" />
            <h2 className="font-semibold text-slate-600">Contact Details</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="contact.phone"
                  className="text-sm text-slate-600"
                >
                  Phone Number
                </label>
                <input
                  id="contact.phone"
                  type="tel"
                  placeholder="e.g. 08012345678"
                  className="border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                  value={formData.contact.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="contact.whatsapp"
                  className="text-sm text-slate-600"
                >
                  WhatsApp Number
                </label>
                <input
                  id="contact.whatsapp"
                  type="tel"
                  placeholder="e.g. 08012345678"
                  className="border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                  value={formData.contact.whatsapp}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="contact.email" className="text-sm text-slate-600">
                Email — optional
              </label>
              <input
                id="contact.email"
                type="email"
                placeholder="contact@example.com"
                className="border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                value={formData.contact.email}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {/* Step 4 — Images */}
        {step === 4 && (
          <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-4">
            <h2 className="font-semibold text-slate-600">Property Images</h2>
            <p className="text-xs text-slate-400">
              Upload up to 10 images. First image will be the cover photo.
            </p>

            <label className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:border-slate-400 transition">
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              {imageUploadLoading ? (
                <p className="text-slate-400 text-sm">Uploading...</p>
              ) : (
                <p className="text-slate-400 text-sm">
                  Click to select images or drag and drop
                </p>
              )}
            </label>

            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {images.map((url, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={url}
                      alt={`Property ${index + 1}`}
                      width={300}
                      height={96}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    {index === 0 && (
                      <span className="absolute top-1 left-1 bg-slate-700 text-white text-xs px-2 py-0.5 rounded">
                        Cover
                      </span>
                    )}
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg mt-4">
            {error}
          </p>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="px-6 py-3 border border-slate-300 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition"
            >
              Back
            </button>
          )}
          {step < 4 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="ml-auto px-6 py-3 bg-slate-700 text-white rounded-lg text-sm hover:bg-slate-600 transition"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="ml-auto px-6 py-3 bg-slate-700 text-white rounded-lg text-sm hover:bg-slate-600 transition disabled:opacity-50"
            >
              {loading ? "Publishing..." : "Publish Listing"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
