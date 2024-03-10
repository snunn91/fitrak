import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  trainingTypeOptions,
  workouts,
  weekOptions,
  getExercisesBBPPLOne,
  getExercisesPBPPLOne,
} from "./arrays";
import { useAuth } from "../../contexts/authContext";
//NextUI
import {
  Select,
  SelectItem,
  Input,
  Button,
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
  const { currentUser } = useAuth();

  const [trainingType, setTrainingType] = useState(
    localStorage.getItem("trainingType") || "bodybuilding"
  );
  const [workoutType, setWorkoutType] = useState(
    localStorage.getItem("workoutType") || "pplOne"
  );

  const [currentWeek, setCurrentWeek] = useState(
    localStorage.getItem("currentWeek") || "weekOne"
  );

  //Workout Plans
  const exercisesBBPPLOne = getExercisesBBPPLOne(currentWeek);
  const exercisesPBPPLOne = getExercisesPBPPLOne(currentWeek);

  const [workoutData, setWorkoutData] = useState({});

  const [personalDetailsType, setPersonalDetailsType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch personal details and current week's workout data
    const fetchDetailsAndWorkout = async () => {
      if (!currentUser) return;
      localStorage.setItem("workoutType", workoutType);
      localStorage.setItem("currentWeek", currentWeek);
      // Personal details
      const personalDetailRef = doc(
        db,
        "users",
        currentUser.uid,
        "personalDetails",
        "details"
      );
      try {
        const detailSnap = await getDoc(personalDetailRef);
        if (detailSnap.exists()) {
          setFirstName(detailSnap.data().firstName || "");
          setLastName(detailSnap.data().lastName || "");
        }
      } catch (error) {
        console.error("Error getting personal details:", error);
      }

      // Current week's workout data
      const weekRef = doc(
        db,
        "users",
        currentUser.uid,
        "trainingType",
        trainingType,
        "workouts",
        workoutType,
        "week",
        currentWeek
      );
      try {
        const weekSnap = await getDoc(weekRef);
        if (weekSnap.exists()) {
          const data = weekSnap.data();
          setWorkoutData({
            exerciseOne: data.exerciseOne || "",
            exerciseTwo: data.exerciseTwo || "",
            exerciseThree: data.exerciseThree || "",
            exerciseFour: data.exerciseFour || "",
            exerciseFive: data.exerciseFive || "",
            exerciseSix: data.exerciseSix || "",
            exerciseSeven: data.exerciseSeven || "",
            exerciseEight: data.exerciseEight || "",
            exerciseNine: data.exerciseNine || "",
            exerciseTen: data.exerciseTen || "",
            exerciseEleven: data.exerciseEleven || "",
            exerciseTwelve: data.exerciseTwelve || "",
            exerciseThirteen: data.exerciseThirteen || "",
            exerciseFourteen: data.exerciseFourteen || "",
            exerciseFifteen: data.exerciseFifteen || "",
            exerciseSixteen: data.exerciseSixteen || "",
            exerciseSeventeen: data.exerciseSeventeen || "",
            exerciseEighteen: data.exerciseEighteen || "",
            exerciseNineteen: data.exerciseNineteen || "",
            exerciseTwenty: data.exerciseTwenty || "",
          });
        }
      } catch (error) {
        console.error(`Error getting data for ${currentWeek}:`, error);
      }
    };

    fetchDetailsAndWorkout();
  }, [currentUser, trainingType, workoutType, currentWeek]);

  const handleInputChange = (e, field) => {
    setWorkoutData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!currentUser) {
      setIsSubmitting(false);
      console.error("No user logged in");
      return;
    }

    // Submitting to the specific week document under the selected workout
    const weekRef = doc(
      db,
      "users",
      currentUser.uid,
      "trainingType",
      trainingType,
      "workouts",
      workoutType,
      "week",
      currentWeek
    );
    try {
      await setDoc(weekRef, workoutData, { merge: true });
      console.log(
        `${workoutType} ${trainingType} ${currentWeek} data successfully updated!`
      );
    } catch (error) {
      console.error(
        `Error updating ${workoutType} ${trainingType} ${currentWeek} data: `,
        error
      );
    } finally {
      setIsSubmitting(false); // Stop loading regardless of the outcome
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
    <div className="primary-height mx-6">
      <form onSubmit={handleUserDetailsSubmit}>
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

        <button type="submit">Save User Details</button>
      </form>
      <Select
        label="Select a workout plan"
        className="max-w-xs"
        value={workoutType}
        onChange={(e) => setWorkoutType(e.target.value)}>
        {workouts.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
      <Select
        label="Select a method of training"
        className="max-w-xs"
        value={trainingType}
        onChange={(e) => setTrainingType(e.target.value)}>
        {trainingTypeOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>

      <Select
        label="Select Week"
        className="max-w-xs mt-4"
        value={currentWeek}
        onChange={(e) => setCurrentWeek(e.target.value)}>
        {weekOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
      <div className="text-2xl font-bold pt-14">
        Hello {firstName}, you are now logged in. Welcome to the Dashboard
      </div>
      {/* <div>
                <label htmlFor="workoutType">Select Workout Plan:</label>
                <select id="workoutType" value={workoutType} onChange={(e) => setWorkoutType(e.target.value)}>
                    <option value="pplOne">PPL One</option>
                    <option value="pplTwo">PPL Two</option>
                </select>
            </div> */}
      <form onSubmit={handleSubmit}>
        {trainingType === "bodybuilding" && workoutType === "pplOne" && (
          <Card className="max-w-full">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <p>
                  {
                    trainingTypeOptions.find(
                      (option) => option.value === trainingType
                    )?.label
                  }
                </p>
                <p className="text-md">
                  {
                    workouts.find((option) => option.value === workoutType)
                      ?.label
                  }
                </p>
                <p className="text-md">
                  {
                    weekOptions.find((option) => option.value === currentWeek)
                      ?.label
                  }
                </p>
              </div>
              <div></div>
            </CardHeader>
            <Divider />
            <CardBody>
              {/* PPL One Table */}
              <div>
                <Table
                  isHeaderSticky
                  isStriped
                  className="max-h-[23rem] overflow-y-scroll"
                  aria-label="Example static collection table">
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
                    {exercisesBBPPLOne.map((exercise) => (
                      <TableRow key={exercise.id}>
                        <TableCell>{exercise.type}</TableCell>
                        <TableCell>{exercise.name}</TableCell>
                        <TableCell>{exercise.warmUpSets}</TableCell>
                        <TableCell>{exercise.workingSets}</TableCell>
                        <TableCell>{exercise.reps}</TableCell>
                        <TableCell>
                          <Input
                            type="text"
                            placeholder="add weight"
                            variant="underlined"
                            size="sm"
                            id={`${exercise.id}Input`}
                            value={workoutData[exercise.id]}
                            onChange={(e) => handleInputChange(e, exercise.id)}
                          />
                        </TableCell>
                        <TableCell>{exercise.RPE}</TableCell>
                        <TableCell>{exercise.rest}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardBody>
          </Card>
        )}
        {trainingType === "powerbuilding" && workoutType === "pplOne" && (
          <Card className="max-w-full">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <p>{trainingType}</p>
                <p className="text-md">{workoutType}</p>
                <p className="text-md">
                  {
                    weekOptions.find((option) => option.value === currentWeek)
                      ?.label
                  }
                </p>
              </div>
              <div></div>
            </CardHeader>
            <Divider />
            <CardBody>
              {/* PPL One Table */}
              <div>
                <Table
                  isHeaderSticky
                  isStriped
                  className="max-h-[23rem] overflow-y-scroll"
                  aria-label="Example static collection table">
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
                    {exercisesPBPPLOne.map((exercise) => (
                      <TableRow key={exercise.id}>
                        <TableCell>{exercise.type}</TableCell>
                        <TableCell>{exercise.name}</TableCell>
                        <TableCell>{exercise.warmUpSets}</TableCell>
                        <TableCell>{exercise.workingSets}</TableCell>
                        <TableCell>{exercise.reps}</TableCell>
                        <TableCell>
                          <Input
                            type="text"
                            placeholder="add weight"
                            variant="underlined"
                            size="sm"
                            id={`${exercise.id}Input`}
                            value={workoutData[exercise.id]}
                            onChange={(e) => handleInputChange(e, exercise.id)}
                          />
                        </TableCell>
                        <TableCell>{exercise.RPE}</TableCell>
                        <TableCell>{exercise.rest}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardBody>
          </Card>
        )}

        <Button isLoading={isSubmitting} type="submit">
          Submit
        </Button>
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
    </div>
  );
};

export default Dashboard;
