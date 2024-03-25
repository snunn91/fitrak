import React from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

function WorkoutCarousel({ filteredWorkouts, workoutType, handleWorkoutType }) {
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
            className={`relative cursor-pointer p-4 bg-stone-200 rounded-lg hover:bg-stone-300 w-[200px] h-[75px] ${
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
              <div className="absolute top-[-15px] left-[160px]">
                <FontAwesomeIcon
                  className=" bg-white rounded-full text-3xl top-[-16px] left-[60px] text-rose-900"
                  icon={faCircleCheck}></FontAwesomeIcon>
              </div>
            )}
            <span className="select-none">{option.label}</span>
          </label>
        ))}
      </Slider>
    </div>
  );
}

export default WorkoutCarousel;
