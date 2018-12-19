import * as mongoose from "mongoose";
import * as autoref from "mongoose-autorefs";
import * as autopopulate from "mongoose-autopopulate";

const BookcaseSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: { maxDepth: 1 },
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        autopopulate: { maxDepth: 2 },
      },
    ],
    coordinate: {
      latitude: String,
      longitude: String,
    },
  },
  { timestamps: true },
);

BookcaseSchema.plugin(autoref, ["owner.bookcases", "books.bookcases"]);
BookcaseSchema.plugin(autopopulate);

export { BookcaseSchema };
