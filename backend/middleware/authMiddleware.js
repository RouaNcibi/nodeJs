import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Extract token
            token = req.headers.authorization.split(" ")[1];
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Attach user to request object
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            return res.status(401).json({ message: "Not authorized, invalid token" });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};
