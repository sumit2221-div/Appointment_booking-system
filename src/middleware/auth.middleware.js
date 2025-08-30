import jwt from "jsonwebtoken";
import User from "../model/User.model.js";

export const VerifyToken = async (req, res, next) => {
    const token =  req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) {
            return res.status(401).json({ message: "User not found, authorization denied" });
        }
        next();
    } catch (error) {
        res.status(401).json({ message: "Token is not valid", error: error.message });
    }
}
export const AuthorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: `Role (${req.user.role}) is not authorized to access this resource` });
        }
        next();
    }
}