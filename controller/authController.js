import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { jwtRefreshSecret } from "../config/app.config.js";

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  try {
    const decode = jwt.verify(refreshToken, jwtRefreshSecret);
    const user = await User.findById(decode.id);
    if (!user || user.refreshToken !== refreshToken) {
      res.status(401).json({ message: "Invalid refresh token" });
    }

    const newToken = await user.generateToken();
    res.json({ newToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};
