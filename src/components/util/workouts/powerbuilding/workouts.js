// import { exercises } from "../../exercises";

const getExercisesPBPPLOne = (currentWeek) => {
  let adjustment;
  switch (currentWeek) {
    case "weekThree":
      adjustment = {
        exerciseOne: "Incline Bench Press",
        // Other specific adjustments for weekThree
      };
      break;
    case "weekFour":
      adjustment = {
        exerciseOne: "Decline Bench Press",
        // Other specific adjustments for weekFour
      };
      break;
    case "weekFive":
      adjustment = {
        exerciseOne: "Close Grip Bench Press",
        // Other specific adjustments for weekFive
      };
      break;
    case "weekSix":
      adjustment = {
        exerciseOne: "Dumbbell Flyes",
        // Other specific adjustments for weekSix
      };
      break;
    default:
      adjustment = {};
      break;
  }
  return [
    {
      id: "exerciseOne",
      type: "Push",
      name: adjustment.exerciseOne || "Barbell Bench Press",
      warmUpSets: 3,
      workingSets: 3,
      reps: "4-6",
      RPE: 9,
      rest: "2-3mins",
    },
    {
      id: "exerciseTwo",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: "Machine Shoulder Press",
      warmUpSets: 2,
      workingSets: 3,
      reps: "10",
      RPE: 9,
      rest: "2-3mins",
    },
    {
      id: "exerciseThree",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: "Skull Crushers",
      warmUpSets: 1,
      workingSets: 3,
      reps: "10-12",
      RPE: 8,
      rest: "1-2mins",
    },
    {
      id: "exerciseFour",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: "Full ROM Push-Up",
      warmUpSets: 0,
      workingSets: 3,
      reps: "12-15",
      RPE: 10,
      rest: "1-2mins",
    },
    {
      id: "exerciseFive",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: "Rope Pulldown",
      warmUpSets: 0,
      workingSets: 3,
      reps: "8-10",
      RPE: 9,
      rest: "1-2mins",
    },
    {
      id: "exerciseSix",
      type: "Pull",
      name: "Single Arm Lat Pulldown",
      warmUpSets: 2,
      workingSets: 3,
      reps: "10-12",
      RPE: 9,
      rest: "1-2mins",
    },
    {
      id: "exerciseSeven",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: "Seated Machine Row",
      warmUpSets: 1,
      workingSets: 3,
      reps: "8-10",
      RPE: 9,
      rest: "2-3mins",
    },
    {
      id: "exerciseEight",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: "Cable Rear Delt Fly",
      warmUpSets: 1,
      workingSets: 3,
      reps: "10-12",
      RPE: 10,
      rest: "1-2mins",
    },
    {
      id: "exerciseNine",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: "Barbell Bicep Curl",
      warmUpSets: 2,
      workingSets: 3,
      reps: "8-10",
      RPE: 10,
      rest: "1-2mins",
    },
    {
      id: "exerciseTen",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: "Hammer Curl",
      warmUpSets: 0,
      workingSets: 4,
      reps: "8-10",
      RPE: 9,
      rest: "1-2mins",
    },
    {
      id: "exerciseEleven",
      type: "legs", // Leave type empty for subsequent rows that share the same type
      name: "Squat",
      warmUpSets: 3,
      workingSets: 3,
      reps: "6-8",
      RPE: 9,
      rest: "2-3mins",
    },
    {
      id: "exerciseTwelve",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: "Leg Curl",
      warmUpSets: 1,
      workingSets: 3,
      reps: "6-8",
      RPE: 9,
      rest: "1-2mins",
    },
    {
      id: "exerciseThirteen",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: "Leg Extension",
      warmUpSets: 1,
      workingSets: 3,
      reps: "10-12",
      RPE: 10,
      rest: "1-2mins",
    },
    {
      id: "exerciseFourteen",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: "Calf Raises",
      warmUpSets: 1,
      workingSets: 3,
      reps: "8-10",
      RPE: 10,
      rest: "1-2mins",
    },
    {
      id: "exerciseFifteen",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: "Cable Crunch",
      warmUpSets: 0,
      workingSets: 3,
      reps: "10-12",
      RPE: 10,
      rest: "1-2mins",
    },
    {
      id: "exerciseSixteen",
      type: "Push", // Leave type empty for subsequent rows that share the same type
      name: "Incline Smith Machine Press",
      warmUpSets: 2,
      workingSets: 3,
      reps: "8-10",
      RPE: 9,
      rest: "2-3mins",
    },
    {
      id: "exerciseSeventeen",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: "Barbell Overhead Press",
      warmUpSets: 2,
      workingSets: 3,
      reps: "6-8",
      RPE: 9,
      rest: "2-3mins",
    },
    {
      id: "exerciseEighteen",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: "Dips",
      warmUpSets: 1,
      workingSets: 3,
      reps: "10-12",
      RPE: 9,
      rest: "2-3mins",
    },
    {
      id: "exerciseNineteen",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: "Eqyptian Lateral Raise",
      warmUpSets: 1,
      workingSets: 3,
      reps: "10-12",
      RPE: 10,
      rest: "1-2mins",
    },
    {
      id: "exerciseTwenty",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: "Cable Tricep Kickbacks",
      warmUpSets: 0,
      workingSets: 3,
      reps: "12-15",
      RPE: 9,
      rest: "1-2mins",
    },
  ];
};

export { getExercisesPBPPLOne };
