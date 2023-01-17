import express from "express";
import asyncHandler from "express-async-handler";
import protect from "../Middleware/AuthMiddleware.js";
import { check, validationResult } from "express-validator";
import Card from "../Models/CardModel.js";
import User from "../Models/UserModel.js";

const activityRouter = express.Router();

// ADD COMMENT
activityRouter.post(
  "/:cardId",
  [protect, [check("comment", "Comment is required").not().isEmpty()]],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const card = await Card.findById(req.params.cardId);
      const user = await User.findById(req.user.id);
      if (!card) {
        return res.status(404).json({ msg: "Card not found" });
      }

      card.activity.push({
        comment: req.body.comment,
        user: user.id,
        name: user.name,
      });
      await card.save();

      res.json(card);
    } catch (err) {
      res.status(500);
      throw new Error(err.message);
    }
  })
);

// DELETE COMMENT
activityRouter.delete(
  "/:cardId/:commentId",
  protect,
  asyncHandler(async (req, res) => {
    try {
      const card = await Card.findById(req.params.cardId);
      if (!card) {
        return res.status(404).json({ msg: "Card not found" });
      }

      const index = card.activity.findIndex(
        (comment) => comment.id === req.params.commentId
      );
      if (index !== -1) {
        card.activity.splice(index, 1);
        await card.save();
      }

      res.json(card);
    } catch (err) {
      res.status(500);
      throw new Error(err.message);
    }
  })
);

// EDIT COMMENT
activityRouter.patch(
  "/:cardId/:commentId",
  [[check("comment", "Comment is required").not().isEmpty()]],
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

      card.activity.find((item) => item.id === req.params.itemId).comment =
        req.body.comment;
      await card.save();

      res.json(card);
    } catch (err) {
      res.status(500);
      throw new Error(err.message);
    }
  })
);

export default activityRouter;
