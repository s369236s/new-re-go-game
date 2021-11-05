"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseInit = void 0;
const firebase_json_1 = __importDefault(require("./firebase.json"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const config = firebase_json_1.default;
const firebaseInit = () => {
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(config),
        databaseURL: config.databaseURL,
    });
};
exports.firebaseInit = firebaseInit;
//# sourceMappingURL=firebase.js.map