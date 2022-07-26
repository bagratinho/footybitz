import {isPredictionValid} from "./utils/index";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {generateFromEmail} from "unique-username-generator";
admin.initializeApp();
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const logger = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const createUser = functions.auth.user().onCreate(async (user) => {
  const querySnapshot = await admin
      .firestore()
      .collection("users")
      .where("username", "==", "asd")
      .get();
  const username = generateFromEmail(user.email!, querySnapshot.empty ? 0 : 5);
  return admin
      .firestore()
      .collection("users")
      .doc(user.uid)
      .set({
        email: user.email,
        role: "user",
        username,
        createdAt: new Date(user.metadata.creationTime),
        isArchived: false,
        displayName: user.displayName,
      });
});

export const createPrediction = functions.firestore
    .document("matchdays/{matchdayId}/predictions/{predictionId}")
    .onWrite(async (change, context) => {
      const prediction = change.after.data();
      if (prediction && prediction.sanitized) {
        return null;
      }
      const matches = (await admin
          .firestore()
          .collection(`matchdays/${context.params.matchdayId}/matches`)
          .get())
          .docs.map((i) => i.data());

      const matchday = (await admin
          .firestore()
          .collection("matchdays")
          .doc(context.params.matchdayId)
          .get())
          .data();

      functions.logger.info(
          "Is validated",
          isPredictionValid(matchday, matches, prediction),
          matchday,
          matches,
          prediction,
          change.before.data(),
          change.after.data(),
      );

      if (isPredictionValid(matchday, matches, prediction)) {
        return change.after.ref.set({
          ...prediction!,
          sanitized: true,
        });
      } else {
        if (change.before.data()) {
          return change.after.ref.set({
            ...change.before.data(),
            sanitized: true,
          });
        } else {
          return change.after.ref.delete();
        }
      }
    });
