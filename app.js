import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import indexRouter from "./src/routes/index.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api", indexRouter);

const PORT = 5005;

app.listen(PORT, () =>
  console.log(`server listenting on port http://localhost:${PORT}`)
);

const MONGO_URI = "mongodb://localhost:27017/node-js-to-do";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("connected to database"))
  .catch((err) => console.error("Failed to connect to database", err));
