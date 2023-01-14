import asyncHandler from "express-async-handler";
import Workspace from "./../Models/WorkspaceModel";

const member = asyncHandler(async (req, res, next) => {
  const workspace = await Workspace.findById(req.header("workspaceId"));

  if (!workspace) {
    return res.status(404).json({ message: "Workspace not found." });
  }

  const members = workspace.members.map((member) => member.user);

  if (members.includes(req.user.id)) {
    next();
  } else {
    res
      .status(401)
      .json({
        message: "You must be a member of this workspace to make changes",
      });
  }
});

export default member;
