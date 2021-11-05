"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const exp_1 = require("./routers/exp");
const firebase_1 = require("./configs/firebase");
const riddle_1 = require("./routers/riddle");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, firebase_1.firebaseInit)();
app.use("/exp", exp_1.expRouter);
app.use("/riddle", riddle_1.riddleRouter);
app.listen(PORT, () => {
    console.log(`server start at port ${PORT}`);
});
//# sourceMappingURL=main.js.map