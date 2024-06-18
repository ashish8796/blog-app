import { setResponseHeaders } from "../helper/headersHelper.js";
import {
  handleRequest,
  handleRequestWithoutBody,
} from "../helper/requestHelper.js";
import User from "../models/user.js";

export async function getUsers(req, res) {
  handleRequest(req, res, async () => {
    return await User.find().lean();
  });
}

export async function registerUser(req, res) {
  setResponseHeaders(res);
  try {
    const user = await User.create(req?.body);
    res.status(201).json(user);
  } catch (error) {
    // handling idempotency for user
    if (error.code === 11000) {
      res.status(400).json({ message: "user is already exists." });
    } else {
      console.log("Error creating user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export async function login(req, res) {
  setResponseHeaders(res);
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.verifyPassword(password))) {
      res.status(400).json({ message: "Invalid credentials" });
    } else {
      const token = await user.generateToken();
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
