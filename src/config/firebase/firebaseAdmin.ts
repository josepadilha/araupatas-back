import admin from "firebase-admin";

const isProd = process.env.NODE_ENV === "production";

if (!admin.apps.length) {
  if (isProd) {
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT as string
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else {
    const serviceAccount = require("./serviceAccount.json");

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
}

export default admin;
