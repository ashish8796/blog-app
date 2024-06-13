import "dotenv/config";
import express from "express";
import morgan from "morgan";

import { port } from "./server.config.js";
import connectToDb from "./db.js";
import router from "./routes/index.js";

const app = express();

// connecting to DB
connectToDb();

app.use(morgan("tiny"));
app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
