import { Router } from 'express';
import Profile from '../models/Profile';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Create or update profile
router.post('/', authMiddleware, async (req, res) => {
  const userId = req.user?.userId;
  const { bio, skills, availability } = req.body;

  try {
    let profile = await Profile.findOne({ user: userId });
    if (profile) {
      // update
      profile.bio = bio || profile.bio;
      profile.skills = skills || profile.skills;
      profile.availability = availability || profile.availability;
      await profile.save();
    } else {
      // create new
      profile = new Profile({
        user: userId,
        bio,
        skills,
        availability,
      });
      await profile.save();
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get profile
router.get('/', authMiddleware, async (req, res) => {
  const userId = req.user?.userId;
  try {
    const profile = await Profile.findOne({ user: userId }).populate('user', ['email', 'role']);
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;