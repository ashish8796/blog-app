import { setResponseHeaders } from "../helper/headersHelper.js";
import User from "../models/user.js";

export async function getUsers(req, res) {
  setResponseHeaders(res);
  try {
    const users = await User.find().lean();
    res.status(200).json(users);
  } catch (error) {
    console.log("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createUser(req, res) {
  setResponseHeaders(res);
  try {
    const user = await User.create(req?.body).lean();
    res.status(201).json(user);
  } catch (error) {
    console.log("Error creating user:", error);
    // handling idempotency for user
    if (error.code === 11000) {
      res.status(400).json({ message: "user is already exists." });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export async function getUserById(req, res) {
  setResponseHeaders(res);
  const { id } = req.params;

  try {
    const user = await User.findById(id).lean(true);

    if (user === null) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.log("Error creating user:", error);

    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateUserById(req, res) {
  setResponseHeaders(res);
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, body, { new: true }).lean(); // lean() === lean(true)

    if (user === null) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.log("Error creating user:", error);

    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(204);
  } catch (error) {
    console.log("Error creating user:", error);

    res.status(500).json({ message: "Internal Server Error" });
  }
}
