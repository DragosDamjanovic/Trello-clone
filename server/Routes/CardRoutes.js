import express from "express";
import asyncHandler from "express-async-handler";
import protect from "../Middleware/AuthMiddleware.js";
import { check, validationResult } from "express-validator";
import Card from "../Models/CardModel.js";
import List from "../Models/ListModel.js";
import Workspace from "../Models/WorkspaceModel.js";

const cardRouter = express.Router();

// ADD CARD
cardRouter.post(
  "/",
  [protect, [check("title", "Title is required").not().isEmpty()]],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, listId } = req.body;
      const workspaceId = req.header("workspaceId");

      // Create and save card
      const newCard = new Card({ title });
      const card = await newCard.save();

      // Assign card to list
      const list = await List.findById(listId);
      list.cards.push(card.id);
      await list.save();

      const workspace = await Workspace.findById(workspaceId);
      await workspace.save();

      res.json({ cardId: card.id, listId });
    } catch (err) {
      res.status(500);
      throw new Error(err.message);
    }
  })
);

// GET ALL OF LISTS CARDS
cardRouter.get(
  "/listCards/:listId",
  protect,
  asyncHandler(async (req, res) => {
    try {
      const list = await List.findById(req.params.listId);
      if (!list) {
        return res.status(404).json({ message: "List not found" });
      }

      const cards = [];
      for (const cardId of list.cards) {
        cards.push(await List.findById(cardId));
      }

      res.json(cards);
    } catch (err) {
      res.status(500);
      throw new Error(err.message);
    }
  })
);

// GET CARD BY ID
cardRouter.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    try {
      const card = await Card.findById(req.params.id);
      if (!card) {
        return res.status(404).json({ message: "Card not found" });
      }

      res.json(card);
    } catch (err) {
      res.status(500);
      throw new Error(err.message);
    }
  })
);

// MOVE CARD
cardRouter.patch(
  "/move/:id",
  protect,
  asyncHandler(async (req, res) => {
    try {
      const { fromId, toId, toIndex } = req.body;
      const workspaceId = req.header("workspaceId");

      const cardId = req.params.id;
      const from = await List.findById(fromId);
      let to = await List.findById(toId);
      if (!cardId || !from || !to) {
        return res.status(404).json({ message: "List/card not found" });
      } else if (fromId === toId) {
        to = from;
      }

      const fromIndex = from.cards.indexOf(cardId);
      if (fromIndex !== -1) {
        from.cards.splice(fromIndex, 1);
        await from.save();
      }

      if (!to.cards.includes(cardId)) {
        if (toIndex === 0 || toIndex) {
          to.cards.splice(toIndex, 0, cardId);
        } else {
          to.cards.push(cardId);
        }
        await to.save();
      }

      if (fromId !== toId) {
        const workspace = await Workspace.findById(workspaceId);
        await workspace.save();
      }

      res.send({ cardId, from, to });
    } catch (err) {
      res.status(500);
      throw new Error(err.message);
    }
  })
);

// DELETE CARD
cardRouter.delete(
  "/:listId/:id",
  protect,
  asyncHandler(async (req, res) => {
    try {
      const card = await Card.findById(req.params.id);
      const list = await List.findById(req.params.listId);
      if (!card || !list) {
        return res.status(404).json({ message: "List/card not found" });
      }

      list.cards.splice(list.cards.indexOf(req.params.id), 1);
      await list.save();
      await card.remove();

      const workspace = await Workspace.findById(req.header("workspaceId"));
      await workspace.save();

      res.json(req.params.id);
    } catch (err) {
      res.status(500);
      throw new Error(err.message);
    }
  })
);

export default cardRouter;
