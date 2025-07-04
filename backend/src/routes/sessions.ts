import { Router, Request, Response } from 'express';
import session from '../models/sessions';
import { authMiddleware } from '../middleware/auth';
import sessions from '../models/sessions';

const router = Router();

// Schedule a session
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  const { mentorId, date, topic, meetingLink } = req.body;
  const userId = req.user?.userId;

  try {
    const newSession = new session({
      mentor: mentorId,
      mentee: userId,
      date,
      topic,
      meetingLink,
    });
    await newSession.save();
    res.status(201).json({ message: 'Session scheduled' });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

// Get sessions for user (as mentor or mentee)
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  try {
    const sessions = await session.find({
      $or: [{ mentor: userId }, { mentee: userId }]
    }).populate('mentor', ['name']).populate('mentee', ['name']);
    res.json(sessions);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

// Update session status (e.g., mark as completed)
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  const sessionId = req.params.id;
  const { status } = req.body;
  const userId = req.user?.userId;

  if (!status || !['scheduled', 'completed', 'cancelled'].includes(status)) {
    return res.status(400).json({ message: 'Invalid or missing status' });
  }

  try {
    const session = await sessions.findById(sessionId);
    if (!session) return res.status(404).json({ message: 'Session not found' });

    // Only involved users can update
    if (session.mentor.toString() !== userId && session.mentee.toString() !== userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    session.status = status;
    await session.save();
    res.json({ message: 'Session updated' });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

export default router;