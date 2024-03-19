import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { Input, Button } from "@nextui-org/react";
import { useAuth } from "../../../contexts/authContext";
import { db } from "../../../firebase/config"; // Assuming this is the correct import path
import { doc, setDoc } from "firebase/firestore";
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState(""); // Add state for first name
  const [lastName, setLastName] = useState(""); // Add state for last name
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

  const { userLoggedIn } = useAuth();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handle email input changes and validation
  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setIsEmailValid(validateEmail(inputEmail) || inputEmail === "");
  };
  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
    // Also validate confirm password whenever the password changes
    setIsConfirmPasswordValid(
      inputPassword === confirmPassword || confirmPassword === ""
    );
  };

  const handleConfirmPasswordChange = (e) => {
    const inputConfirmPassword = e.target.value;
    setConfirmPassword(inputConfirmPassword);
    setIsConfirmPasswordValid(inputConfirmPassword === password);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any existing error messages
    if (
      !isRegistering &&
      isEmailValid &&
      isConfirmPasswordValid &&
      email &&
      password &&
      confirmPassword
    ) {
      setIsRegistering(true);
      try {
        const userCredential = await doCreateUserWithEmailAndPassword(
          email,
          password
        );
        const user = userCredential.user;

        // Add personal details to Firestore
        const personalDetailsRef = doc(
          db,
          "users",
          user.uid,
          "personalDetails",
          "details"
        );
        await setDoc(
          personalDetailsRef,
          {
            userEmail: email,
            firstName: firstName,
            lastName: lastName,
          },
          { merge: true }
        );

        navigate("/dashboard"); // Navigate to the dashboard after successful signup
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsRegistering(false);
      }
    } else if (!isConfirmPasswordValid) {
      setErrorMessage("Passwords do not match.");
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/dashboard"} replace={true} />}

      <main className="w-full container-sm h-screen flex self-center place-content-center place-items-center">
        <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
          <div className="text-center mb-6">
            <div className="mt-2">
              <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">
                Create a New Account
              </h3>
            </div>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Input
                clearable
                label="First Name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* Last Name Input */}
            <div>
              <Input
                clearable
                label="Last Name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <Input
                clearable
                label="Email"
                value={email}
                onChange={handleEmailChange}
                onBlur={() =>
                  setIsEmailValid(validateEmail(email) || email === "")
                } // Validate on blur to show error after user finishes typing
                isValid={isEmailValid}
                errorMessage={!isEmailValid ? "Please enter a valid email" : ""}
              />
            </div>

            <div>
              <Input
                clearable
                type="password"
                label="Password"
                required
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            <div>
              <Input
                clearable
                type="password"
                label="Confirm Password"
                required
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                isValid={isConfirmPasswordValid}
                errorMessage={
                  !isConfirmPasswordValid ? "Passwords do not match" : ""
                }
              />
              {errorMessage && (
                <span className="text-red-600 font-bold">{errorMessage}</span>
              )}
            </div>

            {errorMessage && (
              <span className="text-red-600 font-bold">{errorMessage}</span>
            )}

            <Button
              data-hover="false"
              type="submit"
              disabled={
                isRegistering ||
                !isEmailValid ||
                !password ||
                !confirmPassword ||
                !isConfirmPasswordValid
              }
              className={`w-full px-4 py-2 text-white font-raleway rounded-lg ${
                isRegistering ||
                !isEmailValid ||
                !password ||
                !confirmPassword ||
                !isConfirmPasswordValid
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-rose-900 hover:bg-rose-950 hover:shadow-xl transition duration-300"
              }`}>
              {isRegistering ? "Signing Up..." : "Sign Up"}
            </Button>
            <div className="text-sm text-center">
              Already have an account? {"   "}
              <Link
                to={"/login"}
                className="text-center text-sm hover:underline font-bold">
                Continue
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Register;
