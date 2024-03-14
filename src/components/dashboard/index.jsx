import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  trainingTypeOptions,
  workouts,
  workoutMapping,
  weekOptions,
} from "./arrays";
import { getExercisesBBPPLOne, getExercisesPBPPLOne } from "../util/workouts";
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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import WorkoutFilterModal from "./modals/workoutFilterModal";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { isModalOpen, toggleModal } = useModal();

  const [trainingType, setTrainingType] = useState(
    localStorage.getItem("trainingType") || "bodybuilding"
  );
  const [workoutType, setWorkoutType] = useState(
    localStorage.getItem("workoutType") || "pplOne"
  );

  const [currentWeek, setCurrentWeek] = useState(
    localStorage.getItem("currentWeek") || "weekOne"
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  //Workout Plans
  const exercisesBBPPLOne = getExercisesBBPPLOne(currentWeek);
  const exercisesPBPPLOne = getExercisesPBPPLOne(currentWeek);

  const [workoutData, setWorkoutData] = useState({});

  const [personalDetailsType, setPersonalDetailsType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [filteredWorkouts, setFilteredWorkouts] = useState([]);

  useEffect(() => {
    // Fetch personal details and current week's workout data
    const fetchDetailsAndWorkout = async () => {
      if (!currentUser) return;
      localStorage.setItem("workoutType", workoutType);
      localStorage.setItem("currentWeek", currentWeek);
      localStorage.setItem("trainingType", trainingType);
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
      <p>
        {firstName}, {lastName}
      </p>
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
                {workouts.find((option) => option.value === workoutType)?.label}
              </p>
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
            </div>
            <div></div>
          </CardHeader>
          <Divider />

          <CardBody>
            {trainingType === "bodybuilding" && workoutType === "pplOne" && (
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
            )}
            {trainingType === "powerbuilding" && workoutType === "pplOne" && (
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
            )}
          </CardBody>
          <CardFooter>
            <Button isLoading={isSubmitting} type="submit">
              Submit
            </Button>
          </CardFooter>
        </Card>
      </form>

      {/* <Modal
        backdrop="opaque"
        isOpen={isModalOpen}
        onClose={toggleModal}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
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
                  label="Select a workout plan"
                  className="max-w-xs"
                  value={workoutType}
                  onChange={(e) => setWorkoutType(e.target.value)}>
                  {filteredWorkouts.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="px-4 py-2 text-lg text-white font-roboto font-semiBold rounded-lg bg-rose-900 hover:bg-rose-950 hover:shadow-xl hover:opacity-100 transition duration-300"
                  onPress={onClose}>
                  Done
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal> */}
      <WorkoutFilterModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        trainingType={trainingType}
        setTrainingType={setTrainingType}
        workoutType={workoutType}
        setWorkoutType={setWorkoutType}
        filteredWorkouts={filteredWorkouts}></WorkoutFilterModal>
    </div>
  );
};

export default Dashboard;
