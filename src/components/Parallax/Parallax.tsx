import React, { useEffect, useRef, useState } from "react";
import parallax_styles from "./Parallax.module.scss";

import middleGround from "../../asset/resource/images/parallaxMiddleground.png";
import frontGround from "../../asset/resource/images/parallaxFrontground.png";

export const Parallax: React.FC = () => {
  type shiftAxes = { xShift: number; yShift: number };

  const zeros: shiftAxes = { xShift: 0, yShift: 0 };

  const containerSize: number = 100;
  const backgroundSize: number = 110;
  const middlegroundSize: number = 118;
  const frontgroundSize: number = 120;

  const [parallax_width_percent_in_px, setParallax_width_percent_in_px] =
    useState<number | null>(null);
  const [parallax_height_percent_in_px, setParallax_height_percent_in_px] =
    useState<number | null>(null);

  const [mousePosX, setMousePosX] = useState<number | null>(null);
  const [mousePosY, setMousePosY] = useState<number | null>(null);

  const [backgroundShift, setBackgroundShift] = useState<shiftAxes>(zeros);
  const [middlegroundShift, setMiddlegroundShift] = useState<shiftAxes>(zeros);
  const [frontgroundShift, setFrontgroundShift] = useState<shiftAxes>(zeros);
  const [titleShift, setTitleShift] = useState<shiftAxes>(zeros);
  const [descriptionShift, setDescriptionShift] = useState<shiftAxes>(zeros);

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

  // Відступ: gap * px + step * px + shift

  function shiftRow(
    axe: "width" | "height",
    isReversed: boolean,
    size: number,
    step: number,
    currentShift: number,
  ) {
    const axePercentInPx: number =
      axe == "width"
        ? parallax_width_percent_in_px!
        : parallax_height_percent_in_px!;

    const gap = ((size - 100) / -2) * axePercentInPx;
    const rest = Math.abs(gap) - step * axePercentInPx;
    const restShift = ((isReversed ? -1 : 1) * (rest * currentShift)) / gap;

    return gap + step * axePercentInPx + restShift;
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
                xShift: elementMove((backgroundSize - 100) / 2).xShift,
                yShift: elementMove((backgroundSize - 100) / 2).yShift,
              }),
                setMiddlegroundShift({
                  xShift: elementMove((middlegroundSize - 100) / 2).xShift,
                  yShift: elementMove((middlegroundSize - 100) / 2).yShift,
                }),
                setFrontgroundShift({
                  xShift: elementMove((frontgroundSize - 100) / 2).xShift,
                  yShift: elementMove((frontgroundSize - 100) / 2).yShift,
                }),
                setTitleShift({
                  xShift: elementMove(10).xShift,
                  yShift: elementMove(10).yShift,
                }),
                setDescriptionShift({
                  xShift: elementMove(15).xShift,
                  yShift: elementMove(15).yShift,
                }));
            }, 50);
          }}
          onMouseLeave={(e) => {
            setTimeout(() => {
              setBackgroundShift(zeros);
              setMiddlegroundShift(zeros);
              setFrontgroundShift(zeros);
              setTitleShift(zeros);
              setDescriptionShift(zeros);
            }, 50);
          }}
        >
          <div
            className={parallax_styles.parallaxBackground}
            style={{
              width: `${backgroundSize}%`,
              height: `${backgroundSize}%`,
              left: `${shiftRow("width", false, backgroundSize, 0, backgroundShift.xShift)}px`,
              top: `${shiftRow("height", false, backgroundSize, 0, backgroundShift.yShift)}px`,
            }}
          ></div>
          <img
            src={middleGround}
            alt="Middleground layer"
            className={parallax_styles.parallaxMiddleground}
            style={{
              width: `${middlegroundSize}%`,
              height: `${middlegroundSize}%`,
              left: `${shiftRow("width", false, middlegroundSize, 0, middlegroundShift.xShift)}px`,
              top: `${shiftRow("height", false, middlegroundSize, 0, middlegroundShift.yShift)}px`,
            }}
          />
          <img
            src={frontGround}
            alt="Frontground layer"
            className={parallax_styles.parallaxFrontground}
            style={{
              width: `${frontgroundSize}%`,
              height: `${frontgroundSize / 2}%`,
              left: `${shiftRow("width", true, frontgroundSize, 0, frontgroundShift.xShift)}px`,
              bottom: `${shiftRow("height", false, frontgroundSize, 8, frontgroundShift.yShift)}px`,
            }}
          />
          <h1
            className={parallax_styles.parallaxTitle}
            style={{
              left: `${shiftRow("width", true, 0, -50, titleShift.xShift)}px`,
              top: `${shiftRow("height", true, 0, -15, titleShift.yShift)}px`,
            }}
          >
            Playground
          </h1>
          <p
            className={parallax_styles.parallaxDescription}
            style={{
              left: `${shiftRow("width", true, 0, -50, descriptionShift.xShift)}px`,
              top: `${shiftRow("height", true, 0, 0, descriptionShift.yShift)}px`,
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
  );
};
