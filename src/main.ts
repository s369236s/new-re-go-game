import express from "express";
import cors from "cors";
import { expRouter } from "./routers/exp";
import { firebaseInit } from "./configs/firebase";
import { riddleRouter } from "./routers/riddle";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

firebaseInit();

app.use("/exp", expRouter);
app.use("/riddle", riddleRouter);

app.listen(PORT, () => {
  console.log(`server start at port ${PORT}`);
});
