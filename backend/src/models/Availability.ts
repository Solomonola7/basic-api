import mongoose, { Document } from 'mongoose';

export interface IAvailability extends Document {
  user: mongoose.Types.ObjectId;
  days: string[]; // e.g., ['Monday', 'Wednesday']
  startTime: string; // e.g., '09:00'
  endTime: string;   // e.g., '17:00'
}

const AvailabilitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  days: [String],
  startTime: String,
  endTime: String,
});

const Availability = mongoose.model<IAvailability>('Availability', AvailabilitySchema);
export default Availability;