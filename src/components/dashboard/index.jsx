import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  trainingTypeOptions,
  workouts,
  workoutMapping,
  weekOptions,
} from "../util/arrays";
import {
  getExercisesBBPPLOne,
  getExercisesBBPPLTwo,
  getExercisesBBHomeWithWeights,
  getExerciseBBUpperLower,
} from "../util/workouts/bodybuilding/workouts";

import { useAuth } from "../../contexts/authContext";
import { useModal } from "../../contexts/modalContext/modalContext";
//NextUI
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";

import WorkoutFilterModal from "./modals/workoutFilterModal";
import MobileWeightInputModal from "./modals/mobileWeightInput";
import NotesModal from "./modals/notesModal";
import WeekSelector from "./components/weekSelector";
import ExerciseTable from "./components/desktop/exerciseTable";
import ExerciseCard from "./components/mobile/exerciseCard";
import { startLogoutTimer } from "././../util/logoutTimer";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { modals, toggleModal } = useModal();

  // Local storage allows user to see the training type they last selected.
  // If they selected none, defaults to bodybuilding
  const [trainingType, setTrainingType] = useState(
    localStorage.getItem("trainingType") || "bodybuilding"
  );
  // Local storage allows user to see the workout type they last selected.
  // If they selected none, defaults to PPL one bodybuilding
  const [workoutType, setWorkoutType] = useState(
    localStorage.getItem("workoutType") || "pplOneBB"
  );
  // Local storage allows user to see the latest weeken they last selected.
  // If they selected none, defaults to week 1
  const [currentWeek, setCurrentWeek] = useState(
    localStorage.getItem("currentWeek") || "weekOne"
  );

  //Workout Plans
  const exercisesBBPPLOne = getExercisesBBPPLOne(currentWeek);
  const exercisesBBPPLTwo = getExercisesBBPPLTwo(currentWeek);
  const exerciseBBHomeWithWeights = getExercisesBBHomeWithWeights(currentWeek);
  const exerciseBBULOne = getExerciseBBUpperLower(currentWeek);
  // const exercisesPBPPLOne = getExercisesPBPPLOne(currentWeek);

  const [activeInputId, setActiveInputId] = useState("");
  const [currentExercise, setCurrentExercise] = useState("");
  const [activeExerciseName, setActiveExerciseName] = useState("");

  const [workoutData, setWorkoutData] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [filteredWorkouts, setFilteredWorkouts] = useState([]);

  //Week gebnerator depending on which training type and workout plan
  const getWeekOptionsToDisplay = () => {
    if (trainingType === "bodybuilding" && workoutType === "pplOneBB") {
      return weekOptions.slice(0, 10); // First 10 weeks for bodybuilding & pplOne
    } else if (trainingType === "bodybuilding" && workoutType === "pplTwoBB") {
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
    // start the logout timer when the app mounts
    startLogoutTimer();
  }, []);

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
            exerciseTwentyOne: data.exerciseTwentyOne || "",
            exerciseTwentyTwo: data.exerciseTwentyTwo || "",
            exerciseTwentyThree: data.exerciseTwentyThree || "",
            exerciseTwentyFour: data.exerciseTwentyFour || "",
            exerciseTwentyFive: data.exerciseTwentyFive || "",
            exerciseTwentySix: data.exerciseTwentySix || "",
            exerciseTwentySeven: data.exerciseTwentySeven || "",
            exerciseTwentyEight: data.exerciseTwentyEight || "",
            exerciseTwentyNine: data.exerciseTwentyNine || "",
            exerciseThirty: data.exerciseThirty || "",
            exerciseThirtyOne: data.exerciseThirtyOne || "",
            exerciseThirtyTwo: data.exerciseThirtyTwo || "",
            exerciseThirtyThree: data.exerciseThirtyThree || "",
            exerciseThirtyFour: data.exerciseThirtyFour || "",
            exerciseThirtyFive: data.exerciseThirtyFive || "",
            exerciseThirtySix: data.exerciseThirtySix || "",
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
        <Card shadow="md" className="h-full hidden md:block">
          <CardHeader className="flex gap-3 w-full items-center justify-between">
            <div className="flex flex-col">
              <h2 className="font-raleway text-3xl">
                {
                  trainingTypeOptions.find(
                    (option) => option.value === trainingType
                  )?.label
                }
              </h2>
              <div className="flex items-center justify-start gap-3">
                <div className="flex items-center justify-start gap-1">
                  <h3 className="font-raleway text-xl">
                    {
                      workouts.find((option) => option.value === workoutType)
                        ?.label
                    }
                  </h3>
                  <h3 className="font-raleway text-xl italic">
                    {
                      workouts.find((option) => option.value === workoutType)
                        ?.suffix
                    }
                  </h3>
                </div>

                <h4 className="font-raleway text-xl">
                  -&nbsp;
                  {
                    weekOptions.find((option) => option.value === currentWeek)
                      ?.label
                  }
                </h4>
              </div>
            </div>

            <WeekSelector
              className="hidden max-w-sm md:block"
              currentWeek={currentWeek}
              getWeekOptionsToDisplay={getWeekOptionsToDisplay}
              handleWeekChange={handleWeekChange}></WeekSelector>
          </CardHeader>
          <Divider />

          <CardBody>
            {trainingType === "bodybuilding" && (
              <div>
                {workoutType === "pplOneBB" && (
                  <div>
                    <ExerciseTable
                      exercisePlan={exercisesBBPPLOne}
                      handleInputChange={handleInputChange}
                      workoutData={workoutData}
                      setCurrentExercise={setCurrentExercise}></ExerciseTable>
                  </div>
                )}
                {workoutType === "pplTwoBB" && (
                  <div>
                    <ExerciseTable
                      exercisePlan={exercisesBBPPLTwo}
                      handleInputChange={handleInputChange}
                      workoutData={workoutData}
                      setCurrentExercise={setCurrentExercise}></ExerciseTable>
                  </div>
                )}
                {workoutType === "upperLowerOneBB" && (
                  <div>
                    <ExerciseTable
                      hasOneRepMax={false}
                      exercisePlan={exerciseBBULOne}
                      handleInputChange={handleInputChange}
                      workoutData={workoutData}
                      setCurrentExercise={setCurrentExercise}></ExerciseTable>
                  </div>
                )}
                {workoutType === "homeWithWeightsBB" && (
                  <div>
                    <ExerciseTable
                      exercisePlan={exerciseBBHomeWithWeights}
                      handleInputChange={handleInputChange}
                      workoutData={workoutData}
                      setCurrentExercise={setCurrentExercise}></ExerciseTable>
                  </div>
                )}
              </div>
            )}
            {trainingType === "strength" && (
              <div>
                {workoutType === "fullBodyOneS" ? (
                  <div></div>
                ) : (
                  <div className="flex items-center justify-center h-[300px] bg-stone-50">
                    <h3 className="font-raleway text-3xl ">
                      Plan Comming Soon
                    </h3>
                  </div>
                )}
                {workoutType === "fullBodyTwoS" ? (
                  <div></div>
                ) : (
                  <div className="flex items-center justify-center h-[300px] bg-stone-50">
                    <h3 className="font-raleway text-3xl ">
                      Plan Comming Soon
                    </h3>
                  </div>
                )}
              </div>
            )}
            {trainingType === "powerbuilding" && (
              <div>
                {workoutType === "pplOnePB" ? (
                  <div></div>
                ) : (
                  <div className="flex items-center justify-center h-[300px] bg-stone-50">
                    <h3 className="font-raleway text-3xl ">
                      Plan Comming Soon
                    </h3>
                  </div>
                )}
                {workoutType === "upperLowerOnePB" ? (
                  <div></div>
                ) : (
                  <div className="flex items-center justify-center h-[300px] bg-stone-50">
                    <h3 className="font-raleway text-3xl ">
                      Plan Comming Soon
                    </h3>
                  </div>
                )}
              </div>
            )}
          </CardBody>
          <CardFooter className="flex justify-end px-3 pb-3 border-t border-gray-200 border-solid">
            <Button
              data-hover="false"
              className="px-4 py-2 text-md text-white font-raleway rounded-lg bg-rose-900 hover:bg-rose-950 hover:shadow-xl hover:opacity-100 transition duration-300"
              isLoading={isSubmitting}
              type="submit">
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </Card>

        {/* Mobile View */}
        <div className="block md:hidden">
          <div className="flex flex-col gap-y-2">
            <h2 className="font-raleway text-2xl">
              {
                trainingTypeOptions.find(
                  (option) => option.value === trainingType
                )?.label
              }
            </h2>
            <div className="flex items-center justify-start gap-3">
              <div className="flex items-center justify-start gap-1">
                <h3 className="font-raleway text-lg">
                  {
                    workouts.find((option) => option.value === workoutType)
                      ?.label
                  }
                </h3>
                <h3 className="font-raleway text-lg italic">
                  {
                    workouts.find((option) => option.value === workoutType)
                      ?.suffix
                  }
                </h3>
              </div>

              <h4 className="font-raleway text-lg">
                -&nbsp;
                {
                  weekOptions.find((option) => option.value === currentWeek)
                    ?.label
                }
              </h4>
            </div>
            <WeekSelector
              className="block mb-4 md:hidden"
              currentWeek={currentWeek}
              getWeekOptionsToDisplay={getWeekOptionsToDisplay}
              handleWeekChange={handleWeekChange}></WeekSelector>
          </div>

          {trainingType === "bodybuilding" && (
            <div>
              {workoutType === "pplOneBB" && (
                <div>
                  <ExerciseCard
                    exercisePlan={exercisesBBPPLOne}
                    workoutData={workoutData}
                    setActiveExerciseName={setActiveExerciseName}
                    setActiveInputId={setActiveInputId}
                    setCurrentExercise={setCurrentExercise}
                    toggleModal={toggleModal}></ExerciseCard>
                </div>
              )}
              {workoutType === "pplTwoBB" && (
                <div>
                  <ExerciseCard
                    exercisePlan={exercisesBBPPLTwo}
                    workoutData={workoutData}
                    setActiveExerciseName={setActiveExerciseName}
                    setActiveInputId={setActiveInputId}
                    setCurrentExercise={setCurrentExercise}
                    toggleModal={toggleModal}></ExerciseCard>
                </div>
              )}
              {workoutType === "upperLowerOneBB" && (
                <div>
                  <ExerciseCard
                    exercisePlan={exerciseBBULOne}
                    workoutData={workoutData}
                    setActiveExerciseName={setActiveExerciseName}
                    setActiveInputId={setActiveInputId}
                    setCurrentExercise={setCurrentExercise}
                    toggleModal={toggleModal}></ExerciseCard>
                </div>
              )}
              {workoutType === "homeWithWeightsBB" && (
                <div>
                  <ExerciseCard
                    exercisePlan={exerciseBBHomeWithWeights}
                    workoutData={workoutData}
                    setActiveExerciseName={setActiveExerciseName}
                    setActiveInputId={setActiveInputId}
                    setCurrentExercise={setCurrentExercise}
                    toggleModal={toggleModal}></ExerciseCard>
                </div>
              )}
            </div>
          )}
        </div>
      </form>
      <NotesModal
        isModalOpen={modals.notesModal}
        toggleModal={() => toggleModal("notesModal")}
        exercise={currentExercise}></NotesModal>
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
