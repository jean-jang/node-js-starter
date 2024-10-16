import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import index from "./routes/index";

const app = express();
app.use(bodyParser.json());
app.use("/api", index);

const PORT = 5000;

app.listen(PORT, () =>
  console.log(`server listenting on port http://localhost:${PORT}`)
);

const MONGO_URI = "mongodb://localhost:27017/node-js-to-do";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("connected to database"))
  .catch((err) => console.error("Failed to connect to database", err));
