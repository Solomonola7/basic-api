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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Availability_1 = __importDefault(require("../models/Availability")); // fix path as needed
const auth_1 = require("../middleware/auth"); // adjust path if needed
const router = express_1.default.Router();
router.post('/', auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userIdStr = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!userIdStr || !mongoose_1.default.Types.ObjectId.isValid(userIdStr)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }
    const userId = new mongoose_1.default.Types.ObjectId(userIdStr);
    const { days, startTime, endTime } = req.body;
    try {
        let availability = yield Availability_1.default.findOne({ user: userId });
        if (availability) {
            // update existing availability
            availability.days = days || availability.days;
            availability.startTime = startTime || availability.startTime;
            availability.endTime = endTime || availability.endTime;
            yield availability.save();
        }
        else {
            // create new availability
            availability = new Availability_1.default({ user: userId, days, startTime, endTime });
            yield availability.save();
        }
        res.json(availability);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
exports.default = router;
