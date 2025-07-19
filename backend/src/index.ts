import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

// MongoDB
mongoose.connect('mongodb://localhost:27017/mentor-mentee');
console.log('MongoDB connected');

// Import routes
import cors from 'cors';
import authRoutes from './routes/user';
import profileRoutes from './routes/Profile';
import MentorshipRequestsRoutes from './routes/MentorshipRequests';
import availabilityRoutes from './routes/Availability';
import sessionRoutes from './routes/sessions';
import feedbackRoutes from './routes/Feedback';

// Use routes
app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to your frontend URL
    credentials: true,
}));
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/mentorship-requests', MentorshipRequestsRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/session', sessionRoutes);
app.use('/api/feedback', feedbackRoutes);

// a simple route for testing
app.get('/', (req, res) => {
  res.send('Hello! Your server is doing just fine.');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});