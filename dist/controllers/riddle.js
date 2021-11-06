"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAnswer = exports.getAnswers = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const getAnswers = async (req, res) => {
    const { userId } = req.params;
    const realtime = firebase_admin_1.default.database();
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
exports.getAnswers = getAnswers;
const sendAnswer = async (req, res) => {
    const { userId, answer, siteName, siteId } = req.body;
    const realtime = firebase_admin_1.default.database();
    const firestore = firebase_admin_1.default.firestore();
    const siteRef = firestore.collection("sites");
    const siteSnapshot = await siteRef.where("name", "==", siteName).get();
    if (siteSnapshot.empty) {
        return res.status(500).send(null);
    }
    let shop = null;
    siteSnapshot.forEach((doc) => {
        shop = doc.data();
    });
    if (answer !== shop.answer) {
        return res.status(500).send(null);
    }
    const userRef = realtime.ref(`/users/${userId}/site`);
    let lot = false;
    await userRef.once("value", async (doc) => {
        const sites = doc.val();
        const check = sites.filter((site) => site === false);
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
            .send({ status: "success", message: "success" }); //
    let ans = {};
    ans[siteId] = true;
    await userRef.update(Object.assign({}, ans));
    await userRef.once("value", async (doc) => {
        const sites = doc.val();
        const check = sites.filter((site) => site === false);
        if (check.length <= 1) {
            console.log("抽");
            const lotRef = realtime.ref(`/users/${userId}/lot`);
            let currLot = (await (await lotRef.get()).val());
            lotRef.set(currLot++);
            return;
        }
        console.log("不抽");
    });
    return res
        .status(200)
        .send({ status: "success", message: "success" }); //
};
exports.sendAnswer = sendAnswer;
//# sourceMappingURL=riddle.js.map