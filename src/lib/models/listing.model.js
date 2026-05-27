import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: ['house', 'flat', 'land'],
      required: true,
    },
    listingFor: {
      type: String,
      enum: ['sale', 'rent'],
      required: true,
    },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ['active', 'pending', 'sold', 'rented', 'expired'],
      default: 'active',
    },
    bedrooms: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 0 },
    toilets: { type: Number, default: 0 },
    sizeSqm: { type: Number, default: null },
    images: { type: [String], required: true },
    location: {
      state: { type: String, required: true },
      city: { type: String, required: true },
      area: { type: String, required: true },
      address: { type: String, default: null },
      coordinates: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], default: null },
      },
    },
    contact: {
      phone: { type: String, required: true },
      whatsapp: { type: String, required: true },
      email: { type: String, default: null },
    },
    postedBy: { type: [String], required: true },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

listingSchema.index({ 'location.coordinates': '2dsphere' });
listingSchema.index({ status: 1, listingFor: 1, 'location.state': 1 });
listingSchema.index({ price: 1 });
listingSchema.index({ createdAt: -1 });
listingSchema.index({
  title: 'text',
  description: 'text',
  'location.area': 'text',
});

const Listing =
  mongoose.models.Listing || mongoose.model('Listing', listingSchema);
export default Listing;