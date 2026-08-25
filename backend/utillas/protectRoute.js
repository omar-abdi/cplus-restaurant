import jwt from "jsonwebtoken";

export const protectRoute = (req, res, next) => {
  const token = req.cookies?.access_token;

  if (!token) {
    return res.status(401).json({
      message: "You are not authorized",
    });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({
      message: "JWT_SECRET is not configured",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(401).json({
        message: "You are not authorized",
      });
    }

    req.user = user;

    next();
  });
};