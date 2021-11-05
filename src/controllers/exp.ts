import { AddExpRequest } from "../common/type";
import { Response, Request } from "express";
import admin from "firebase-admin";

export const getExp = (req: Request, res: Response) => {
  console.log("getExp");
  res.status(200).send("getExp");
};

export const addExp = async (req: Request, res: Response) => {
  const { amount, password, shopName, userId } = req.body as AddExpRequest;

  const db = admin.database();
  const userRef = db.ref(`${userId}/exp`);

  const snap = await userRef.get();

  res.status(200).send({ ...req.body, exp: snap.val() }); //
};
