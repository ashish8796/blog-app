import { setResponseHeaders } from "./headersHelper.js";

export async function handleRequest(req, res, callback) {
  setResponseHeaders(res);

  try {
    const result = await callback(req);

    if (!result) {
      res.status(404).json({ message: " Resource not found." });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    console.log("Error handling request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function handleRequestWithoutBody(req, res, callback) {
  try {
    const result = await callback(req);
    if (!result) {
      res.status(404).json({ message: " Resource not found." });
    } else {
      res.status(204).end();
    }
  } catch (error) {
    console.log("Error handling request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
