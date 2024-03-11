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
  { label: "PPL One", value: "pplOne" },
  { label: "PPL Two", value: "pplTwo" },
  { label: "Full Body One", value: "fullBodyOne" },
  { label: "Full Body Two", value: "fullBodyTwo" },
  { label: "Upper Lower One", value: "upperLowerOne" },
];
const weekOptions = [
  { label: "Week 1", value: "weekOne" },
  { label: "Week 2", value: "weekTwo" },
  { label: "Week 3", value: "weekThree" },
  { label: "Week 4", value: "weekFour" },
  { label: "Week 5", value: "weekFive" },
  { label: "Week 6", value: "weekSix" },
];

export { trainingTypeOptions, workouts, workoutMapping, weekOptions };
