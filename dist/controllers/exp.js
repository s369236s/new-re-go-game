"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addExp = exports.getExp = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const getExp = async (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    const realtime = firebase_admin_1.default.database();
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
            site: [false, false, false, false, false, false],
            shop: [false, false, false, false, false, false, false],
        });
        return res.status(200).send({
            status: "success",
            message: "created new player",
        });
    });
};
exports.getExp = getExp;
const addExp = async (req, res) => {
    const { amount, password, shopName, userId, shopId } = req.body;
    const realtime = firebase_admin_1.default.database();
    const firestore = firebase_admin_1.default.firestore();
    const shopRef = firestore.collection("shops");
    const shopSnapshot = await shopRef.where("name", "==", shopName).get();
    if (shopSnapshot.empty) {
        return res.status(500).send(null);
    }
    let shop = null;
    shopSnapshot.forEach((doc) => {
        shop = doc.data();
    });
    if (shop.password === password) {
        const userRef = realtime.ref(`/users/${userId}`);
        const exp = (await userRef.child("exp").get()).val();
        await userRef.child("exp").set(exp + amount);
        let ans = {};
        ans[shopId] = true;
        await userRef.child("shop").update(Object.assign({}, ans));
        return res.status(200).send(Object.assign({}, req.body)); //
    }
    return res.status(500).send(null);
};
exports.addExp = addExp;
//# sourceMappingURL=exp.js.map