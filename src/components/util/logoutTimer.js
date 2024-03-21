import { getAuth, signOut } from "firebase/auth";
let logoutTimer;

export const startLogoutTimer = () => {
  // Set timeout to 30 minutes (1800000 milliseconds)
  logoutTimer = setTimeout(() => {
    // Function to log the user out
    logoutUser();
  }, 1800000); // Adjust time as needed
};

export const resetLogoutTimer = () => {
  clearTimeout(logoutTimer);
  startLogoutTimer();
};

// Resets the timer on user actions
document.addEventListener("mousemove", resetLogoutTimer);
document.addEventListener("keypress", resetLogoutTimer);

// Initial timer start
startLogoutTimer();

async function logoutUser() {
  try {
    const auth = getAuth();

    // To sign out
    await signOut(auth);

    // Redirect to login page
    window.location.href = "/login";
  } catch (error) {
    console.error("Logout failed", error);
    // Optionally, display an error message to the user
  }
}
