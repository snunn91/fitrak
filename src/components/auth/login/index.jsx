import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/loginForm";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../../firebase/auth";
import { useAuth } from "../../../contexts/authContext";

const Login = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  // Validate email format
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handle email input changes and validation
  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    // Check if the email is valid or not and update state accordingly
    setIsEmailValid(validateEmail(inputEmail) || inputEmail === ""); // Assuming empty input as valid for initial state
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        // Optionally, redirect the user or clear the form here.
      } catch (error) {
        // Here you set the error message if the credentials are incorrect
        setErrorMessage("Incorrect credentials. Try again.");
        setIsSigningIn(false); // Reset this to allow the user to try again
      }
    }
  };

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((err) => {
        setIsSigningIn(false);
      });
    }
  };

  return (
    <div>
      {userLoggedIn && <Navigate to={"/dashboard"} replace={true} />}

      <main className="w-full primary-height flex self-center place-content-center place-items-center">
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isSigningIn={isSigningIn}
          onSubmit={onSubmit}
          onGoogleSignIn={onGoogleSignIn}
          errorMessage={errorMessage}
          isEmailValid={isEmailValid}
          handleEmailChange={handleEmailChange}
          setIsEmailValid={setIsEmailValid}
          validateEmail={validateEmail}
        />
      </main>
    </div>
  );
};

export default Login;
