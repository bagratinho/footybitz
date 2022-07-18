import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const logger = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const createUser = functions.auth.user().onCreate((user) => {
  console.log(user);
  return admin.firestore().collection("users").doc(user.uid).set({
    email: user.email,
    role: "user",
    dateRegistered: new Date(Date.now()),
    isArchived: false,
    displayName: user.displayName,
  });
});