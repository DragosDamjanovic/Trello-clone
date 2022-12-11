import mongoose from "mongoose";

const listSchema = mongoose.Schema({
  title: { type: String, required: true },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cards",
    },
  ],
});

const List = mongoose.model("list", listSchema);

export default List;
