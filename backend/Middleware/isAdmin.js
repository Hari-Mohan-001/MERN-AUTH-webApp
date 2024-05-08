import jwt from "jsonwebtoken";
import { errorHandler } from "./errorHandler.js";

export const verifyAdminToken = (req, res, next) => {
    console.log('admin');
  const token = req.cookies.adminAccessToken;
  if (!token) {
    return next(errorHandler(401, "Login to continue"));
  }

  jwt.verify(token, process.env.ADMIN_JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Token is not valid"));
    req.user = user;
    console.log(req.user);
    next();
  });
};
