import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDW-33rVnSe7scpmTuntrahsfTOH2DvuWw",
  authDomain: "footybitz.firebaseapp.com",
  databaseURL: "https://footybitz.firebaseio.com",
  projectId: "footybitz",
  storageBucket: "footybitz.appspot.com",
  messagingSenderId: "753129013623",
  appId: "1:753129013623:web:d3c3d5dc4542ff97c46172",
  measurementId: "G-L92H5YYEYX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
