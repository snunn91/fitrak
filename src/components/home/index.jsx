import React, { useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { Link, Button } from "@nextui-org/react";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../firebase/auth";
import { Navigate } from "react-router-dom";
import heroImage from "../../assets/img/homepage/hero.jpg";
import logo from "../../assets/img/homepage/fitrak.png";
import LoginForm from "../auth/components/loginForm";

const Home = () => {
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
    <div className="h-full xl:primary-height bg-rose-900 ">
      <div
        style={{ backgroundImage: `url(${heroImage})` }}
        className="relative h-[35rem] w-full bg-cover bg-center bg-no-repeat">
        <div className="h-[35rem] absolute top-0 left-0 right-0 bottom-0 bg-gray-700 opacity-75"></div>
        {/* Text over the image and overlay */}
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center xl:justify-start xl:top-[-10rem] xl:left-[8rem]">
          <div
            style={{ backgroundImage: `url(${logo})` }}
            className="relative h-[120px] w-[750px] bg-cover bg-center bg-no-repeat"></div>
          <p></p>
        </div>
      </div>
      <div className="relative mt-[-1rem]">
        <div className="bg-rose-900 h-48 w-full skew-y-[-6deg] -translate-y-1/3"></div>
        <div className="bg-rose-900 h-[11rem] mt-[-10rem] w-full"></div>

        <div className="w-full container-sm absolute flex xl:justify-end top-0 xl:top-[-18rem] xl:right-0 xl:flex-row xl:container-lg">
          {userLoggedIn && <Navigate to={"/dashboard"} replace={true} />}
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
            validateEmail={validateEmail}></LoginForm>
        </div>
      </div>
      {/* <div className="bg-rose-900 w-full h-auto">
        
      </div> */}
    </div>
  );
};

export default Home;
