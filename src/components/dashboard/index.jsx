import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/authContext";
//NextUI
import {
  Select,
  SelectItem,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const Dashboard = () => {
  const animals = [
    { label: "PPL One", value: "pplOne" },
    { label: "PPL Two", value: "pplTwo" },
  ];
  const { currentUser } = useAuth();
  const [inputValue, setInputValue] = useState("");
  const [workoutType, setWorkoutType] = useState("pplOne"); // Default to pplOne
  const [exerciseOne, setExerciseOne] = useState("");
  const [exerciseTwo, setExerciseTwo] = useState("");
  const [exerciseThree, setExerciseThree] = useState("");

  const [personalDetailsType, setPersonalDetailsType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        const workoutRef = doc(
          db,
          "users",
          currentUser.uid,
          "workouts",
          workoutType
        );
        try {
          const docSnap = await getDoc(workoutRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            // Assuming the data fields are named consistently with the state variables
            setExerciseOne(data[`${workoutType}ExerciseOne`] || "");
            setExerciseTwo(data[`${workoutType}ExerciseTwo`] || "");
            setExerciseThree(data[`${workoutType}ExerciseThree`] || "");
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error getting document:", error);
        }

        const personalDetailRef = doc(
          db,
          "users",
          currentUser.uid,
          "personalDetails",
          "details",
          personalDetailsType
        );
        try {
          const docSnap = await getDoc(personalDetailRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setFirstName(data.firstName || "");
            setLastName(data.lastName || "");
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error getting document:", error);
        }
      }
    };

    fetchData();
  }, [currentUser, workoutType, personalDetailsType]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      console.error("No user logged in");
      return;
    }

    const workoutRef = doc(
      db,
      "users",
      currentUser.uid,
      "workouts",
      workoutType
    );
    try {
      await setDoc(
        workoutRef,
        {
          [`${workoutType}ExerciseOne`]: exerciseOne,
          [`${workoutType}ExerciseTwo`]: exerciseTwo,
          [`${workoutType}ExerciseThree`]: exerciseThree,
          // Add more sets as needed
        },
        { merge: true }
      );
      console.log(`${workoutType} data successfully written!`);
    } catch (error) {
      console.error(`Error writing ${workoutType} data: `, error);
    }
  };
  const handleUserDetailsSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      console.error("No user logged in");
      return;
    }
    const personalDetailRef = doc(
      db,
      "users",
      currentUser.uid,
      "personalDetails",
      "details",
      personalDetailsType
    );
    try {
      await setDoc(
        personalDetailRef,
        {
          userEmail: currentUser.email,
          firstName: firstName,
          lastName: lastName,
        },
        { merge: true }
      );
      console.log(`${personalDetailsType} data successfully written!`);
    } catch (error) {
      console.error(`Error writing ${personalDetailsType} data: `, error);
    }
  };

  return (
    <>
      <form onSubmit={handleUserDetailsSubmit}>
        <div className="mt-20">
          <input
            type="text"
            id="firstNameInput"
            placeholder="first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            id="lastNameInput"
            placeholder="last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <button type="submit">Save User Details</button>
      </form>
      <Select
        label="Select an animal"
        className="max-w-xs mt-20"
        value={workoutType}
        onChange={(e) => setWorkoutType(e.target.value)}>
        {animals.map((animal) => (
          <SelectItem key={animal.value} value={animal.value}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
      <div className="text-2xl font-bold pt-14">
        Hello {currentUser?.displayName || currentUser?.email}, you are now
        logged in. Welcome to the Dashboard
      </div>
      {/* <div>
                <label htmlFor="workoutType">Select Workout Plan:</label>
                <select id="workoutType" value={workoutType} onChange={(e) => setWorkoutType(e.target.value)}>
                    <option value="pplOne">PPL One</option>
                    <option value="pplTwo">PPL Two</option>
                </select>
            </div> */}
      <form onSubmit={handleSubmit}>
        <div>
          <Card className="max-w-full">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <p className="text-md">{workoutType}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <Table isStriped aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn></TableColumn>
                  <TableColumn>Exercise</TableColumn>
                  <TableColumn>Warm up Sets</TableColumn>
                  <TableColumn>Working Sets</TableColumn>
                  <TableColumn>Reps</TableColumn>
                  <TableColumn>Weight</TableColumn>
                  <TableColumn>RPE</TableColumn>
                  <TableColumn>Rest Time</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                    <TableCell>Push</TableCell>
                    <TableCell>Barbell Bench Press</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>8-10</TableCell>
                    <TableCell>
                      <input
                        type="text"
                        id="exerciseOneInput"
                        value={exerciseOne}
                        onChange={(e) => setExerciseOne(e.target.value)}
                      />
                    </TableCell>
                    <TableCell>9</TableCell>
                    <TableCell>2-3mins</TableCell>
                  </TableRow>
                  <TableRow key="2">
                    <TableCell></TableCell>
                    <TableCell>Dumbbell Shoulder Press</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>8-10</TableCell>
                    <TableCell>
                      <input
                        type="text"
                        id="exerciseTwoInput"
                        value={exerciseTwo}
                        onChange={(e) => setExerciseTwo(e.target.value)}
                      />
                    </TableCell>
                    <TableCell>9</TableCell>
                    <TableCell>2-3mins</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </div>
        {/* <label htmlFor="exerciseInput">{workoutType} Exercise Set One:</label>
        <input
          type="text"
          id="exerciseInput"
          placeholder={`Enter ${workoutType} exercise one`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        /> */}
        <button type="submit">Submit</button>
      </form>
      {/* {Object.keys(userData).length > 0 ? (
        <div className="mt-20">
          <h2>Your Data for {workoutType}</h2>
          <p>
            {workoutType} Exercise One:{" "}
            {userData[`${workoutType}ExerciseOne`] || "No data"}
          </p>
          
        </div>
      ) : (
        <p>No data available. Please submit some workout data.</p>
      )} */}
    </>
  );
};

export default Dashboard;
