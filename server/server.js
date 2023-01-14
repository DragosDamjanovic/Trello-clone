import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoutes.js";
import listRouter from "./Routes/ListRoutes.js";
import cardRouter from "./Routes/CardRoutes.js";
import workspaceRouter from "./Routes/WorkspaceRoutes.js";
import checklistRouter from "./Routes/ChecklistRoutes.js";

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());
app.use(cors());

// API
app.use("/api/import", ImportData);
app.use("/api/users", userRouter);
app.use("/api/lists", listRouter);
app.use("/api/cards", cardRouter);
app.use("/api/workspaces", workspaceRouter);
app.use("/api/checklists", checklistRouter);

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("trello-clone/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "trello-clone", "build", "index.html")
    );
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server run in port ${PORT}`));
