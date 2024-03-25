import React from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

function WorkoutCarousel({
  filteredWorkouts,
  workoutType,
  handleWorkoutType,
  trainingTypeLabel,
}) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          initialSlide: 0,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="px-[40px] relative">
      <Slider {...settings}>
        {filteredWorkouts.map((option) => (
          <label
            className={`relative h-fit !flex items-start flex-col cursor-pointer pt-4 pe-4 pb-2 ps-4 bg-stone-100 rounded-lg hover:bg-stone-200 hover:shadow-md hover:opacity-100 transition duration-300 ${
              workoutType === option.value ? "ring-2 ring-rose-900" : ""
            }`}>
            <input
              type="radio"
              name="workoutType"
              value={option.value}
              checked={workoutType === option.value}
              onChange={handleWorkoutType}
              className="mr-2 appearance-none" // Hide the default radio button appearance
            />
            {workoutType === option.value && (
              <div className="absolute top-[-15px] left-[45%]">
                <FontAwesomeIcon
                  className=" bg-white rounded-full text-3xl text-rose-900"
                  icon={faCircleCheck}></FontAwesomeIcon>
              </div>
            )}
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center justify-between gap-1">
                <h3 className="font-roboto font-semibold text-md">
                  {option.label}
                </h3>
                <h3 className="font-roboto font-semibold text-md italic">
                  {option.suffix}
                </h3>
              </div>
              <div className="flex items-center justify-start gap-2">
                <h4 className="font-roboto font-light text-sm italic after:border-r-1 after:border-stone-500 after:ps-2">
                  {trainingTypeLabel}
                </h4>
                <h4 className="font-roboto font-light text-sm italic">
                  {option.difficulty}
                </h4>
              </div>
            </div>
          </label>
        ))}
      </Slider>
    </div>
  );
}

export default WorkoutCarousel;
