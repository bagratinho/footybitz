import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyDW-33rVnSe7scpmTuntrahsfTOH2DvuWw",
  authDomain: "footybitz.firebaseapp.com",
  databaseURL: "https://footybitz.firebaseio.com",
  projectId: "footybitz",
  storageBucket: "footybitz.appspot.com",
  messagingSenderId: "753129013623",
  appId: "1:753129013623:web:d3c3d5dc4542ff97c46172",
  measurementId: "G-L92H5YYEYX",
};

// const config =
//   process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

// class Firebase {
//   constructor() {
//     app.initializeApp(config);
//   }
// }

interface IFirebase {
  auth: any;
  user: any;
  isAuthenticated: () => boolean;
  createUserWithEmailAndPassword: (email: string, password: string) => void;
  signInWithEmailAndPassword: (email: string, password: string) => boolean;
  signOut: () => boolean;
  sendPasswordResetEmail: (email: string) => boolean;
  updatePassword: (password: string) => boolean;
}

class Firebase<IFirebase> {
  private auth: any;
  private user: any = null;

  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    this.auth = firebase.app().auth();
    this.auth.onAuthStateChanged((user: any) => {
      console.log("Firebase:", user);
    });
  }

  private isAuthenticated = () => {
    return false;
  }

  private createUserWithEmailAndPassword = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  private signInWithEmailAndPassword = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);

  private signOut = () => this.auth.signOut();

  private sendPasswordResetEmail = (email: string) => this.auth.sendPasswordResetEmail(email);

  private updatePassword = (password: string) =>
    this.auth.currentUser.updatePassword(password);
};

export default Firebase;