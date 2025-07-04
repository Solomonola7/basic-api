import { Router, Request, Response } from 'express';
import MentorshipRequest from '../models/MentorshipRequests';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Send a mentorship request
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  const { mentorId, message } = req.body;
  const menteeId = req.user?.userId;

  try {
    const newRequest = new MentorshipRequest({
      mentee: menteeId,
      mentor: mentorId,
      message,
    });
    await newRequest.save();
    res.status(201).json({ message: 'Mentorship request sent' });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

// Get requests sent by logged in user (as mentee)
router.get('/sent', authMiddleware, async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  try {
    const requests = await MentorshipRequest.find({ mentee: userId }).populate('mentor', ['name', 'email']);
    res.json(requests);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

// Get requests received by logged in user (as mentor)
router.get('/received', authMiddleware, async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  try {
    const requests = await MentorshipRequest.find({ mentor: userId }).populate('mentee', ['name', 'email']);
    res.json(requests);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

// Update request status (accept/decline)
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  const requestId = req.params.id;
  const { status } = req.body;
  const userId = req.user?.userId;

  if (!status || !['accepted', 'declined'].includes(status)) {
    return res.status(400).json({ message: 'Invalid or missing status' });
  }

  try {
    const request = await MentorshipRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    // Only the mentor can update
    if (request.mentor.toString() !== userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    request.status = status;
    await request.save();
    res.json({ message: `Request ${status}` });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

export default router;