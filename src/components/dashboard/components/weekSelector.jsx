import { Select, SelectItem } from "@nextui-org/react";
const WeekSelector = ({
  currentWeek,
  handleWeekChange,
  getWeekOptionsToDisplay,
}) => {
  return (
    <Select
      label="Select Week"
      className="max-w-sm"
      value={currentWeek}
      onChange={handleWeekChange}>
      {getWeekOptionsToDisplay().map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
};
export default WeekSelector;
