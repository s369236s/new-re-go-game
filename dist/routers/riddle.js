"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.riddleRouter = void 0;
const riddle_1 = require("../controllers/riddle");
const express_1 = require("express");
exports.riddleRouter = (0, express_1.Router)();
exports.riddleRouter.post("/", riddle_1.sendAnswer);
exports.riddleRouter.get("/:userId", riddle_1.getAnswers);
//# sourceMappingURL=riddle.js.map