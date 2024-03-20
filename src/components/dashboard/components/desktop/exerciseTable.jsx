import {
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
const ExerciseTable = ({ exercisePlan, workoutData, handleInputChange }) => {
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
                value={workoutData[exercise.id]}
                onChange={(e) => handleInputChange(e, exercise.id)}
              />
            </TableCell>
            <TableCell>{exercise.RPE}</TableCell>
            <TableCell>{exercise.rest}</TableCell>
            <TableCell>Here is a note section</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ExerciseTable;
