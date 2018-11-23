import * as mongoose from "mongoose";

export const AuthorSchema = new mongoose.Schema(
  {
    name: String,
    biography: String,
    profileImageUrl: String,
  },
  { timestamps: true },
);
