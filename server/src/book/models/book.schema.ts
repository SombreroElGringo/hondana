import * as mongoose from "mongoose";

export const BookSchema = new mongoose.Schema(
  {
    isbn: { type: String, unique: true },
    title: String,
    authors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
      },
    ],
    owners: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    description: String,
    coverImageUrl: String,
    categories: [String],
    releaseAt: Date,
    comments: [
      { message: String, createdAt: { type: Date, default: Date.now } },
    ],
    meta: {
      favorites: Number,
      likes: Number,
    },
    hidden: Boolean,
  },
  { timestamps: true },
);
