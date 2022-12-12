import express from "express";
import asyncHandler from "express-async-handler";
import protect from "../Middleware/AuthMiddleware.js";
import { check, validationResult } from "express-validator";
import Workspace from "../Models/WorkspaceModel.js";
import List from "../Models/ListModel.js";
import User from "../Models/UserModel.js";

const workspaceRouter = express.Router();

// ADD WORKSPACE
workspaceRouter.post(
  "/",
  [protect, [check("title", "Title is required").not().isEmpty()]],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title } = req.body;

      // Create and save workspace
      const newWorkspace = new Workspace({ title });
      const workspace = await newWorkspace.save();

      // Add workspace to users workspaces
      const user = await User.findById(req.user.id);
      user.workspaces.unshift(workspace.id);
      await user.save();

      res.json(workspace);
    } catch (err) {
      res.status(500);
      throw new Error(err.message);
    }
  })
);

// GET USER WORKSPACES
workspaceRouter.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      const workspaces = [];
      for (const workspaceId of user.workspaces) {
        workspaces.push(await Workspace.findById(workspaceId));
      }

      res.json(workspaces);
    } catch (err) {
      res.status(500);
      throw new Error(err.message);
    }
  })
);

// GET WORKSPACE BY ID
workspaceRouter.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    try {
      const workspace = await Workspace.findById(req.params.id);
      if (!workspace) {
        return res.status(404).json({ msg: "Workspace not found" });
      }

      res.json(workspace);
    } catch (err) {
      res.status(500);
      throw new Error(err.message);
    }
  })
);

// CHANGE WORKSPACES TITLE
workspaceRouter.patch(
  "/rename/:id",
  [protect, [check("title", "Title is required").not().isEmpty()]],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const workspace = await Workspace.findById(req.params.id);
      if (!workspace) {
        return res.status(404).json({ msg: "Workspace not found" });
      }

      workspace.title = req.body.title;
      await workspace.save();

      res.json(workspace);
    } catch (err) {
      res.status(500);
      throw new Error(err.message);
    }
  })
);

export default workspaceRouter;
