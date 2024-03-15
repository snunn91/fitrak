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
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleConfirm = () => {
    onConfirm(activeInputId, inputValue);
    setInputValue(""); // Reset the input field
  };

  return (
    <Modal isOpen={isModalOpen} onClose={toggleModal}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Enter Weight</ModalHeader>
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
              <Button auto onClick={handleConfirm}>
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
