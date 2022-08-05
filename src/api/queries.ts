import { collection, doc, getDoc, getDocs, limit, orderBy, query, startAt, where } from "firebase/firestore";
import { db } from "firebaseInstance";

// Get active matchdays
export const getMatchdays = async () => {
  const matchesCollectionRef = collection(db, "matchdays");
  const q = query(
      matchesCollectionRef,
      where("kickOffDate", ">", new Date(Date.now())),
      where("status", "==", "active"),
      orderBy("kickOffDate", "asc"),
    );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
}

// Get matches from selected matchday
export const getMatches = async (matchdayId: string) => {
  const matchesCollectionRef = collection(db, `matchdays/${matchdayId}/matches`);
  const q = query(
      matchesCollectionRef,
      where("matchdayId", "==", matchdayId),
      orderBy("kickOffDate", "asc")
    );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
}

// Get user data
export const getUserData = async (userId: string) => {
  const userRef = doc(db, `users/${userId}`);
  const user = await getDoc(userRef);
  return user.data();
}

// Get users prediction on a specified matchday
export const getPrediction = async (matchdayId: string, userId: string) => {
  const predictionRef = doc(db, `matchdays/${matchdayId}/predictions/${userId}`);
  const prediction = await getDoc(predictionRef);
  return prediction.data();
}

// Get paginated predictions for a specified matchday
export const getPredictions = async (matchdayId: string, page: number) => {
  const predictionsCollectionRef = collection(db, `matchdays/${matchdayId}/predictions`);
  const q = query(
    predictionsCollectionRef,
    orderBy("scores", "asc"),
    startAt(page * 20 ),
    limit(20)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

