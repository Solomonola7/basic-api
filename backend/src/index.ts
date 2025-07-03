import express from 'express';
import mongoose from 'mongoose';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mentor-mentee', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Your API routes will go here, e.g.:
import authRoutes from './routes/auth';
import profileRoutes from './routes/profile';
import MentorshipRequestsRoutes from './routes/MentorshipRequests';
import availabilityRoutes from './routes/availability';

app.use('/api/availability', availabilityRoutes);
app.use('/api/mentorship-requests', mentorshipRequestsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
});