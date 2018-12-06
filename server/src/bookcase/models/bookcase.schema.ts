import * as mongoose from "mongoose";

export const BookcaseSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    books: [
      {
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
        },
        isAvailable: Boolean,
      },
    ],
    coordinate: {
      latitude: String,
      longitude: String,
    },
  },
  { timestamps: true },
);
