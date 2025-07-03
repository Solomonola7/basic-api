import mongoose, { Document } from 'mongoose';

export interface IMentorshipRequest extends Document {
  mentee: mongoose.Types.ObjectId;
  mentor: mongoose.Types.ObjectId;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  message?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MentorshipRequestSchema = new mongoose.Schema(
  {
    mentee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'accepted', 'declined', 'completed'], default: 'pending' },
    message: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IMentorshipRequest>('MentorshipRequest', MentorshipRequestSchema);