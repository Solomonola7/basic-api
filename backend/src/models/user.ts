import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  role: 'admin' | 'mentor' | 'mentee';
  name?: string;
  bio?: string;
  skills?: string[];
}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'mentor', 'mentee'], required: true },
  name: { type: String },
  bio: { type: String },
  skills: [String],
});

export default mongoose.model<IUser>('User', UserSchema);