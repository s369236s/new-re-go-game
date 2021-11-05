import { sendAnswer, getAnswers } from "../controllers/riddle";
import { Router } from "express";

export const riddleRouter = Router();

riddleRouter.post("/", sendAnswer);
riddleRouter.get("/:userId", getAnswers);
