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

  let lot = false;

  await userRef.once("value", async (doc) => {
    const sites = doc.val() as boolean[];

    const check = sites.filter((site: boolean) => site === false);

    console.log(check.length);

    if (check.length <= 1) {
      console.log("不抽");
      lot = false;
      return;
    }
    lot = true;
  });

  if (!lot)
    return res
      .status(200)
      .send({ status: "success", message: "success" } as ApiResponse); //

  let ans = {} as any;

  ans[siteId] = true;

  await userRef.update({ ...ans });

  await userRef.once("value", async (doc) => {
    const sites = doc.val() as boolean[];

    const check = sites.filter((site: boolean) => site === false);

    if (check.length <= 1) {
      console.log("抽");
      return;
    }
    console.log("不抽");
  });

  return res
    .status(200)
    .send({ status: "success", message: "success" } as ApiResponse); //
};
