import { Card, Input } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
const ExerciseCard = ({
  exercisePlan,
  workoutData,
  setCurrentExercise,
  setActiveInputId,
  setActiveExerciseName,
  toggleModal,
}) => {
  return (
    <div>
      {exercisePlan.map((exercise, index) => (
        <Card
          key={exercise.id}
          shadow="md"
          className={`flex flex-col gap-y-2 p-3 w-full md:hidden ${
            index > 0 ? "mt-2" : ""
          }`}>
          <div className="flex items-center justify-between gap-x-1">
            <div className="flex items-baseline justify-start gap-x-1">
              <h2 className="text-xl font-raleway max-w-[565px] whitespace-nowrap overflow-hidden text-ellipsis">
                {exercise.name}
              </h2>
              <p className="text-sm italic">({exercise.typeMobile})</p>
            </div>

            <button
              className="appearance-none text-rose-900 text-xl transition duration-300 hover:text-rose-950"
              onClick={() => {
                setCurrentExercise(exercise); // Set the current exercise's data
                toggleModal("notesModal");
              }}>
              <FontAwesomeIcon icon={faMessage}></FontAwesomeIcon>
            </button>
          </div>
          <div className="flex items-center justify-start gap-x-3">
            <div className="flex items-center justify-center flex-col">
              <p className="text-xs text-stone-500" aria-label="Warmup Sets">
                WS
              </p>
              <p>{exercise.warmUpSets}</p>
            </div>
            <div className="flex items-center justify-center flex-col">
              <p className="text-xs text-stone-500" aria-label="Working Sets">
                Sets
              </p>
              <p>{exercise.workingSets}</p>
            </div>
            <div className="flex items-center justify-center flex-col">
              <p className="text-xs text-stone-500" aria-label="RPE">
                RPE
              </p>
              <p>{exercise.RPE}</p>
            </div>
            <div className="flex items-center justify-center flex-col">
              <p className="text-xs text-stone-500" aria-label="Reps">
                Reps
              </p>
              <p>{exercise.reps}</p>
            </div>
            <div className="flex items-center justify-center flex-col">
              <p className="text-xs text-stone-500" aria-label="Rest">
                Rest(min)
              </p>
              <p>{exercise.rest}</p>
            </div>
          </div>
          <div className="flex items-center justify-start">
            <div className="flex items-start justify-start flex-col">
              <div>
                <Input
                  type="text"
                  color="primary"
                  placeholder="add weight"
                  variant="underlined"
                  size="lg"
                  id={`${exercise.id}Input`}
                  value={workoutData[exercise.id]}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      setActiveInputId(exercise.id); // Set the active input ID
                      setActiveExerciseName(exercise.name);
                      toggleModal("mobileInputModal"); // Open the modal
                    }
                  }}
                  classNames={{
                    input: [
                      "bg-transparent",
                      "text-2xl",
                      "placeholder:text-2xl",
                    ],
                    innerWrapper: ["pt-0"],
                    inputWrapper: ["pt-0", "h-auto", "min-h-auto"],
                  }}>
                  {workoutData[exercise.id]}
                </Input>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
export default ExerciseCard;
