import * as mongoose from "mongoose";
import * as autoref from "mongoose-autorefs";
import * as autopopulate from "mongoose-autopopulate";

const AuthorSchema = new mongoose.Schema(
  {
    name: String,
    biography: String,
    profileImageUrl: String,
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        autopopulate: { maxDepth: 1 },
      },
    ],
  },
  { timestamps: true },
);

AuthorSchema.plugin(autoref, ["books.authors"]);
AuthorSchema.plugin(autopopulate);

export { AuthorSchema };
