"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sessions_1 = __importDefault(require("../models/sessions"));
const auth_1 = require("../middleware/auth");
const sessions_2 = __importDefault(require("../models/sessions"));
const router = (0, express_1.Router)();
// Schedule a session
router.post('/', auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { mentorId, date, topic, meetingLink } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        const newSession = new sessions_1.default({
            mentor: mentorId,
            mentee: userId,
            date,
            topic,
            meetingLink,
        });
        yield newSession.save();
        res.status(201).json({ message: 'Session scheduled' });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
}));
// Get sessions for user (as mentor or mentee)
router.get('/', auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        const sessions = yield sessions_1.default.find({
            $or: [{ mentor: userId }, { mentee: userId }]
        }).populate('mentor', ['name']).populate('mentee', ['name']);
        res.json(sessions);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
}));
// Update session status (e.g., mark as completed)
router.put('/:id', auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const sessionId = req.params.id;
    const { status } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!status || !['scheduled', 'completed', 'cancelled'].includes(status)) {
        return res.status(400).json({ message: 'Invalid or missing status' });
    }
    try {
        const session = yield sessions_2.default.findById(sessionId);
        if (!session)
            return res.status(404).json({ message: 'Session not found' });
        // Only involved users can update
        if (session.mentor.toString() !== userId && session.mentee.toString() !== userId) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        session.status = status;
        yield session.save();
        res.json({ message: 'Session updated' });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
}));
exports.default = router;
