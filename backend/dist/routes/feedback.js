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
const Feedback_1 = __importDefault(require("../models/Feedback"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Submit feedback
router.post('/', auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { sessionId, revieweeId, rating, comment } = req.body;
    const reviewerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        const newFeedback = new Feedback_1.default({
            session: sessionId,
            reviewer: reviewerId,
            reviewee: revieweeId,
            rating,
            comment,
        });
        yield newFeedback.save();
        res.status(201).json({ message: 'Feedback submitted' });
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
// Get feedback for a user
router.get('/user/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const feedbacks = yield Feedback_1.default.find({ reviewee: userId }).populate('reviewer', ['name']);
        res.json(feedbacks);
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
