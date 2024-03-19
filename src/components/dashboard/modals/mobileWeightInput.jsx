// MobileWeightInput.js
import React, { useState } from "react";
import {
  Modal,
  Input,
  Button,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@nextui-org/react";

const MobileWeightInputModal = ({
  isModalOpen,
  toggleModal,
  onConfirm,
  activeInputId,
  activeExercise,
  isSubmitting,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleConfirm = () => {
    onConfirm(activeInputId, inputValue);
    setInputValue(""); // Reset the input field
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={toggleModal}
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              {" "}
              <p>{activeExercise}</p>
            </ModalHeader>
            <ModalBody>
              <Input
                clearable
                bordered
                fullWidth
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Weight"
              />
            </ModalBody>
            <ModalFooter>
              <Button auto flat color="error" onPress={onClose}>
                Cancel
              </Button>
              <Button
                isLoading={isSubmitting}
                auto
                onClick={handleConfirm}
                type="submit">
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default MobileWeightInputModal;
