import { verifyToken } from "../utils/jwt.js";

export const authToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
      error: error.message,
    });
  }
};

export const userMiddleware = (...allowedRoles) => {
  try {
    return (req, res, next) => {
      const role = req.user.role;

      if (!allowedRoles.includes(role)) {
        return res.status(403).json({ message: "Unauthorized access" });
      }

      next();
    };
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
      error: error.message,
    });
  }
};
