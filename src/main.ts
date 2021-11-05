import express from "express";
import cors from "cors";
import { expRouter } from "./routers/exp";
import { firebaseInit } from "./configs/firebase";
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

firebaseInit();

app.use("/exp", expRouter);

app.listen(PORT, () => {
  console.log(`server start at port ${PORT}`);
});
