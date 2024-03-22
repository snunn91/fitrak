import React from "react";
import { trainingTypeOptions } from "../../util/arrays";
//NextUI
import {
  Select,
  SelectItem,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

function WorkoutFilterModal({
  isModalOpen,
  toggleModal,
  trainingType,
  setTrainingType,
  workoutType,
  setWorkoutType,
  filteredWorkouts,
}) {
  return (
    <Modal
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
            <ModalHeader className="pt-4 pb-2">
              <h2 className="text-xl font-raleway pt-4">Choose your workout</h2>
            </ModalHeader>
            <ModalBody className="pt-2 pb-2">
              <Select
                label="Select a method of training"
                className=""
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
                className=""
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
