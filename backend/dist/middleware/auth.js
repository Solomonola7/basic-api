"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
// Removed duplicate interface declaration to avoid conflicts
const authMiddleware = (req, res, next) => {
    // Bypassing authentication and assign dummy user
    req.user = {
        userId: "12345",
        role: "admin"
    };
    //Temporarily bypass authentication for testing purposes
    //const token = req.header('Authorization')?.replace('Bearer ', '');
    //if (!token) {
    //return res.status(401).json({ message: 'No token, authorization denied' });
    //}
    //try {
    //const decoded = jwt.verify(token, 'your_jwt_secret') as IPayload;
    //req.user = decoded;
    //next();
    //} catch (err) {
    //res.status(401).json({ message: 'Token is not valid' });
    //}
    // Bypassing authentication for testing purposes
    next();
};
exports.authMiddleware = authMiddleware;
exports.default = exports.authMiddleware;
