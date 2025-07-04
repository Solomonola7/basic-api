"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
// Middleware to parse JSON
app.use(express_1.default.json());
// MongoDB
mongoose_1.default.connect('mongodb://localhost:27017/mentor-mentee');
console.log('MongoDB connected');
// Import routes
const user_1 = __importDefault(require("./routes/user"));
const Profile_1 = __importDefault(require("./routes/Profile"));
const MentorshipRequests_1 = __importDefault(require("./routes/MentorshipRequests"));
const Availability_1 = __importDefault(require("./routes/Availability"));
const sessions_1 = __importDefault(require("./routes/sessions"));
const Feedback_1 = __importDefault(require("./routes/Feedback"));
// Use routes
app.use('/api/auth', user_1.default);
app.use('/api/profile', Profile_1.default);
app.use('/api/mentorship-requests', MentorshipRequests_1.default);
app.use('/api/availability', Availability_1.default);
app.use('/api/session', sessions_1.default);
app.use('/api/feedback', Feedback_1.default);
// a simple route for testing
app.get('/', (req, res) => {
    res.send('Hello! Your server is doing great.');
});
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
