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
app.use("/api/workspace", workspaceRouter);

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server run in port ${PORT}`));
