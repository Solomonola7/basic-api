import { Router } from 'express';
import Availability from '../models/Availability';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/', authMiddleware, async (req, res) => {
  const userId = req.user?.userId;
  const { days, startTime, endTime } = req.body;

  try {
    let availability = await Availability.findOne({ user: userId });
    if (availability) {
      availability.days = days || availability.days;
      availability.startTime = startTime || availability.startTime;
      availability.endTime = endTime || availability.endTime;
      await availability.save();
    } else {
      availability = new Availability({ user: userId, days, startTime, endTime });
      await availability.save();
    }
    res.json(availability);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Get user's availability
router.get('/', authMiddleware, async (req, res) => {
  const userId = req.user?.userId;
  try {
    const availability = await Availability.findOne({ user: userId });
    res.json(availability);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

export default router;