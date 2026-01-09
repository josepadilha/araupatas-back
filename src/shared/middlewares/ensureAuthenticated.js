"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = ensureAuthenticated;
const firebaseAdmin_1 = __importDefault(require("../../config/firebase/firebaseAdmin"));
async function ensureAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Token missing" });
    }
    const [, token] = authHeader.split(" ");
    try {
        const decoded = await firebaseAdmin_1.default.auth().verifyIdToken(token);
        req.user = {
            id: decoded.uid,
            email: decoded.email || ""
        };
        return next();
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}
