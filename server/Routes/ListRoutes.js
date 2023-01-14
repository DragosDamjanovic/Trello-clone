import express from "express";
import asyncHandler from "express-async-handler";
import protect from "../Middleware/AuthMiddleware.js";
import List from "../Models/ListModel.js";
import { check, validationResult } from "express-validator";
import Workspace from "../Models/WorkspaceModel.js";
import Card from "../Models/CardModel.js";
import member from "../Middleware/memberMiddleware.js";

const listRouter = express.Router();

// ADD LIST
listRouter.post(
  "/",
  [[protect, member], [check("title", "Title is required").not().isEmpty()]],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    try {
      const title = req.body.title;
      const workspaceId = req.header("workspaceId");

      // Create and save list
      const newList = new List({ title });
      const list = await newList.save();

      // Assign list to workspace
      const workspace = await Workspace.findById(workspaceId);
      workspace.lists.push(list.id);
      await workspace.save();

      res.json(list);
    } catch (err) {
      res.status(500);
      throw new Error(err.message);
    }
  })
);

// GET ALL OF WORKSPACES LISTS
listRouter.get(
  "/workspaceLists/:workspaceId",
  protect,
  asyncHandler(async (req, res) => {
    try {
      const workspace = await Workspace.findById(req.params.workspaceId);
      if (!workspace) {
        return res.status(404).json({ message: "Workspace not found" });
      }

      const lists = [];
      for (const listId of workspace.lists) {
        lists.push(await List.findById(listId));
      }

      res.json(lists);
    } catch (err) {
      res.status(500);
      throw new Error(err.message);
    }
  })
);

// GET LIST BY ID
listRouter.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    try {
      const list = await List.findById(req.params.id);
      if (!list) {
        return res.status(404).json({ message: "List not found" });
      }

      res.json(list);
    } catch (err) {
      res.status(500);
      throw new Error(err.message);
    }
  })
);

// CHANGE LISTS TITLE
listRouter.patch(
  "/rename/:id",
  [protect, member, [check("title", "Title is required").not().isEmpty()]],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const list = await List.findById(req.params.id);
      if (!list) {
        return res.status(404).json({ message: "List not found" });
      }

      list.title = req.body.title;
      await list.save();

      res.json(list);
    } catch (err) {
      res.status(500);
      throw new Error(err.message);
    }
  })
);

// MOVE LIST
listRouter.patch(
  "/move/:id",
  [protect, member],
  asyncHandler(async (req, res) => {
    try {
      const toIndex = req.body.toIndex ? req.body.toIndex : 0;
      const workspaceId = req.header("workspaceId");
      const workspace = await Workspace.findById(workspaceId);
      const listId = req.params.id;
      if (!listId) {
        return res.status(404).json({ message: "List not found" });
      }

      workspace.lists.splice(workspace.lists.indexOf(listId), 1);
      workspace.lists.splice(toIndex, 0, listId);
      await workspace.save();

      res.send(workspace.lists);
    } catch (err) {
      res.status(500);
      throw new Error(err.message);
    }
  })
);

// DELETE LIST
listRouter.delete(
  "/:id",
  [protect, member],
  asyncHandler(async (req, res) => {
    try {
      const list = await List.findById(req.params.id);
      const workspaceId = req.header("workspaceId");
      const workspace = await Workspace.findById(workspaceId);

      if (!list) {
        return res.status(404).json({ message: "List not found" });
      }

      list.cards.splice(list.cards.indexOf(req.params.id), 1);
      workspace.lists.splice(workspace.lists.indexOf(req.params.id), 1);
      await list.cards.remove();
      await list.remove();

      await workspace.save();
      console.log(workspace);

      res.json(req.params.id);
    } catch (err) {
      res.status(500);
      throw new Error(err.message);
    }
  })
);

export default listRouter;
