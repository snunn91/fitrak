import {
  Button,
  Link,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@nextui-org/react";

const NotesModal = ({ isModalOpen, toggleModal, exercise }) => {
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        size="sm"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}>
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader className="pt-4 pb-2">
                <h2 className="text-xl font-raleway pt-2">
                  {exercise.name} Notes
                </h2>
              </ModalHeader>
              <ModalBody className="pt-0 pb-4">
                <Link href={exercise.exerciseInfo}>
                  Click here exercise instructions
                </Link>
                <p></p>
              </ModalBody>
              <ModalFooter>
                <Button auto flat color="error" onPress={onClose}>
                  Dismiss
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
export default NotesModal;
