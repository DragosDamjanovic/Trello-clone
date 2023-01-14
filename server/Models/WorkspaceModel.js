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
    members: [
      {
        _id: false,
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
        name: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          default: "admin",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Workspace = mongoose.model("workspace", workspaceSchema);

export default Workspace;
