import * as mongoose from "mongoose";

mongoose.set("useCreateIndex", true);

export const BookSchema = new mongoose.Schema(
  {
    isbn10: { type: String, unique: true },
    isbn13: { type: String, unique: true },
    title: String,
    authors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
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
    hidden: { type: Boolean, default: false },
  },
  { timestamps: true },
);
