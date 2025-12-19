import mongoose from 'mongoose';

const amenitiesSchema = new mongoose.Schema(
  {
    wifi: { type: Boolean, default: false },
    airConditioning: { type: Boolean, default: false },
    washingMachine: { type: Boolean, default: false },
    fridge: { type: Boolean, default: false },
    parking: { type: Boolean, default: false },
    elevator: { type: Boolean, default: false },
    balcony: { type: Boolean, default: false },
    petFriendly: { type: Boolean, default: false }
  },
  { _id: false }
);

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    price: { type: Number, required: true },
    furnished: { type: Boolean, default: false },
    smokingAllowed: { type: Boolean, default: false },
    gender: { type: String, enum: ['male', 'female'], required: true },
    amenities: { type: amenitiesSchema, default: () => ({}) },
    images: [{ type: String }],
    contact_Email: { type: String, required: true },
    contact_Phone: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
