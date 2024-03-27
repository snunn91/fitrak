// import { exercises } from "../dashboard/util/exercises";
const difficulty = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};
const trainingTypeOptions = [
  { label: "Bodybuilding", value: "bodybuilding" },
  { label: "Strength", value: "strength" },
  { label: "Powerbuilding", value: "powerbuilding" },
];
const workoutMapping = {
  bodybuilding: [
    "pplOneBB",
    "pplTwoBB",
    "upperLowerOneBB",
    "homeWithWeightsBB",
  ],
  strength: ["fullBodyOneS", "fullBodyTwoS"],
  powerbuilding: ["pplOnePB", "upperLowerOnePB"],
};
const workouts = [
  //Bodybuilding
  {
    label: "Push Pull Legs",
    suffix: "(Option 1)",
    value: "pplOneBB",
    difficulty: difficulty.intermediate,
  },
  {
    label: "Push Pull Legs",
    suffix: "(Option 2)",
    value: "pplTwoBB",
    difficulty: difficulty.intermediate,
  },
  {
    label: "Upper Lower",
    suffix: "",
    value: "upperLowerOneBB",
    difficulty: difficulty.advanced,
  },
  {
    label: "Home",
    suffix: "(Dumbbells required)",
    value: "homeWithWeightsBB",
    difficulty: difficulty.beginner,
  },
  // Strength
  { label: "Full Body", suffix: "", value: "fullBodyOneS", difficulty: "" },
  { label: "Full Body", suffix: "", value: "fullBodyTwoS", difficulty: "" },
  // Powerbuilding
  {
    label: "Push Pull Legs",
    suffix: "",
    value: "pplOnePB",
    difficulty: difficulty.intermediate,
  },
  {
    label: "Upper Lower",
    suffix: "",
    value: "upperLowerOnePB",
    difficulty: difficulty.intermediate,
  },

  {
    label: "Home",
    suffix: "(No Equipment required)",
    value: "homeWithoutWeights",
    difficulty: "",
  },
];
const weekOptions = [
  { label: "Week 1", value: "weekOne" },
  { label: "Week 2", value: "weekTwo" },
  { label: "Week 3", value: "weekThree" },
  { label: "Week 4", value: "weekFour" },
  { label: "Week 5", value: "weekFive" },
  { label: "Week 6", value: "weekSix" },
  { label: "Week 7", value: "weekSeven" },
  { label: "Week 8", value: "weekEight" },
  { label: "Week 9", value: "weekNine" },
  { label: "Week 10", value: "weekTen" },
  { label: "Week 11", value: "weekEleven" },
  { label: "Week 12", value: "weekTwelve" },
];

export { trainingTypeOptions, workouts, workoutMapping, weekOptions };
