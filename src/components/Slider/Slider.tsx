import React, { useEffect, useRef, useState } from "react";

import { SliderI } from "../../types/sliderTypes";

import slider_styles from "./Slider.module.scss";

export const Slider: React.FC<SliderI> = ({
  width = 50,
  direction,
  isCircular = true,
  delay = 0,
}) => {
  const vicinityWidth = 7; //НЕПАРНЕ ЗНАЧЕННЯ

  const [fullArr, setFullArr] = useState<number[]>([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
    59,
  ]);

  // interface ListI {
  //   direction: "horizontal" | "vertival";
  //   delay: number;
  //   fullArr: number[];
  //   vicinityArr: number[];

  //   moveForward: () => void;
  //   moveBackward: () => void;
  // }

  // const [regularList, setRegularList] = useState<ListI>(reglist);

  const [vicinityArr, setVicinityArr] = useState<number[]>(
    fullArr.slice(0, vicinityWidth),
  );

  const startPosition = useRef<number>(0);
  const prevCursorPosition = useRef<number>(0);

  const [cursorShift, setCursorShift] = useState<number>(0);

  const intervalId = useRef<number | null>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentVicinityIndex, setCurrentVicinityIndex] = useState<number>(0);

  const [isActive, setIsActive] = useState<boolean>(false); //Може переробити це на useRef?

  const [cursorSpeed, setCursorSpeed] = useState<number>(0);
  const [maxSpeed, setMaxSpeed] = useState<number>(0);

  const [deltaMove, setDeltaMove] = useState<number>(0);

  const [turnNumber, setTurnNumber] = useState<number>(1);

  useEffect(() => {
    if (isCircular) {
      setCurrentVicinityIndex((vicinityArr.length - 1) / 2);
      setCurrentIndex((vicinityArr.length - 1) / 2);
    } else {
      setCurrentVicinityIndex(0);
      setCurrentIndex(0);
    }
  }, []);

  const moveBackwardRegular = () => {
    const globalFirstIndex = currentIndex - currentVicinityIndex;

    if (currentVicinityIndex == (vicinityArr.length - 1) / 2) {
      if (fullArr[globalFirstIndex - 1] !== undefined) {
        const newArr = vicinityArr.map((el, index) => {
          let globalEquivalent = globalFirstIndex + index;

          return fullArr[globalEquivalent - 1];
        });

        setVicinityArr(newArr);
      }
    }

    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const moveForwardRegular = () => {
    const globalFirstIndex = currentIndex - currentVicinityIndex;

    if (currentVicinityIndex == (vicinityArr.length - 1) / 2) {
      if (fullArr[globalFirstIndex + vicinityArr.length] !== undefined) {
        const newArr = vicinityArr.map((el, index) => {
          let globalEquivalent = globalFirstIndex + index;

          return fullArr[globalEquivalent + 1];
        });

        setVicinityArr(newArr);
      }
    }

    if (currentIndex < fullArr.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const moveBackwardCircular = () => {
    const lastElement = fullArr[fullArr.length - 1];

    const newArr = fullArr.map((el, index) => {
      if (index == 0) {
        return lastElement;
      } else {
        return fullArr[index - 1];
      }
    });

    setFullArr(newArr);
    setVicinityArr(newArr.slice(0, vicinityWidth));

    setCurrentIndex((prev) => {
      if (prev == 0) {
        return 59;
      } else {
        return prev - 1;
      }
    });
  };

  const moveForwardCircular = () => {
    const firstElement = fullArr[0];

    const newArr = fullArr.map((el, index) => {
      if (index == fullArr.length - 1) {
        return firstElement;
      } else {
        return fullArr[index + 1];
      }
    });

    setFullArr(newArr);
    setVicinityArr(newArr.slice(0, vicinityWidth));

    setCurrentIndex((prev) => {
      if (prev == 59) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  };

  const moveBackward = () => {
    isCircular ? moveBackwardCircular() : moveBackwardRegular();
  };

  const moveForward = () => {
    isCircular ? moveForwardCircular() : moveForwardRegular();
  };

  //НЕ ЗАБУДЬ ВИДАЛИТИ ЦЕ
  useEffect(() => {
    if (Math.abs(cursorSpeed) > Math.abs(maxSpeed)) {
      setMaxSpeed(cursorSpeed);
    }
  }, [cursorSpeed]);

  useEffect(() => {
    if (delay > 0) {
      intervalId.current = setInterval(moveForward, delay);
    }

    return () => {
      clearInterval(intervalId.current!);
    };
  }, [currentIndex, currentVicinityIndex]);

  useEffect(() => {
    if (!isCircular) {
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
        setCurrentVicinityIndex((vicinityArr.length - 1) / 2);
      }
    }
  }, [currentIndex]);

  useEffect(() => {
    const gap =
      (width / 100) *
      document.documentElement.clientWidth *
      (100 / vicinityWidth / 100);

    setDeltaMove(turnNumber * Math.floor(gap) - Math.abs(cursorShift));

    if (
      deltaMove <= 0 &&
      // || deltaMove >= turnNumber * Math.floor(gap)
      isActive
    ) {
      setTurnNumber((prev) => prev + 1);
      if (prevCursorPosition.current < cursorShift) {
        moveBackward();
      } else if (prevCursorPosition.current > cursorShift) {
        moveForward();
      }
    }

    prevCursorPosition.current = cursorShift;
  }, [cursorShift, turnNumber]);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <div>
        <p>{cursorSpeed}</p>
        <p>{maxSpeed}</p>
        <p>Current vicinity: {currentVicinityIndex}</p>
        <p>Current: {currentIndex}</p>
        <p>Cursor shift: {cursorShift}</p>
      </div>
      <div
        className={slider_styles.sliderContainer}
        style={{
          width: `${width}%`,
        }}
      >
        <div
          className={slider_styles.slider}
          style={{
            gridTemplateColumns: `repeat(${vicinityWidth}, ${100 / vicinityWidth}%)`,
            left: `${cursorShift}px`,
          }}
          onMouseDown={(e) => {
            startPosition.current = e.pageX;
            setIsActive(true);
          }}
          onMouseUp={() => {
            setCursorShift(0);
            setTurnNumber(1);
            setIsActive(false);
          }}
          onMouseMove={(e) => {
            if (isActive) {
              setCursorShift(e.pageX - startPosition.current);
              setCursorSpeed(e.movementX);
            }
          }}
        >
          {vicinityArr.map((slide, index) => (
            <div
              key={slide}
              className={`${slider_styles.slide} ${index == currentVicinityIndex ? slider_styles.activeSlide : null}`}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
