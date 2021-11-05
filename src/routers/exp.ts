import { Router } from "express";
import { addExp, getExp } from "../controllers/exp";

export const expRouter = Router();

expRouter.get("/", getExp); // 獲取經驗值

expRouter.post("/", addExp); // 增加經驗值
