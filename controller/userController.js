import jwt from "jsonwebtoken";
import { setResponseHeaders } from "../helper/headersHelper.js";
import {
  handleRequest,
  handleRequestWithoutBody,
} from "../helper/requestHelper.js";
import User from "../models/user.js";
import { jwtRefreshSecret } from "../server.config.js";

export async function getUsers(req, res) {
  handleRequest(req, res, async () => {
    return await User.find().select("-password -refreshToken").lean();
  });
}

export async function registerUser(req, res) {
  setResponseHeaders(res);
  try {
    const user = await User.create(req?.body);
    delete user.password;
    res.status(201).json(user);
  } catch (error) {
    // handling idempotency for user
    if (error.code === 11000) {
      res.status(400).json({ message: "user is already exists." });
    } else {
      console.log("Error creating user:", error);
      res.status(400).json({ message: error.message });
    }
  }
}

export async function login(req, res) {
  setResponseHeaders(res);
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.verifyPassword(password))) {
      res.status(400).json({ message: "Invalid credentials" });
    } else {
      // Token Generation
      const token = await user.generateToken();

      // Refresh Token Generation
      const refreshTokenPayload = { id: user._id, email, role };

      const refreshToken = jwt.sign(refreshTokenPayload, jwtRefreshSecret, {
        expiresIn: "7 days",
      });

      user.refreshToken = refreshToken;
      await user.save();

      delete user.password;

      res.status(200).json({ user, token });
    }
  } catch (error) {
    console.log("Error logging user: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getUserById(req, res) {
  handleRequest(req, res, async (req) => {
    const { id } = req.params;

    return await User.findById(id).lean();
  });
}

export async function updateUserById(req, res) {
  handleRequest(req, res, async (req) => {
    const { id } = req.params;
    return await User.findByIdAndUpdate(id, body, { new: true }).lean(); // lean() === lean(true);
  });
}

export async function deleteUserById(req, res) {
  handleRequestWithoutBody(req, res, async () => {
    const { id } = req.params;
    return await User.findByIdAndDelete(id);
  });
}
