import mongoose, { Document } from 'mongoose';

export interface ISession extends Document {
  mentor: mongoose.Types.ObjectId;
  mentee: mongoose.Types.ObjectId;
  date: Date;
  topic?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  meetingLink?: string; // e.g., Zoom link
}

const SessionSchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mentee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  topic: String,
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
  meetingLink: String,
});

export default mongoose.model<ISession>('Session', SessionSchema);