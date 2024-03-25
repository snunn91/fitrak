import React, { useState } from "react";
import { trainingTypeOptions } from "../../util/arrays";
//NextUI
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import WorkoutCarousel from "../../util/workouts/workoutCarousel";
import BodybuildingIcon from "../../../assets/icons/bodybuilding-icon.png";
import PowerbuildingIcon from "../../../assets/icons/powerbuilding-icon.png";
import StrengthIcon from "../../../assets/icons/strength-icon.png";

function WorkoutFilterModal({
  isModalOpen,
  toggleModal,
  trainingType,
  setTrainingType,
  workoutType,
  setWorkoutType,
  filteredWorkouts,
}) {
  const [isTrainingChecked, setTrainingIsChecked] = useState(false);
  const [isWorkoutChecked, setIsWorkoutChecked] = useState(false);

  const handleTrainingTypeChange = (e) => {
    setTrainingType(e.target.value);
    setTrainingIsChecked(true);
  };
  const handleWorkoutType = (e) => {
    setWorkoutType(e.target.value);
    setIsWorkoutChecked(true);
    console.log(setIsWorkoutChecked);
  };

  return (
    <Modal
      backdrop="opaque"
      size="4xl"
      isOpen={isModalOpen}
      onClose={toggleModal}
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="py-4">
              <h2 className="text-xl font-raleway pt-4">Choose your workout</h2>
            </ModalHeader>
            <ModalBody className="pt-2 pb-6">
              <div className="mb-4 w-full">
                <div className="w-full flex flex-row justify-center gap-x-3">
                  {trainingTypeOptions.map((option) => (
                    <div key={option.value} className="">
                      <label
                        className={`relative flex flex-col items-center justify-center gap-y-1 cursor-pointer p-4 bg-stone-200 rounded-lg hover:bg-stone-300 w-[150px] h-[150px] ${
                          trainingType === option.value
                            ? "ring-2 ring-rose-900 "
                            : ""
                        }`}>
                        <div
                          style={{
                            backgroundImage:
                              option.value === "bodybuilding"
                                ? `url(${BodybuildingIcon})`
                                : option.value === "powerbuilding"
                                ? `url(${PowerbuildingIcon})`
                                : option.value === "strength"
                                ? `url(${StrengthIcon})`
                                : "",
                          }}
                          className="relative h-[65px] w-[250px] bg-cover bg-center bg-no-repeat"></div>
                        <input
                          type="radio"
                          name="trainingType"
                          value={option.value}
                          checked={trainingType === option.value}
                          onChange={handleTrainingTypeChange}
                          className="mr-2 appearance-none" // Hide the default radio button appearance
                        />
                        {trainingType === option.value && (
                          <FontAwesomeIcon
                            className={`absolute bg-white rounded-full text-3xl top-[-16px] left-[60px] text-rose-900 ${
                              isTrainingChecked
                                ? "animate-fadeIn"
                                : "animate-fadeOut"
                            }`}
                            icon={faCircleCheck}></FontAwesomeIcon>
                        )}
                        <span className="font-raleway font-semibold text- ">
                          {option.label}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <WorkoutCarousel
                filteredWorkouts={filteredWorkouts}
                workoutType={workoutType}
                handleWorkoutType={handleWorkoutType}
                isWorkoutChecked={isWorkoutChecked}
              />
            </ModalBody>
            <ModalFooter>
              <Button auto flat color="error" onPress={onClose}>
                Dismiss
              </Button>
              <Button
                data-hover="false"
                className="px-4 py-2 text-lg text-white font-raleway font-semiBold rounded-lg bg-rose-900 hover:bg-rose-950 hover:shadow-xl hover:opacity-100 transition duration-300"
                onPress={onClose}>
                Lets Go!
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default WorkoutFilterModal;
