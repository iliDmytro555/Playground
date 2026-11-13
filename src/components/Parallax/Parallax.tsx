import React, { useEffect, useRef, useState } from "react";
import parallax_styles from "./Parallax.module.scss";
``;
export const Parallax: React.FC = () => {
  const containerSize: number = 100;
  const backgroundSize: number = 110;

  const [parallax_width_percent_in_px, setParallax_width_percent_in_px] =
    useState<number | null>(null);
  const [parallax_height_percent_in_px, setParallax_height_percent_in_px] =
    useState<number | null>(null);

  const [mousePosX, setMousePosX] = useState<number | null>(null);
  const [mousePosY, setMousePosY] = useState<number | null>(null);

  const [backgroundShift, setBackgroundShift] = useState<{
    xShift: number;
    yShift: number;
  }>({ xShift: 0, yShift: 0 });

  const [titleShift, setTitleShift] = useState<{
    xShift: number;
    yShift: number;
  }>({ xShift: 0, yShift: 0 });

  const [descriptionShift, setDescriptionShift] = useState<{
    xShift: number;
    yShift: number;
  }>({ xShift: 0, yShift: 0 });

  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parallax = parallaxRef.current;
    if (!parallax) return;

    setParallax_width_percent_in_px(parallax.clientWidth / 100);
    setParallax_height_percent_in_px(parallax.clientHeight / 100);
  }, []);

  function elementMove(maxShift: number): { xShift: number; yShift: number } {
    //maxShift - відступ від центру у %
    const xCenter = (100 * parallax_width_percent_in_px!) / 2;
    const yCenter = (100 * parallax_height_percent_in_px!) / 2;

    const xDistance = xCenter - mousePosX!;
    const yDistance = yCenter - mousePosY!;

    const min_xShift = (maxShift * parallax_width_percent_in_px!) / xCenter;
    const min_yShift = (maxShift * parallax_height_percent_in_px!) / yCenter;

    const xShift = min_xShift * xDistance;
    const yShift = min_yShift * yDistance;

    return { xShift, yShift };
  }

  return (
    <div>
      <div className={parallax_styles.container}>
        <div
          ref={parallaxRef}
          className={parallax_styles.parallax}
          style={{
            width: `${containerSize}%`,
            height: `${containerSize}%`,
          }}
          onMouseMove={(e) => {
            const parallaxCord = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - parallaxCord.left;
            const y = e.clientY - parallaxCord.top;

            setMousePosX(x);
            setMousePosY(y);

            setTimeout(() => {
              (setBackgroundShift({
                xShift: elementMove(5).xShift,
                yShift: elementMove(5).yShift,
              }),
                setTitleShift({
                  xShift: elementMove(10).xShift,
                  yShift: elementMove(10).yShift,
                }),
                setDescriptionShift({
                  xShift: elementMove(11).xShift,
                  yShift: elementMove(11).yShift,
                }));
            }, 50);
          }}
          // onMouseLeave={(e) => {
          //   const zeros = { xShift: 0, yShift: 0 };

          //   setTimeout(() => {
          //     setBackgroundShift(zeros);
          //     setTitleShift(zeros);
          //     setDescriptionShift(zeros);
          //   }, 50);
          // }}
        >
          <div
            className={parallax_styles.parallaxBackground}
            style={{
              width: `${backgroundSize}%`,
              height: `${backgroundSize}%`,
              position: "relative",
              left: `${((backgroundSize - 100) / -2) * parallax_width_percent_in_px! + backgroundShift.xShift}px`,
              top: `${((backgroundSize - 100) / -2) * parallax_height_percent_in_px! + backgroundShift.yShift}px`,
            }}
          >
            <h1
              className={parallax_styles.parallaxTitle}
              style={{
                left: `${-titleShift.xShift}px`,
                top: `${(100 * parallax_height_percent_in_px!) / 2 - titleShift.yShift}px`,
              }}
            >
              Playground
            </h1>
            <p
              className={parallax_styles.parallaxDescription}
              style={{
                left: `${-descriptionShift.xShift}px`,
                top: `${(100 * parallax_height_percent_in_px!) / 2 - descriptionShift.yShift}px`,
              }}
            >
              A project with a few things I'd like to improve, such as a
              background parallax effect, a sticky header, a slider, a
              drag-and-drop area, an FAQ section, a liquid glass effect, and a
              theme switcher
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
