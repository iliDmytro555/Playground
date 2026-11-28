import React, { useDebugValue, useEffect, useRef, useState } from "react";

import { SliderI, ElementI } from "../../types/sliderTypes";

import slider_styles from "./Slider.module.scss";

export const Slider: React.FC<SliderI<number>> = ({
  arr,
  visibleSlidesAmount,
  width = 100,
  direction,
  isCircular = false,
  delay = 0,
}) => {
  // const vicinityWidth = 9; //НЕПАРНЕ ЗНАЧЕННЯ

  const [vicinityArr, setVicinityArr] = useState<ElementI<number>[]>(
    arr.map((el, index) => ({ id: index, value: el })),
  );

  const [sliderViewportWidth, setSliderViewportWidth] = useState<number>(0);
  const [sliderViewportGap, setSliderViewportGap] = useState<number>(0);

  const [sliderBlockSize, setSliderBlockSize] = useState<number>(0);
  const [sliderElementSize, setSliderElementSize] = useState<number>(0);

  const [isActive, setIsActive] = useState<boolean>(false); //Може переробити це на useRef?

  const cursorStartPosition = useRef<number>(0);
  const [cursorShift, setCursorShift] = useState<number>(0);

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [totalShift, setTotalShift] = useState<number>(0);
  const [trackTranslate, setTrackTranslate] = useState<number>(0);

  const intervalId = useRef<number | null>(null);

  // const [currentVicinityIndex, setCurrentVicinityIndex] = useState<number>(0);

  const [cursorSpeed, setCursorSpeed] = useState<number>(0);
  const [maxSpeed, setMaxSpeed] = useState<number>(0);

  const straighten: (rest: number, index: number) => number = (
    rest: number,
    index: number,
  ) => {
    const slideWidth = sliderBlockSize + sliderViewportGap;

    if (rest > sliderBlockSize) {
      return straighten(rest - slideWidth, index + 1);
    } else {
      return index;
    }
  };

  useEffect(() => {
    const resize = () => {
      const viewportWidth = document.getElementsByClassName(
        `${slider_styles.sliderViewport}`,
      )[0].clientWidth;

      const onePartWidth = sliderViewportWidth / visibleSlidesAmount;

      const gap = onePartWidth / 3;
      const blockSize = onePartWidth - gap + gap / visibleSlidesAmount;
      const elementSize = blockSize * 0.6;

      setSliderViewportWidth(viewportWidth);
      setSliderBlockSize(blockSize);
      setSliderViewportGap(gap);
      setSliderElementSize(elementSize);
    };

    resize();

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, [sliderViewportWidth]);

  useEffect(() => {
    if (totalShift < 0) {
      setTotalShift(0);
    } else if (
      totalShift >
      (sliderBlockSize + sliderViewportGap) * (vicinityArr.length - 1)
    ) {
      setTotalShift(
        (sliderBlockSize + sliderViewportGap) * (vicinityArr.length - 1),
      );
    } else {
      setTotalShift((prev) => prev + cursorShift);
    }
  }, [cursorShift]);

  useEffect(() => {
    const centralIndex = (visibleSlidesAmount - 1) / 2;
    const slideWidth = sliderBlockSize + sliderViewportGap;

    if (
      totalShift >= centralIndex * slideWidth &&
      totalShift <= (vicinityArr.length - 1 - centralIndex) * slideWidth
    ) {
      setTrackTranslate(totalShift - centralIndex * slideWidth);
    }
  }, [cursorShift]);

  useEffect(() => {
    if (!isActive) {
      const index = straighten(totalShift, 0);
      const slideWidth = sliderBlockSize + sliderViewportGap;

      const centralIndex = (visibleSlidesAmount - 1) / 2;

      setTotalShift(index * slideWidth);

      if (index < centralIndex) {
        setTrackTranslate(0);
      } else if (index > vicinityArr.length - 1 - centralIndex) {
        setTrackTranslate(
          slideWidth * (vicinityArr.length - visibleSlidesAmount),
        );
      } else {
        setTrackTranslate((index - centralIndex) * slideWidth);
      }
    }
  }, [isActive]);

  useEffect(() => {
    const index = straighten(totalShift, 0);

    setCurrentIndex(index);
  }, [cursorShift]);

  // useEffect(() => {
  //   const centralIndex = (visibleSlidesAmount - 1) / 2;

  //   if (totalShift < onePartSize * centralIndex) {
  //     return;
  //   } else if (
  //     totalShift >
  //     onePartSize * (vicinityArr.length - 1 - centralIndex)
  //   ) {
  //     return;
  //   } else {
  //     setTrackTranslate((prev) => prev + cursorShift);
  //   }
  // }, [totalShift]);

  // const [deltaMove, setDeltaMove] = useState<number>(0);

  // useEffect(() => {
  //   if (isCircular) {
  //     setCurrentVicinityIndex((vicinityArr.length - 1) / 2);
  //     setCurrentIndex((vicinityArr.length - 1) / 2);
  //   } else {
  //     setCurrentVicinityIndex(0);
  //     setCurrentIndex(0);
  //   }
  // }, []);

  // const moveIndexBackwardRegular = () => {
  //   if (currentIndex == (vicinityArr.length - 1) / 2) {
  //     if (vicinityArr[globalFirstIndex - 1] !== undefined) {
  //       const newArr = vicinityArr.map((el, index) => {
  //         let globalEquivalent = globalFirstIndex + index;

  //         return fullArr[globalEquivalent - 1];
  //       });

  //       setVicinityArr(newArr);
  //     }
  //   }

  //   if (currentIndex > 0) {
  //     setCurrentIndex((prev) => prev - 1);
  //   }
  // };

  // const moveForwardRegular = () => {
  //   const globalFirstIndex = currentIndex - currentVicinityIndex;

  //   if (currentVicinityIndex == (vicinityArr.length - 1) / 2) {
  //     if (fullArr[globalFirstIndex + vicinityArr.length] !== undefined) {
  //       const newArr = vicinityArr.map((el, index) => {
  //         let globalEquivalent = globalFirstIndex + index;

  //         return fullArr[globalEquivalent + 1];
  //       });

  //       setVicinityArr(newArr);
  //     }
  //   }

  //   if (currentIndex < fullArr.length - 1) {
  //     setCurrentIndex((prev) => prev + 1);
  //   }
  // };

  // const moveBackwardCircular = () => {
  //   const lastElement = fullArr[fullArr.length - 1];

  //   const newArr = fullArr.map((el, index) => {
  //     if (index == 0) {
  //       return lastElement;
  //     } else {
  //       return fullArr[index - 1];
  //     }
  //   });

  //   setFullArr(newArr);
  //   setVicinityArr(newArr.slice(0, vicinityWidth));

  //   setCurrentIndex((prev) => {
  //     if (prev == 0) {
  //       return 59;
  //     } else {
  //       return prev - 1;
  //     }
  //   });
  // };

  // const moveForwardCircular = () => {
  //   const firstElement = fullArr[0];

  //   const newArr = fullArr.map((el, index) => {
  //     if (index == fullArr.length - 1) {
  //       return firstElement;
  //     } else {
  //       return fullArr[index + 1];
  //     }
  //   });

  //   setFullArr(newArr);
  //   setVicinityArr(newArr.slice(0, vicinityWidth));

  //   setCurrentIndex((prev) => {
  //     if (prev == 59) {
  //       return 0;
  //     } else {
  //       return prev + 1;
  //     }
  //   });
  // };

  // const move = () => {
  //   console.log(turnAmount);
  //   if (turnAmount > 0) {
  //     isCircular ? moveForwardCircular() : moveForwardRegular();
  //   } else if (turnAmount < 0) {
  //     isCircular ? moveBackwardCircular() : moveBackwardRegular();
  //   }

  //   setCirclesAmount(1);
  //   setTurnAmount(0);
  // };

  //НЕ ЗАБУДЬ ВИДАЛИТИ ЦЕ
  useEffect(() => {
    if (Math.abs(cursorSpeed) > Math.abs(maxSpeed)) {
      setMaxSpeed(cursorSpeed);
    }
  }, [cursorSpeed]);

  // useEffect(() => {
  //   if (delay > 0) {
  //     intervalId.current = setInterval(move, delay);
  //   }

  //   return () => {
  //     clearInterval(intervalId.current!);
  //   };
  // }, [currentIndex, currentVicinityIndex]);

  // useEffect(() => {
  //   if (!isCircular) {
  //     if (currentIndex <= (vicinityArr.length - 1) / 2) {
  //       setCurrentVicinityIndex(currentIndex);
  //     } else if (
  //       fullArr.length - 1 - currentIndex <=
  //       (vicinityArr.length - 1) / 2
  //     ) {
  //       setCurrentVicinityIndex(
  //         vicinityArr.length - 1 - (fullArr.length - 1 - currentIndex),
  //       );
  //     } else {
  //       setCurrentVicinityIndex((vicinityArr.length - 1) / 2);
  //     }
  //   }
  // }, [currentIndex]);

  // useEffect(() => {
  //   const gap =
  //     (width / 100) *
  //     document.documentElement.clientWidth *
  //     (100 / vicinityWidth / 100);

  //   setDeltaMove(circlesAmount * Math.floor(gap) - Math.abs(cursorShift));

  //   if (
  //     deltaMove <= 0 &&
  //     // || deltaMove >= circlesAmount * Math.floor(gap)
  //     isActive
  //   ) {
  //     setCirclesAmount((prev) => prev + 1);
  //     console.log(turnAmount);
  //     if (prevCursorPosition.current < cursorShift) {
  //       setTurnAmount((prev) => prev - 1);
  //     } else if (prevCursorPosition.current > cursorShift) {
  //       setTurnAmount((prev) => prev + 1);
  //     }
  //   }

  //   prevCursorPosition.current = cursorShift;
  // }, [cursorShift, turnAmount, circlesAmount]);

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
      </div>
      <div
        className={slider_styles.sliderViewport}
        style={{
          width: `${width}%`,
        }}
        onPointerDown={(e) => {
          cursorStartPosition.current = e.pageX;
          setIsActive(true);
        }}
        onPointerMove={(e) => {
          if (isActive) {
            setCursorShift(cursorStartPosition.current - e.clientX);

            cursorStartPosition.current = e.pageX;

            setCursorSpeed(e.movementX);
          }
        }}
        onPointerUp={() => {
          setIsActive(false);
        }}
      >
        <div
          className={slider_styles.sliderTrack}
          style={{
            transform: `translate(${-trackTranslate}px)`,
            height: `${sliderBlockSize}px`,
            gap: `${sliderViewportGap}px`,
            transitionDuration: `${!isActive ? "0.5s" : "0s"}`,
          }}
        >
          {vicinityArr.map((slide) => (
            <div
              key={slide.id}
              style={{
                width: `${sliderBlockSize}px`,
                height: `${sliderBlockSize}px`,
              }}
              className={`${slider_styles.block}`}
            >
              <div
                className={`${slider_styles.slide} ${currentIndex == slide.id && slider_styles.activeSlide}`}
                style={{
                  width: `${sliderElementSize}px`,
                  height: `${sliderElementSize}px`,
                  // borderColor: `${currentIndex == slide.id ? "red" : "transparent"}`,
                }}
              >
                <p>{slide.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
