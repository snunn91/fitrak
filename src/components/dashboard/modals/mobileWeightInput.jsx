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
                placeholder="Enter a weight here"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
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
                type="submit"
                className="px-4 py-2 text-md text-white font-raleway rounded-lg bg-rose-900 hover:bg-rose-950 hover:shadow-xl hover:opacity-100 transition duration-300">
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
