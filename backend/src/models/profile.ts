import mongoose, { Document } from 'mongoose';

export interface IProfile extends Document {
  user: mongoose.Types.ObjectId;
  bio?: string;
  skills?: string[];
  availability?: string;
  // add other profile fields
}

const ProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bio: String,
  skills: [String],
  availability: String,
});

export default mongoose.model<IProfile>('Profile', ProfileSchema);