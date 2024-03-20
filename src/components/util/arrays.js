// import { exercises } from "../dashboard/util/exercises";

const trainingTypeOptions = [
  { label: "Bodybuilding", value: "bodybuilding" },
  { label: "Strength", value: "strength" },
  { label: "Powerbuilding", value: "powerbuilding" },
];
const workoutMapping = {
  bodybuilding: [
    "pplOne",
    "pplTwo",
    "fullBodyOne",
    "fullBodyTwo",
    "upperLowerOne",
    "upperLowerTwo",
  ],
  strength: ["fullBodyOne", "fullBodyTwo"],
  powerbuilding: ["pplOne", "pplTwo", "upperLowerOne", "upperLowerTwo"],
};
const workouts = [
  { label: "Push Pull Legs (Option 1)", value: "pplOne" },
  { label: "Push Pull Legs (Option 2)", value: "pplTwo" },
  { label: "Full Body", value: "fullBodyOne" },
  { label: "Full Body", value: "fullBodyTwo" },
  { label: "Upper Lower", value: "upperLowerOne" },
  { label: "Upper Lower", value: "upperLowerTwo" },
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
