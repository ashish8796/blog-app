import { setResponseHeaders } from "../helper/headersHelper.js";
import Tag from "../models/tag.js";

export const getTags = async (req, res) => {
  setResponseHeaders(res);

  try {
    const tags = await Tag.find({}).lean();
    res.status(200).json(tags);
  } catch (error) {
    console.log("Error fetching tags:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const newTag = async (req, res) => {
  setResponseHeaders(res);

  const { body } = req;
  try {
    const tag = await Tag.create(body);
    res.status(201).json(tag);
  } catch (error) {
    console.log("Error creating tag:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTagById = async (req, res) => {
  const { id } = req.params;

  try {
    await Tag.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.log("Error deleting tag:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
