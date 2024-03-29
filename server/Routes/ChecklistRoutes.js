import express from "express";
import asyncHandler from "express-async-handler";
import protect from "../Middleware/AuthMiddleware.js";
import { check, validationResult } from "express-validator";
import Card from "../Models/CardModel.js";

const checklistRouter = express.Router();

// ADD CHECKLIST ITEM
checklistRouter.post(
  "/:cardId",
  [protect, [check("text", "Text is required").not().isEmpty()]],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const card = await Card.findById(req.params.cardId);
      if (!card) {
        return res.status(404).json({ msg: "Card not found" });
      }

      card.checklist.push({ text: req.body.text, complete: false });
      await card.save();

      res.json(card);
    } catch (err) {
      res.status(500);
      throw new Error(err.message);
    }
  })
);

// DELETE CHECKLIST ITEM
checklistRouter.delete(
  "/:cardId/:itemId",
  protect,
  asyncHandler(async (req, res) => {
    try {
      const card = await Card.findById(req.params.cardId);
      if (!card) {
        return res.status(404).json({ msg: "Card not found" });
      }

      const index = card.checklist.findIndex(
        (item) => item.id === req.params.itemId
      );
      if (index !== -1) {
        card.checklist.splice(index, 1);
        await card.save();
      }

      res.json(card);
    } catch (err) {
      res.status(500);
      throw new Error(err.message);
    }
  })
);

// CHANGE CHECKLIST ITEM TEXT
checklistRouter.patch(
  "/:cardId/:itemId",
  [[check("text", "Text is required").not().isEmpty()]],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const card = await Card.findById(req.params.cardId);
      if (!card) {
        return res.status(404).json({ msg: "Card not found" });
      }

      card.checklist.find((item) => item.id === req.params.itemId).text =
        req.body.text;
      await card.save();

      res.json(card);
    } catch (err) {
      res.status(500);
      throw new Error(err.message);
    }
  })
);

// COMPLETE/UNCOMPLETE CHECKLIST ITEM
checklistRouter.patch(
  "/:cardId/:complete/:itemId",
  asyncHandler(async (req, res) => {
    try {
      const card = await Card.findById(req.params.cardId);
      if (!card) {
        return res.status(404).json({ msg: "Card not found" });
      }

      card.checklist.find((item) => item.id === req.params.itemId).complete =
        req.params.complete === "true";
      await card.save();

      res.json(card);
    } catch (err) {
      res.status(500);
      throw new Error(err.message);
    }
  })
);

export default checklistRouter;
