import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import indexRouter from "./src/routes/index.js";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api", indexRouter);

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server listening on port ${PORT}`)
);

const MONGO_URI = process.env.MONGO_URI;
console.log(MONGO_URI);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("connected to database"))
  .catch((err) => console.error("Failed to connect to database", err));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: "error", message: err.message });
});
