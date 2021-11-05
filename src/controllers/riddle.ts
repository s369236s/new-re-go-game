import { ApiResponse, SendAnswerRequest, Site } from "../common/type";
import { Response, Request } from "express";
import admin from "firebase-admin";

export const getAnswers = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const realtime = admin.database();

  const userRef = realtime.ref(`users/${userId}/site`);

  let sites = {};

  await userRef.once("value", async (doc) => {
    sites = doc.val();
  });

  return res.status(200).send({
    status: "success",
    data: sites,
    message: "player anwser sites",
  });
};

export const sendAnswer = async (req: Request, res: Response) => {
  const { userId, answer, siteName, siteId } = req.body as SendAnswerRequest;

  const realtime = admin.database();

  const firestore = admin.firestore();

  const siteRef = firestore.collection("sites");

  const siteSnapshot = await siteRef.where("name", "==", siteName).get();

  if (siteSnapshot.empty) {
    return res.status(500).send(null);
  }

  let shop: Site = null;

  siteSnapshot.forEach((doc) => {
    shop = doc.data() as Site;
  });

  if (answer !== shop.answer) {
    return res.status(500).send(null);
  }

  const userRef = realtime.ref(`/users/${userId}/site`);

  let ans = {} as any;

  ans[siteId] = true;

  await userRef.update({ ...ans });

  return res
    .status(200)
    .send({ status: "success", message: "success" } as ApiResponse); //
};
