import * as mongoose from "mongoose";
import * as autoref from "mongoose-autorefs";
import * as autopopulate from "mongoose-autopopulate";

mongoose.set("useCreateIndex", true);

const BookSchema = new mongoose.Schema(
  {
    isbn10: { type: String, unique: true },
    isbn13: { type: String, unique: true },
    title: String,
    authors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
        autopopulate: { maxDepth: 1 },
      },
    ],
    bookcases: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bookcase",
        autopopulate: { maxDepth: 1 },
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
      favorites: [String],
      likes: [String],
    },
    hidden: { type: Boolean, default: false },
  },
  { timestamps: true },
);

BookSchema.plugin(autoref, ["authors.books", "bookcases.books"]);
BookSchema.plugin(autopopulate);

export { BookSchema };
