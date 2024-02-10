import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from "firebase/firestore";

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

const workoutsCollectionRef = collection(db, "workouts");

export { auth, app, db, workoutsCollectionRef };

