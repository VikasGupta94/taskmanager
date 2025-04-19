import { verifyToken } from "../utils/jwt.js";

export const authenticate = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error("No token provided");
    }
    const token = authHeader.split(' ')[1];
    try {
        const user = verifyToken(token);
        req.user = user;
    }
    catch (error) {
        throw error
    }
} 