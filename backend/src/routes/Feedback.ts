import { Router, Request, Response } from 'express';
import Feedback from '../models/Feedback';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Submit feedback
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  const { sessionId, revieweeId, rating, comment } = req.body;
  const reviewerId = req.user?.userId;

  try {
    const newFeedback = new Feedback({
      session: sessionId,
      reviewer: reviewerId,
      reviewee: revieweeId,
      rating,
      comment,
    });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted' });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

// Get feedback for a user
router.get('/user/:userId', async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const feedbacks = await Feedback.find({ reviewee: userId }).populate('reviewer', ['name']);
    res.json(feedbacks);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

export default router;