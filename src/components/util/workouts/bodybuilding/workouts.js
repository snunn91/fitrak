import { exercises } from "../../exercises";
const getExercisesBBPPLOne = () => {
  return [
    {
      id: "exerciseOne",
      type: "Push",
      name: exercises.barbellBenchPress,
      warmUpSets: 3,
      workingSets: 3,
      reps: "10-12",
      RPE: 9,
      rest: "2-3mins",
    },
    {
      id: "exerciseTwo",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: exercises.militaryPress,
      warmUpSets: 2,
      workingSets: 3,
      reps: "10",
      RPE: 9,
      rest: "2-3mins",
    },
    {
      id: "exerciseThree",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: exercises.skullCrushersEZBar,
      warmUpSets: 1,
      workingSets: 3,
      reps: "10-12",
      RPE: 8,
      rest: "1-2mins",
    },
    {
      id: "exerciseFour",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: exercises.fullRomPushUp,
      warmUpSets: 0,
      workingSets: 3,
      reps: "12-15",
      RPE: 10,
      rest: "1-2mins",
    },
    {
      id: "exerciseFive",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: exercises.tricepPulldownRope,
      warmUpSets: 0,
      workingSets: 3,
      reps: "8-10",
      RPE: 9,
      rest: "1-2mins",
    },
    {
      id: "exerciseSix",
      type: "Pull",
      name: exercises.kneelingSingleArmLatPulldown,
      warmUpSets: 2,
      workingSets: 3,
      reps: "10-12",
      RPE: 9,
      rest: "1-2mins",
    },
    {
      id: "exerciseSeven",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: exercises.chestSupportedMachineRow,
      warmUpSets: 1,
      workingSets: 3,
      reps: "8-10",
      RPE: 9,
      rest: "2-3mins",
    },
    {
      id: "exerciseEight",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: exercises.rearDeltFly,
      warmUpSets: 1,
      workingSets: 3,
      reps: "10-12",
      RPE: 10,
      rest: "1-2mins",
    },
    {
      id: "exerciseNine",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: exercises.bicepCurlBarbell,
      warmUpSets: 2,
      workingSets: 3,
      reps: "8-10",
      RPE: 10,
      rest: "1-2mins",
    },
    {
      id: "exerciseTen",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: exercises.hammerCurlDumbbell,
      warmUpSets: 0,
      workingSets: 4,
      reps: "8-10",
      RPE: 9,
      rest: "1-2mins",
    },
    {
      id: "exerciseEleven",
      type: "legs", // Leave type empty for subsequent rows that share the same type
      name: exercises.barbellHighbarSquat,
      warmUpSets: 3,
      workingSets: 3,
      reps: "6-8",
      RPE: 9,
      rest: "2-3mins",
    },
    {
      id: "exerciseTwelve",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: exercises.legCurlLying,
      warmUpSets: 1,
      workingSets: 3,
      reps: "8-10",
      RPE: 9,
      rest: "1-2mins",
    },
    {
      id: "exerciseThirteen",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: exercises.legExtensions,
      warmUpSets: 1,
      workingSets: 3,
      reps: "8-10",
      RPE: 10,
      rest: "1-2mins",
    },
    {
      id: "exerciseFourteen",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: exercises.calfRaisesStanding,
      warmUpSets: 1,
      workingSets: 3,
      reps: "8-10",
      RPE: 10,
      rest: "1-2mins",
    },
    {
      id: "exerciseFifteen",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: exercises.cableCrunch,
      warmUpSets: 0,
      workingSets: 3,
      reps: "10-12",
      RPE: 10,
      rest: "1-2mins",
    },
    {
      id: "exerciseSixteen",
      type: "Push", // Leave type empty for subsequent rows that share the same type
      name: exercises.inclineSmithMachineBenchPress,
      warmUpSets: 2,
      workingSets: 3,
      reps: "8-10",
      RPE: 9,
      rest: "2-3mins",
    },
    {
      id: "exerciseSeventeen",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: exercises.overheadPressBarbell,
      warmUpSets: 2,
      workingSets: 3,
      reps: "6-8",
      RPE: 9,
      rest: "2-3mins",
    },
    {
      id: "exerciseEighteen",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: exercises.chestDip,
      warmUpSets: 1,
      workingSets: 3,
      reps: "10-12",
      RPE: 9,
      rest: "2-3mins",
    },
    {
      id: "exerciseNineteen",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: exercises.egyptianLatRaise,
      warmUpSets: 1,
      workingSets: 3,
      reps: "10-12",
      RPE: 10,
      rest: "1-2mins",
    },
    {
      id: "exerciseTwenty",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: exercises.cableTricepKickback,
      warmUpSets: 0,
      workingSets: 3,
      reps: "12-15",
      RPE: 9,
      rest: "1-2mins",
    },
    {
      id: "exerciseSixteen",
      type: "Legs", // Leave type empty for subsequent rows that share the same type
      name: exercises.legPress,
      warmUpSets: 2,
      workingSets: 3,
      reps: "8-10",
      RPE: 9,
      rest: "2-3mins",
    },
    {
      id: "exerciseSeventeen",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: exercises.romanianDeadlift,
      warmUpSets: 2,
      workingSets: 3,
      reps: "6-8",
      RPE: 8,
      rest: "2-3mins",
    },
    {
      id: "exerciseEighteen",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: exercises.bulgarianSplitSquat,
      warmUpSets: 0,
      workingSets: 3,
      reps: "8-10",
      RPE: 9,
      rest: "2-3mins",
    },
    {
      id: "exerciseNineteen",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: exercises.calfRaisesSeated,
      warmUpSets: 1,
      workingSets: 3,
      reps: "10-12",
      RPE: 10,
      rest: "1-2mins",
    },
    {
      id: "exerciseTwentyOne",
      type: "", // Leave type empty for subsequent rows that share the same type
      name: exercises.legRaises,
      warmUpSets: 0,
      workingSets: 3,
      reps: "12-15",
      RPE: 10,
      rest: "1-2mins",
    },
  ];
};

export { getExercisesBBPPLOne };
