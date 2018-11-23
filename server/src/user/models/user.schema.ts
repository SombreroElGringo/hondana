import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema(
  {
    pseudo: { type: String, unique: true },
    password: String,
    email: { type: String, unique: true },
    profileImageUrl: String,
    comments: [
      {
        rating: Number,
        message: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);
