import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
});

const Card = mongoose.model("card", cardSchema);

export default Card;
