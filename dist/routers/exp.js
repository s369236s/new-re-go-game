"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expRouter = void 0;
const express_1 = require("express");
const exp_1 = require("../controllers/exp");
exports.expRouter = (0, express_1.Router)();
exports.expRouter.get("/", exp_1.getExp); // 獲取經驗值
exports.expRouter.post("/", exp_1.addExp); // 增加經驗值
//# sourceMappingURL=exp.js.map