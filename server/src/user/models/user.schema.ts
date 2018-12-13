import * as mongoose from "mongoose";
import * as autoref from "mongoose-autorefs";
import * as autopopulate from "mongoose-autopopulate";
import * as bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    pseudo: { type: String, unique: true },
    password: String,
    email: { type: String, unique: true },
    profileImageUrl: String,
    bookcases: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bookcase",
        autopopulate: { maxDepth: 1 },
      },
    ],
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

UserSchema.pre("save", function(next) {
  const user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      /*  if (err) {
        return next(err);
      } */
      bcrypt.hash(user.password, salt, function(err, hash) {
        /* if (err) {
          return next(err);
        } */
        user.password = hash;
        next();
      });
    });
  }
  /* else {
    return next();
  } */
});

UserSchema.plugin(autoref, ["bookcases.owner"]);
UserSchema.plugin(autopopulate);

export { UserSchema };
