import {
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { useModal } from "../../../../contexts/modalContext/modalContext";

const ExerciseTable = ({
  exercisePlan,
  workoutData,
  handleInputChange,
  setCurrentExercise,
}) => {
  const { toggleModal } = useModal();
  return (
    <Table
      removeWrapper
      isHeaderSticky
      isStriped
      className="workout-table overflow-y-scroll"
      aria-label="Bodybuilding Push Pull Legs Table">
      <TableHeader>
        <TableColumn></TableColumn>
        <TableColumn>Exercise</TableColumn>
        <TableColumn>Warm up Sets</TableColumn>
        <TableColumn>Working Sets</TableColumn>
        <TableColumn>Reps</TableColumn>
        <TableColumn>Weight</TableColumn>
        <TableColumn>RPE</TableColumn>
        <TableColumn>Rest Time</TableColumn>
        <TableColumn>Notes</TableColumn>
      </TableHeader>
      <TableBody>
        {exercisePlan.map((exercise) => (
          <TableRow key={exercise.id}>
            <TableCell>
              <b>{exercise.type}</b>
            </TableCell>
            <TableCell>{exercise.name}</TableCell>
            <TableCell>{exercise.warmUpSets}</TableCell>
            <TableCell>{exercise.workingSets}</TableCell>
            <TableCell>{exercise.reps}</TableCell>
            <TableCell>
              <Input
                type="text"
                color="primary"
                placeholder="add weight"
                variant="underlined"
                size="sm"
                id={`${exercise.id}Input`}
                value={
                  exercise.weightTag === "Bodyweight"
                    ? exercise.weightTag
                    : workoutData[exercise.id] || ""
                }
                onChange={(e) => handleInputChange(e, exercise.id)}
              />
            </TableCell>
            <TableCell>{exercise.RPE}</TableCell>
            <TableCell>{exercise.rest}</TableCell>
            <TableCell>
              <button
                className="appearance-none text-rose-900 text-2xl transition duration-300 hover:text-rose-950"
                onClick={() => {
                  setCurrentExercise(exercise); // Set the current exercise's data
                  toggleModal("notesModal");
                }}>
                <FontAwesomeIcon icon={faMessage}></FontAwesomeIcon>
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ExerciseTable;
