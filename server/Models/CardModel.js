import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  members: [
    {
      _id: false,
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
  checklist: [
    {
      text: {
        type: String,
      },
      complete: {
        type: Boolean,
      },
    },
  ],
});

const Card = mongoose.model("card", cardSchema);

export default Card;
