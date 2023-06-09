const { Schema, model } = require("mongoose");

const commentsSchema = new Schema(
  {
    artWorkComment: {
      type: Schema.Types.ObjectId,
      ref: "Artwork",
    },
    userComment: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    opinion: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Comments = model("Comments", commentsSchema);
module.exports = Comments;
