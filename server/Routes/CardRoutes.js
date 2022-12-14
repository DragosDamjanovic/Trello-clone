import express from "express";
import asyncHandler from "express-async-handler";
import protect from "../Middleware/AuthMiddleware.js";
import { check, validationResult } from "express-validator";
import Card from "../Models/CardModel.js";
import List from "../Models/ListModel.js";

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

      // Create and save card
      const newCard = new Card({ title });
      const card = await newCard.save();

      // Assign card to list
      const list = await List.findById(listId);
      list.cards.push(card.id);
      await list.save();

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
cardRouter.put(
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

export default cardRouter;
