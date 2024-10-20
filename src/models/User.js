import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SALTROUNDS = 10;
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, SALTROUNDS);
      this.password = hashedPassword;
      console.log("Password has been hashed!", hashedPassword);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

userSchema.pre(["findOne"], function (next) {
  this.select(["-createdAt", "-updatedAt"]);
  next();
});

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, SECRET_KEY, {
      expiresIn: "24h",
    });
    return token;
  } catch (error) {
    throw new Error("Token generation failed");
  }
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model("User", userSchema);

export default User;
