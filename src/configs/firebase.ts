import fireBaseConfig from "./firebase.json";
import admin from "firebase-admin";

const config = fireBaseConfig as any;

const firebaseInit = () => {
  admin.initializeApp({
    credential: admin.credential.cert(config),
    databaseURL: config.databaseURL,
  });
};

export { firebaseInit };
