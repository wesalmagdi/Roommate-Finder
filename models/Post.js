import mongoose from 'mongoose';

// Embedded schema for amenities
const amenitiesSchema = new mongoose.Schema(
  {
    wifi: { type: Boolean, default: false },
    airConditioning: { type: Boolean, default: false },
    washingMachine: { type: Boolean, default: false },
    fridge: { type: Boolean, default: false },
    parking: { type: Boolean, default: false },
    elevator: { type: Boolean, default: false },
    balcony: { type: Boolean, default: false }
  },
  { _id: false }
);

// Main post schema
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    location: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },

    price: { type: Number, required: true },

    furnished: { type: Boolean, default: false },
    smokingAllowed: { type: Boolean, default: false },

    gender: {
      type: String,
      enum: ['male', 'female', 'any'],
      required: true
    },

    amenities: {
      type: amenitiesSchema,
      default: () => ({})
    },

    images: [{ type: String }],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Post', postSchema);
