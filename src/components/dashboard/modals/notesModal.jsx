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
              <ModalHeader className="py-4">
                <h2 className="text-xl font-raleway pt-2">
                  {exercise.name} Notes
                </h2>
              </ModalHeader>
              <ModalBody className="pt-2 pb-4">
                <div className="flex flex-col gap-y-1">
                  <Link
                    className="font-semibold"
                    href={exercise.exerciseInfo}
                    target="_blank">
                    Click here to view exercise instructions
                  </Link>
                  <p>
                    {" "}
                    <span className="font-semibold">
                      Alternative Exercise:
                    </span>{" "}
                    {exercise.alternativeExercise}
                  </p>
                </div>
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
