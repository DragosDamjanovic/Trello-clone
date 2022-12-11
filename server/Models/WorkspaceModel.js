import mongoose from "mongoose";

const workspaceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    lists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "lists",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Workspace = mongoose.model("workspace", workspaceSchema);

export default Workspace;
