import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp(); // SEM credential
}

export default admin;