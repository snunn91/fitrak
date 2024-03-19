import { exercises } from "../../exercises";
const getExercisesBBPPLOne = () => {
  return [
    {
      id: "exerciseOne",
      type: "Push",
      typeMobile: "Push",
      name: exercises.barbellBenchPress,
      warmUpSets: 3,
      workingSets: 3,
      reps: "10-12",
      RPE: 9,
      rest: "2-3",
    },
    {
      id: "exerciseTwo",
      type: "", // Leave type empty for subsequent rows that share the same type
      typeMobile: "Push",
      name: exercises.militaryPress,
      warmUpSets: 2,
      workingSets: 3,
      reps: "10",
      RPE: 9,
      rest: "2-3",
    },
    {
      id: "exerciseThree",
      type: "", // Leave type empty for subsequent rows that share the same type
      typeMobile: "Push",
      name: exercises.skullCrushersEZBar,
      warmUpSets: 1,
      workingSets: 3,
      reps: "10-12",
      RPE: 8,
      rest: "1-2",
    },
    {
      id: "exerciseFour",
      type: "", // Leave type empty for subsequent rows that share the same type
      typeMobile: "Push",
      name: exercises.fullRomPushUp,
      warmUpSets: 0,
      workingSets: 3,
      reps: "12-15",
      RPE: 10,
      rest: "1-2",
    },
    {
      id: "exerciseFive",
      type: "", // Leave type empty for subsequent rows that share the same type
      typeMobile: "Push",
      name: exercises.tricepPulldownRope,
      warmUpSets: 0,
      workingSets: 3,
      reps: "8-10",
      RPE: 9,
      rest: "1-2",
    },
    {
      id: "exerciseSix",
      type: "Pull",
      typeMobile: "Pull",
      name: exercises.kneelingSingleArmLatPulldown,
      warmUpSets: 2,
      workingSets: 3,
      reps: "10-12",
      RPE: 9,
      rest: "1-2",
    },
    {
      id: "exerciseSeven",
      type: "", // Leave type empty for subsequent rows that share the same type
      typeMobile: "Pull",
      name: exercises.chestSupportedMachineRow,
      warmUpSets: 1,
      workingSets: 3,
      reps: "8-10",
      RPE: 9,
      rest: "2-3",
    },
    {
      id: "exerciseEight",
      type: "", // Leave type empty for subsequent rows that share the same type
      typeMobile: "Pull",
      name: exercises.rearDeltFly,
      warmUpSets: 1,
      workingSets: 3,
      reps: "10-12",
      RPE: 10,
      rest: "1-2",
    },
    {
      id: "exerciseNine",
      type: "", // Leave type empty for subsequent rows that share the same type
      typeMobile: "Pull",
      name: exercises.bicepCurlBarbell,
      warmUpSets: 2,
      workingSets: 3,
      reps: "8-10",
      RPE: 10,
      rest: "1-2",
    },
    {
      id: "exerciseTen",
      type: "", // Leave type empty for subsequent rows that share the same type
      typeMobile: "Pull",
      name: exercises.hammerCurlDumbbell,
      warmUpSets: 0,
      workingSets: 4,
      reps: "8-10",
      RPE: 9,
      rest: "1-2",
    },
    {
      id: "exerciseEleven",
      type: "Legs", // Leave type empty for subsequent rows that share the same type
      typeMobile: "Legs",
      name: exercises.barbellHighbarSquat,
      warmUpSets: 3,
      workingSets: 3,
      reps: "6-8",
      RPE: 9,
      rest: "2-3",
    },
    {
      id: "exerciseTwelve",
      type: "", // Leave type empty for subsequent rows that share the same type
      typeMobile: "Legs",
      name: exercises.legCurlLying,
      warmUpSets: 1,
      workingSets: 3,
      reps: "8-10",
      RPE: 9,
      rest: "1-2",
    },
    {
      id: "exerciseThirteen",
      type: "", // Leave type empty for subsequent rows that share the same type
      typeMobile: "Legs",
      name: exercises.legExtensions,
      warmUpSets: 1,
      workingSets: 3,
      reps: "8-10",
      RPE: 10,
      rest: "1-2",
    },
    {
      id: "exerciseFourteen",
      type: "", // Leave type empty for subsequent rows that share the same type
      typeMobile: "Legs",
      name: exercises.calfRaisesStanding,
      warmUpSets: 1,
      workingSets: 3,
      reps: "8-10",
      RPE: 10,
      rest: "1-2",
    },
    {
      id: "exerciseFifteen",
      type: "", // Leave type empty for subsequent rows that share the same type
      typeMobile: "Legs",
      name: exercises.cableCrunch,
      warmUpSets: 0,
      workingSets: 3,
      reps: "10-12",
      RPE: 10,
      rest: "1-2",
    },
    {
      id: "exerciseSixteen",
      type: "Push", // Leave type empty for subsequent rows that share the same type
      typeMobile: "Push",
      name: exercises.inclineSmithMachineBenchPress,
      warmUpSets: 2,
      workingSets: 3,
      reps: "8-10",
      RPE: 9,
      rest: "2-3",
    },
    {
      id: "exerciseSeventeen",
      type: "", // Leave type empty for subsequent rows that share the same type
      typeMobile: "Push",
      name: exercises.overheadPressBarbell,
      warmUpSets: 2,
      workingSets: 3,
      reps: "6-8",
      RPE: 9,
      rest: "2-3",
    },
    {
      id: "exerciseEighteen",
      type: "", // Leave type empty for subsequent rows that share the same type
      typeMobile: "Push",
      name: exercises.chestDip,
      warmUpSets: 1,
      workingSets: 3,
      reps: "10-12",
      RPE: 9,
      rest: "2-3",
    },
    {
      id: "exerciseNineteen",
      type: "", // Leave type empty for subsequent rows that share the same type
      typeMobile: "Push",
      name: exercises.egyptianLatRaise,
      warmUpSets: 1,
      workingSets: 3,
      reps: "10-12",
      RPE: 10,
      rest: "1-2",
    },
    {
      id: "exerciseTwenty",
      type: "", // Leave type empty for subsequent rows that share the same type
      typeMobile: "Push",
      name: exercises.cableTricepKickback,
      warmUpSets: 0,
      workingSets: 3,
      reps: "12-15",
      RPE: 9,
      rest: "1-2",
    },
    {
      id: "exerciseTwentyOne",
      type: "Pull", // Leave type empty for subsequent rows that share the same type
      typeMobile: "Pull",
      name: exercises.singleArmSeatedCableRow,
      warmUpSets: 2,
      workingSets: 3,
      reps: "10-12",
      RPE: 9,
      rest: "1-2",
    },
    {
      id: "exerciseTwentyTwo",
      type: "", // Leave type empty for subsequent rows that share the same type
      typeMobile: "Pull",
      name: exercises.meadowsRow,
      warmUpSets: 1,
      workingSets: 3,
      reps: "10-12",
      RPE: 9,
      rest: "1-2",
    },
    {
      id: "exerciseTwentyThree",
      type: "", // Leave type empty for subsequent rows that share the same type
      typeMobile: "Pull",
      name: exercises.reversePecDec,
      warmUpSets: 1,
      workingSets: 3,
      reps: "12-15",
      RPE: 10,
      rest: "1-2",
    },
    {
      id: "exerciseTwentyFour",
      type: "", // Leave type empty for subsequent rows that share the same type
      typeMobile: "Pull",
      name: exercises.twentyOnesBarbell,
      warmUpSets: 1,
      workingSets: 3,
      reps: "21",
      RPE: 9,
      rest: "1-2",
    },
    {
      id: "exerciseTwentyFive",
      type: "", // Leave type empty for subsequent rows that share the same type
      typeMobile: "Pull",
      name: exercises.bayesianCableCurl,
      warmUpSets: 0,
      workingSets: 3,
      reps: "12-15",
      RPE: 10,
      rest: "1-2",
    },
    {
      id: "exerciseTwentySix",
      type: "Legs", // Leave type empty for subsequent rows that share the same type
      typeMobile: "Legs",
      name: exercises.legPress,
      warmUpSets: 2,
      workingSets: 3,
      reps: "8-10",
      RPE: 9,
      rest: "2-3",
    },
    {
      id: "exerciseTwentyseven",
      type: "", // Leave type empty for subsequent rows that share the same type
      typeMobile: "Legs",
      name: exercises.romanianDeadlift,
      warmUpSets: 2,
      workingSets: 3,
      reps: "6-8",
      RPE: 8,
      rest: "2-3",
    },
    {
      id: "exerciseTwentyEight",
      type: "", // Leave type empty for subsequent rows that share the same type
      typeMobile: "Legs",
      name: exercises.bulgarianSplitSquat,
      warmUpSets: 0,
      workingSets: 3,
      reps: "8-10",
      RPE: 9,
      rest: "2-3",
    },
    {
      id: "exerciseTwentyNine",
      type: "", // Leave type empty for subsequent rows that share the same type
      typeMobile: "Legs",
      name: exercises.calfRaisesSeated,
      warmUpSets: 1,
      workingSets: 3,
      reps: "10-12",
      RPE: 10,
      rest: "1-2",
    },
    {
      id: "exerciseThirty",
      type: "", // Leave type empty for subsequent rows that share the same type
      typeMobile: "Legs",
      name: exercises.legRaises,
      warmUpSets: 0,
      workingSets: 3,
      reps: "12-15",
      RPE: 10,
      rest: "1-2",
    },
  ];
};

export { getExercisesBBPPLOne };
