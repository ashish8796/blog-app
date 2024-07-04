import express from "express";
import morgan from "morgan";
import { port } from "./config/server.config.js";
import router from "./routes/index.js";
import connectToDb from "./config/db.config.js";

const app = express();

// connecting to DB
connectToDb();

app.use(morgan("tiny"));
app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
