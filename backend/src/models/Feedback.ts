import mongoose, { Document } from 'mongoose';

export interface IFeedback extends Document {
  session: mongoose.Types.ObjectId;
  reviewer: mongoose.Types.ObjectId;
  reviewee: mongoose.Types.ObjectId;
  rating: number; // e.g., 1-5
  comment?: string;
  createdAt: Date;
}

const FeedbackSchema = new mongoose.Schema({
  session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  reviewer: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  reviewee: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
}, { timestamps: true });

export default mongoose.model<IFeedback>('Feedback', FeedbackSchema);