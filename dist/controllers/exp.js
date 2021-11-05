"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addExp = exports.getExp = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const getExp = (req, res) => {
    console.log("getExp");
    res.status(200).send("getExp");
};
exports.getExp = getExp;
const addExp = async (req, res) => {
    const { amount, password, shopName, userId } = req.body;
    const db = firebase_admin_1.default.database();
    const userRef = db.ref(`${userId}/exp`);
    const snap = await userRef.get();
    res.status(200).send(Object.assign(Object.assign({}, req.body), { exp: snap.val() })); //
};
exports.addExp = addExp;
//# sourceMappingURL=exp.js.map