// import { exercises } from "../dashboard/util/exercises";

const trainingTypeOptions = [
  { label: "Bodybuilding", value: "bodybuilding" },
  { label: "Strength", value: "strength" },
  { label: "Powerbuilding", value: "powerbuilding" },
];
const workoutMapping = {
  bodybuilding: ["pplOne", "pplTwo", "upperLowerOne", "homeWithWeights"],
  strength: ["fullBodyOne", "fullBodyTwo"],
  powerbuilding: ["pplOne", "upperLowerTwo"],
};
const workouts = [
  {
    label: "Push Pull Legs",
    suffix: "(Option 1)",
    value: "pplOne",
    difficulty: "Intermediate",
  },
  {
    label: "Push Pull Legs",
    suffix: "(Option 2)",
    value: "pplTwo",
    difficulty: "Intermediate",
  },
  { label: "Full Body", suffix: "", value: "fullBodyOne", difficulty: "" },
  { label: "Full Body", suffix: "", value: "fullBodyTwo", difficulty: "" },
  { label: "Upper Lower", suffix: "", value: "upperLowerOne", difficulty: "" },
  { label: "Upper Lower", suffix: "", value: "upperLowerTwo", difficulty: "" },
  {
    label: "Home",
    suffix: "(Dumbbells required)",
    value: "homeWithWeights",
    difficulty: "Beginner",
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
