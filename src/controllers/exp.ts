import { AddExpRequest, Shop } from "../common/type";
import { Response, Request } from "express";
import admin from "firebase-admin";

export const getExp = async (req: Request, res: Response) => {
  const { userId } = req.params;

  console.log(userId);

  const realtime = admin.database();

  const userRef = realtime.ref(`users/${userId}`);
  await userRef.once("value", async (doc) => {
    console.log(doc.val());

    if (doc.val()) {
      return res.status(200).send({
        status: "success",
        message: "docs existed",
      });
    }
    await userRef.set({
      exp: 0,
      site: [false, false, false, false, false],
      shop: [false, false, false, false, false, false],
    });

    return res.status(200).send({
      status: "success",
      message: "created new player",
    });
  });
};

export const addExp = async (req: Request, res: Response) => {
  const { amount, password, shopName, userId, shopId } =
    req.body as AddExpRequest;

  const realtime = admin.database();

  const firestore = admin.firestore();

  const shopRef = firestore.collection("shops");

  const shopSnapshot = await shopRef.where("name", "==", shopName).get();

  if (shopSnapshot.empty) {
    return res.status(500).send(null);
  }

  let shop: Shop = null;

  shopSnapshot.forEach((doc) => {
    shop = doc.data() as Shop;
  });

  if (shop.password === password) {
    const userRef = realtime.ref(`/users/${userId}`);

    const exp = (await userRef.child("exp").get()).val();

    await userRef.child("exp").set(exp + amount);

    let ans = {} as any;

    ans[shopId] = true;

    await userRef.child("shop").update({ ...ans });

    return res.status(200).send({ ...req.body }); //
  }
  return res.status(500).send(null);
};
