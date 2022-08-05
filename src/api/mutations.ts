import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "firebaseInstance";

  export const sendPrediction = async (args: { matchdayId: string; uid: string; matchScores: Object; }) => {
    const collectionName = `matchdays/${args.matchdayId}/predictions`;
    const newPredictionRef = doc(collection(db, collectionName), args.uid);
    return await setDoc(newPredictionRef, {
      scores: Object.keys(args.matchScores).map((matchId: string) => ({
        matchId,
        score: args.matchScores[matchId],
      })),
    });
  }