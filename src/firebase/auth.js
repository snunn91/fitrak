import { auth, db } from "./config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // sendPasswordResetEmail,
  // sendEmailVerification,
  // updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if this is the first login by the user
    const userDocRef = doc(db, "users", user.uid, "personalDetails", "details");
    const docSnap = await getDoc(userDocRef);

    if (!docSnap.exists()) {
      // Add user details to Firestore if it's their first login
      await setDoc(userDocRef, {
        firstName: user.displayName ? user.displayName.split(" ")[0] : "", // Assuming the first name is the first part of the displayName
        lastName: user.displayName ? user.displayName.split(" ")[1] || "" : "", // Assuming the last name is the second part of the displayName, if it exists
        email: user.email,
      });
    }

    return user; // You might want to return the user object for further use
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    throw error; // Propagate the error to be handled by the caller
  }
};

export const doSignOut = () => {
  return auth.signOut();
};

// export const doPasswordReset = (email) => {
//   return sendPasswordResetEmail(auth, email);
// };

// export const doPasswordChange = (password) => {
//   return updatePassword(auth.currentUser, password);
// };

// export const doSendEmailVerification = () => {
//   return sendEmailVerification(auth.currentUser, {
//     url: `${window.location.origin}/home`,
//   });
// };
