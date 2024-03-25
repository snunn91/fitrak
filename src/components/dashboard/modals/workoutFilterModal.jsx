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
  //Grabbing the label based on the trainingType value. This will be used for my Carousel that needs the label passed to it.
  const trainingTypeLabel = trainingTypeOptions.find(
    (option) => option.value === trainingType
  )?.label;
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
      size="3xl"
      isOpen={isModalOpen}
      onClose={toggleModal}
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="py-4 justify-center">
              <h2 className="text-xl font-raleway pt-4 text-center">
                Choose your workout
              </h2>
            </ModalHeader>
            <ModalBody className="pt-2 pb-6">
              <div className="mb-4 w-full">
                <div className="w-full flex flex-row justify-center gap-x-3">
                  {trainingTypeOptions.map((option) => (
                    <div key={option.value} className="">
                      <label
                        className={`relative flex flex-col items-center justify-center gap-y-1 w-[100px] h-[100px]  cursor-pointer p-4 bg-stone-100 rounded-lg hover:bg-stone-200 hover:shadow-xl hover:opacity-100 transition duration-300 sm:w-[150px] sm:h-[150px] ${
                          trainingType === option.value
                            ? "ring-2 ring-rose-900 "
                            : ""
                        }`}>
                        {option.value === "bodybuilding" && (
                          <div className="realtive bg-bodybuildingIcon bg-cover bg-center bg-no-repeat h-[36px] w-[52px] sm:h-[55px] sm:w-[80px] "></div>
                        )}
                        {option.value === "strength" && (
                          <div className="realtive bg-strengthIcon bg-cover bg-center bg-no-repeat h-[36px] w-[51px] sm:h-[55px] sm:w-[78px] "></div>
                        )}
                        {option.value === "powerbuilding" && (
                          <div className="realtive bg-powerbuildingIcon bg-cover bg-center bg-no-repeat h-[36px] w-[46px] sm:h-[55px] sm:w-[70px] "></div>
                        )}
                        {/* <div
                          style={{
                            backgroundImage:
                              option.value === "bodybuilding"
                                ? `url(${BodybuildingIcon})`
                                : option.value === "powerbuilding"
                                ? `url(${PowerbuildingIcon})`
                                : option.value === "strength"
                                ? `url(${StrengthIcon})`
                                : "",
                            height:
                              option.value === "bodybuilding"
                                ? "55px"
                                : option.value === "strength"
                                ? "55px"
                                : option.value === "powerbuilding"
                                ? "56px"
                                : "",
                            width:
                              option.value === "bodybuilding"
                                ? "80px"
                                : option.value === "strength"
                                ? "80px"
                                : option.value === "powerbuilding"
                                ? "70px"
                                : "",
                          }}
                          className="relative h-[65px] w-[250px] bg-cover bg-center bg-no-repeat"></div> */}
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
                        <span className="font-raleway font-semibold text-sm sm:text-md">
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
                trainingTypeLabel={trainingTypeLabel}
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
