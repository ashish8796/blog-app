import express from "express";
import morgan from "morgan";
import { port } from "./server.config.js";

import router from "./routes/index.js";

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
