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
const Availability_1 = __importDefault(require("../models/Availability"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Add or update availability
router.post('/', auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const { days, startTime, endTime } = req.body;
    try {
        let availability = yield Availability_1.default.findOne({ user: userId });
        if (availability) {
            // update
            availability.days = days || availability.days;
            availability.startTime = startTime || availability.startTime;
            availability.endTime = endTime || availability.endTime;
            yield availability.save();
        }
        else {
            // create new
            availability = new Availability_1.default({ user: userId, days, startTime, endTime });
            yield availability.save();
        }
        res.json(availability);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}));
// Get user's availability
router.get('/', auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        const availability = yield Availability_1.default.findOne({ user: userId });
        res.json(availability);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}));
exports.default = router;
