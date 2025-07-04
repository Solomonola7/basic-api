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
const MentorshipRequests_1 = __importDefault(require("../models/MentorshipRequests"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Send a mentorship request
router.post('/', auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { mentorId, message } = req.body;
    const menteeId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        const newRequest = new MentorshipRequests_1.default({
            mentee: menteeId,
            mentor: mentorId,
            message,
        });
        yield newRequest.save();
        res.status(201).json({ message: 'Mentorship request sent' });
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
// Get requests sent by logged in user (as mentee)
router.get('/sent', auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        const requests = yield MentorshipRequests_1.default.find({ mentee: userId }).populate('mentor', ['name', 'email']);
        res.json(requests);
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
// Get requests received by logged in user (as mentor)
router.get('/received', auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        const requests = yield MentorshipRequests_1.default.find({ mentor: userId }).populate('mentee', ['name', 'email']);
        res.json(requests);
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
// Update request status (accept/decline)
router.put('/:id', auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const requestId = req.params.id;
    const { status } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!status || !['accepted', 'declined'].includes(status)) {
        return res.status(400).json({ message: 'Invalid or missing status' });
    }
    try {
        const request = yield MentorshipRequests_1.default.findById(requestId);
        if (!request)
            return res.status(404).json({ message: 'Request not found' });
        // Only the mentor can update
        if (request.mentor.toString() !== userId) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        request.status = status;
        yield request.save();
        res.json({ message: `Request ${status}` });
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
