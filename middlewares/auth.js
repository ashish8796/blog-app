import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/app.config.js";

const auth = {
  verifyToken,
};

async function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  try {
    if (token) {
      const payload = await jwt.verify(token, jwtSecret);
      req.user = payload;
      next();
    } else {
      res.status(401).json({ message: "No authorization token was found" });
    }
  } catch (error) {
    console.log("Error verify token: ", error.message);
    res.status(400).json({ message: "Invalid token" });
  }
}

export default auth;
