import express from "express";
import User from "./Models/UserModel.js";
import List from "./Models/ListModel.js";
import Card from "./Models/CardModel.js";
import users from "./data/users.js";
import lists from "./data/lists.js";
import cards from "./data/cards.js";
import asyncHandler from "express-async-handler";

const ImportData = express.Router();

ImportData.post(
  "/user",
  asyncHandler(async (req, res) => {
    await User.remove({});
    const importUser = await User.insertMany(users);
    res.send({ importUser });
  })
);

ImportData.post(
  "/lists",
  asyncHandler(async (req, res) => {
    await List.remove({});
    const importList = await List.insertMany(lists);
    res.send({ importList });
  })
);

ImportData.post(
  "/cards",
  asyncHandler(async (req, res) => {
    await Card.remove({});
    const importCard = await Card.insertMany(cards);
    res.send({ importCard });
  })
);

export default ImportData;
