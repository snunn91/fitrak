import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "fitrak-fcc7b.firebaseapp.com",
  projectId: "fitrak-fcc7b",
  storageBucket: "fitrak-fcc7b.appspot.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

// const workoutsCollectionRef = collection(db, "workouts");

export { auth, app, db };

//This will be needed when I create a Production Firebase Database
// const firebaseConfigDevelopment = {
//   apiKey: "API_KEY_DEV",
//   authDomain: "PROJECT_ID_DEV.firebaseapp.com",
//   // other config values
// };

// const firebaseConfigProduction = {
//   apiKey: "API_KEY_PROD",
//   authDomain: "PROJECT_ID_PROD.firebaseapp.com",
//   // other config values
// };

// // Select config based on the environment
// const firebaseConfig =
//   process.env.NODE_ENV === "production"
//     ? firebaseConfigProduction
//     : firebaseConfigDevelopment;

// // Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
//}
