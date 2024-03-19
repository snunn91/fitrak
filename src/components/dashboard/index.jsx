import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  trainingTypeOptions,
  workouts,
  workoutMapping,
  weekOptions,
} from "../util/arrays";
import { getExercisesBBPPLOne } from "../util/workouts/bodybuilding/workouts";
import { getExercisesPBPPLOne } from "../util/workouts/powerbuilding/workouts";
import { useAuth } from "../../contexts/authContext";
import { useModal } from "../../contexts/modalContext/modalContext";
//NextUI
import {
  Select,
  SelectItem,
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import WorkoutFilterModal from "./modals/workoutFilterModal";
import MobileWeightInputModal from "./modals/mobileWeightInput";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { modals, toggleModal } = useModal();

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

  const [activeInputId, setActiveInputId] = useState("");
  const [activeExerciseName, setActiveExerciseName] = useState("");

  const [workoutData, setWorkoutData] = useState({});

  // const [personalDetailsType, setPersonalDetailsType] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [filteredWorkouts, setFilteredWorkouts] = useState([]);

  //Week gebnerator depending on which training type and workout plan
  const getWeekOptionsToDisplay = () => {
    if (trainingType === "bodybuilding" && workoutType === "pplOne") {
      return weekOptions.slice(0, 10); // First 10 weeks for bodybuilding & pplOne
    } else if (trainingType === "bodybuilding" && workoutType === "pplTwo") {
      return weekOptions.slice(0, 10);
    } else {
      return weekOptions; // Default to first 10 weeks for other cases
    }
  };
  const handleWeekChange = (e) => {
    const newWeek = e.target.value;
    setCurrentWeek(newWeek); // Update React state
    localStorage.setItem("currentWeek", newWeek); // Update local storage
    console.log("Week updated to:", newWeek);
  };

  useEffect(() => {
    // Fetch personal details and current week's workout data
    const fetchDetailsAndWorkout = async () => {
      if (!currentUser) return;
      localStorage.setItem("workoutType", workoutType);
      localStorage.setItem("currentWeek", currentWeek);
      localStorage.setItem("trainingType", trainingType);
      // Personal details
      // const personalDetailRef = doc(
      //   db,
      //   "users",
      //   currentUser.uid,
      //   "personalDetails",
      //   "details"
      // );
      // try {
      //   const detailSnap = await getDoc(personalDetailRef);
      //   if (detailSnap.exists()) {
      //     setFirstName(detailSnap.data().firstName || "");
      //     setLastName(detailSnap.data().lastName || "");
      //   }
      // } catch (error) {
      //   console.error("Error getting personal details:", error);
      // }

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

  useEffect(() => {
    const filteredWorkoutOptions = workouts.filter((workout) =>
      workoutMapping[trainingType]?.includes(workout.value)
    );
    setFilteredWorkouts(filteredWorkoutOptions);

    // Reset workoutType if it's not available in the new trainingType
    if (
      !filteredWorkoutOptions.some((option) => option.value === workoutType)
    ) {
      setWorkoutType(filteredWorkoutOptions[0]?.value || "");
    }
  }, [trainingType, workoutType]);

  const handleInputChange = (e, field) => {
    setWorkoutData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };
  const handleConfirmWeightInput = async (inputId, inputValue) => {
    setIsSubmitting(true); // Indicate loading
    setWorkoutData((prevData) => ({
      ...prevData,
      [inputId]: inputValue,
    }));
    const updatedData = {
      ...workoutData,
      [inputId]: inputValue,
    };

    // Document reference
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
      // Save updated data to database
      await setDoc(weekRef, updatedData, { merge: true });
      console.log("Data successfully updated");
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setIsSubmitting(false); // Reset loading indicator
      toggleModal("mobileInputModal"); // Close modal
      setActiveInputId(""); // Reset active input ID
    }
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

  return (
    <div className="primary-height mx-6">
      {/* <p>
        {firstName}, {lastName}
      </p> */}
      {/* <div className="text-2xl font-bold pt-14">
        Hello {firstName}, you are now logged in. Welcome to the Dashboard
      </div> */}
      <form onSubmit={handleSubmit} className="py-4">
        <Card shadow="md" className="h-full hidden sm:block">
          <CardHeader className="flex gap-3 w-full items-center justify-between">
            <div className="flex flex-col">
              <h2 className="font-roboto text-3xl">
                {
                  trainingTypeOptions.find(
                    (option) => option.value === trainingType
                  )?.label
                }
              </h2>
              <div className="flex items-center justify-start gap-3">
                <h3 className="font-roboto text-xl">
                  {
                    workouts.find((option) => option.value === workoutType)
                      ?.label
                  }
                </h3>

                <h4 className="font-roboto text-xl">
                  -&nbsp;
                  {
                    weekOptions.find((option) => option.value === currentWeek)
                      ?.label
                  }
                </h4>
              </div>
            </div>
            {trainingType === "bodybuilding" && workoutType === "pplOne" && (
              <Select
                label="Select Week"
                className="max-w-sm"
                value={currentWeek}
                onChange={handleWeekChange}>
                {getWeekOptionsToDisplay().map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </Select>
            )}
          </CardHeader>
          <Divider />

          <CardBody>
            {trainingType === "bodybuilding" && workoutType === "pplOne" && (
              <div>
                <Table
                  removeWrapper
                  isHeaderSticky
                  isStriped
                  className="workout-table overflow-y-scroll"
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
                            color="primary"
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
            )}
            {trainingType === "powerbuilding" && workoutType === "pplOne" && (
              <div>{/* table to go here */}</div>
            )}
          </CardBody>
          <CardFooter className="flex justify-end px-3 pt-0 pb-3">
            <Button
              data-hover="false"
              className="px-4 py-2 text-md text-white font-roboto rounded-lg bg-rose-900 hover:bg-rose-950 hover:shadow-xl hover:opacity-100 transition duration-300"
              isLoading={isSubmitting}
              type="submit">
              Save
            </Button>
          </CardFooter>
        </Card>

        {/* Mobile View */}
        <Select
          label="Select Week"
          className="block max-w-sm mb-2 sm:hidden"
          value={currentWeek}
          onChange={handleWeekChange}>
          {getWeekOptionsToDisplay().map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
        {trainingType === "bodybuilding" && workoutType === "pplOne" && (
          <div>
            {exercisesBBPPLOne.map((exercise, index) => (
              <div
                className=""
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setActiveInputId(exercise.id); // Set the active input ID
                    setActiveExerciseName(exercise.name);
                    toggleModal("mobileInputModal"); // Open the modal
                  }
                }}>
                <Card
                  key={exercise.id}
                  shadow="md"
                  className={`flex flex-col gap-y-2 p-3 w-full sm:hidden ${
                    index > 0 ? "mt-2" : ""
                  }`}>
                  <div className="flex items-baseline justify-start gap-x-1">
                    <h2 className="text-xl font-roboto max-w-[565px] whitespace-nowrap overflow-hidden text-ellipsis">
                      {exercise.name}
                    </h2>
                    <p className="text-sm italic">({exercise.typeMobile})</p>
                  </div>
                  <div className="flex items-center justify-start gap-x-3">
                    <div className="flex items-center justify-center flex-col">
                      <p
                        className="text-xs text-stone-500"
                        aria-label="Warmup Sets">
                        WS
                      </p>
                      <p>{exercise.warmUpSets}</p>
                    </div>
                    <div className="flex items-center justify-center flex-col">
                      <p
                        className="text-xs text-stone-500"
                        aria-label="Working Sets">
                        Sets
                      </p>
                      <p>{exercise.workingSets}</p>
                    </div>
                    <div className="flex items-center justify-center flex-col">
                      <p className="text-xs text-stone-500" aria-label="RPE">
                        RPE
                      </p>
                      <p>{exercise.RPE}</p>
                    </div>
                    <div className="flex items-center justify-center flex-col">
                      <p className="text-xs text-stone-500" aria-label="Reps">
                        Reps
                      </p>
                      <p>{exercise.reps}</p>
                    </div>
                    <div className="flex items-center justify-center flex-col">
                      <p className="text-xs text-stone-500" aria-label="Rest">
                        Rest(min)
                      </p>
                      <p>{exercise.rest}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-start">
                    <div className="flex items-start justify-start flex-col">
                      <p className="text-xs text-stone-500" aria-label="Weight">
                        Weight
                      </p>
                      <h3 className="text-xl ">{workoutData[exercise.id]}</h3>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
      </form>

      <WorkoutFilterModal
        isModalOpen={modals.workoutFilterModal}
        toggleModal={() => toggleModal("workoutFilterModal")}
        trainingType={trainingType}
        setTrainingType={setTrainingType}
        workoutType={workoutType}
        setWorkoutType={setWorkoutType}
        filteredWorkouts={filteredWorkouts}
      />
      <MobileWeightInputModal
        isModalOpen={modals.mobileInputModal}
        toggleModal={() => toggleModal("mobileInputModal")}
        activeInputId={activeInputId}
        activeExercise={activeExerciseName}
        onConfirm={handleConfirmWeightInput}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default Dashboard;
