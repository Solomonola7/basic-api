import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Availability from '../models/Availability'; // fix path as needed
import { authMiddleware } from '../middleware/auth'; // adjust path if needed

// Define the custom request interface
import { IPayload } from '../middleware/auth'; // adjust path if needed

interface CustomRequest extends Request {
  user?: IPayload;
}

const router = express.Router();

router.post('/', authMiddleware, async (req: CustomRequest, res: Response) => {
  const userIdStr = req.user?.userId;

  if (!userIdStr || !mongoose.Types.ObjectId.isValid(userIdStr)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  const userId = new mongoose.Types.ObjectId(userIdStr);
  const { days, startTime, endTime } = req.body;

  try {
    let availability = await Availability.findOne({ user: userId });
    if (availability) {
      // update existing availability
      availability.days = days || availability.days;
      availability.startTime = startTime || availability.startTime;
      availability.endTime = endTime || availability.endTime;
      await availability.save();
    } else {
      // create new availability
      availability = new Availability({ user: userId, days, startTime, endTime });
      await availability.save();
    }
    res.json(availability);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;