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
  const querySnapshot = await admin.firestore().collection("users")
      .where("username", "==", "asd").get();
  const username = generateFromEmail(user.email!, querySnapshot.empty ? 0 : 5);
  return admin.firestore().collection("users").doc(user.uid).set({
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
    .onCreate(async (payload, context) => {
      const prediction = payload.data();
      const { uid } = prediction;
      const matchdayRef = await admin.firestore().collection("matchdays").doc(context.params.matchdayId).get();
      if (matchdayRef.data() && matchdayRef.data()!.status === "active") {
        return admin.firestore()
            .collection(`matchdays/${context.params.matchdayId}/predictions/${uid}`)
            .doc("y5FOib8bw8gtXM3BmSJLbqtM3wQ2").set({
              // validated prediction goes here
            });
      }
    });

// export const createPrediction = functions.firestore
//     .document("matchdays/{matchdayId}/predictions/{predictionId}")
//     .onCreate((payload, context) => {
//       const prediction = payload.data();
//       const { matchdayId } = context.params;
//       const matches = [];

//       if (prediction.userId &&
//         context.auth?.token &&
//         p.userId === context.auth?.uid &&
//         isPredictionvalid(p, matches)) {
//         // check if prediction is valid and user doesnt already have one
//         // if so insert it in the db
//       } else {
//         // do nothing
//       }
//       functions.logger.info("warn", { prediction });
//       return null;
//     });

// export const updatePrediction = functions.firestore
//     .document("matchdays/{matchdayId}/predictions/{predictionId}")
//     .onUpdate((change, context) => {
//       if (change.after.data().userId === context.auth?.uid &&
//       context.params.matchdayId === change.after.data().matchdayId) {
//         // check if prediction is valid
//         // if so insert it in the db
//       } else {
//         // do nothing
//       }
//       const predictions = change.after.data();
//       functions.logger.info("warn", {predictions});
//       return null;
//     });
