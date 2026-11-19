import React, { useEffect, useRef, useState } from "react";

import { SliderI } from "../../types/sliderTypes";

import slider_styles from "./Slider.module.scss";

export const Slider: React.FC<SliderI> = ({ direction, isLooped, delay }) => {
  const sliderWidth = 5; //НЕПАРНЕ ЗНАЧЕННЯ

  const [fullArr, setFullArr] = useState<number[]>([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  ]);

  const [vicinityArr, setVicinityArr] = useState<number[]>(
    fullArr.slice(0, sliderWidth),
  );

  const prevIndex = useRef<number>(0);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentVicinityIndex, setCurrentVicinityIndex] = useState<number>(
    sliderWidth - (vicinityArr.length - 1) / 2,
  );

  const [isActive, setIsActive] = useState<boolean>(false);

  const [cursorSpeed, setCursorSpeed] = useState<number>(0);
  const [maxSpeed, setMaxSpeed] = useState<number>(0);

  const shift = () => {
    const globalFirstIndex = currentIndex - currentVicinityIndex;

    const newArr = vicinityArr.map((el, index) => {
      let globalEquivalent = globalFirstIndex + index;
      console.log(
        "global index: ",
        globalEquivalent,
        " first V: ",
        vicinityArr[0],
      );

      return prevIndex.current < currentIndex
        ? fullArr[globalEquivalent + 1]
        : fullArr[globalEquivalent - 1];
    });
    console.log("____________");

    setVicinityArr(newArr);
  };

  //НЕ ЗАБУДЬ ВИДАЛИТИ ЦЕ
  useEffect(() => {
    if (Math.abs(cursorSpeed) > Math.abs(maxSpeed)) {
      setMaxSpeed(cursorSpeed);
    }
  }, [cursorSpeed]);

  useEffect(() => {
    if (currentIndex <= (vicinityArr.length - 1) / 2) {
      setCurrentVicinityIndex(currentIndex);
    } else if (
      fullArr.length - 1 - currentIndex <=
      (vicinityArr.length - 1) / 2
    ) {
      setCurrentVicinityIndex(
        vicinityArr.length - 1 - (fullArr.length - 1 - currentIndex),
      );
    } else {
      shift();

      setCurrentVicinityIndex((vicinityArr.length - 1) / 2);
    }
  }, [currentIndex]);

  return (
    <div>
      <div>
        <p>{cursorSpeed}</p>
        <p>{maxSpeed}</p>
        <p>Current vicinity: {currentVicinityIndex}</p>
        <p>Current: {currentIndex}</p>
      </div>
      <div
        className={slider_styles.slider}
        onMouseDown={() => {
          setIsActive(true);
        }}
        onMouseUp={() => {
          setIsActive(false);
        }}
        onMouseMove={(e) => {
          if (isActive) {
            setCursorSpeed(e.movementX);
          }
        }}
      >
        <div
          onClick={() => {
            if (currentIndex > 0) {
              prevIndex.current = currentIndex;
              setCurrentIndex((prev) => prev - 1);
            }
          }}
        >
          Backward
        </div>

        {vicinityArr.map((slide, index) => (
          <div
            key={slide}
            className={`${slider_styles.slide} ${index == currentVicinityIndex ? slider_styles.activeSlide : null}`}
          >
            {slide}
          </div>
        ))}

        <div
          onClick={() => {
            if (currentIndex < fullArr.length - 1) {
              prevIndex.current = currentIndex;
              setCurrentIndex((prev) => prev + 1);
            }
          }}
        >
          forward
        </div>
      </div>
    </div>
  );
};
