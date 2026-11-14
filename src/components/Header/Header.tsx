import React, { useEffect, useRef, useState } from "react";

import header_styles from "./Header.module.scss";

export const Header: React.FC = () => {
  type direction = "up" | "down";

  const prevScrolledHeight = useRef<number>(window.scrollY);
  const prevScrollDirection = useRef<direction>("up");

  const [scrollDirection, setScrollDirection] = useState<direction>("up");
  const [scrolledHeight, setScrolledHeight] = useState<number>(0);

  const [scrolledHeightAfterRedirection, setScrolledHeightAfterRedirection] =
    useState<number>(0);

  const [isVisible, setIsVisible] = useState<boolean>(true);

  const headerHeight: number = 100;

  useEffect(() => {
    const hideHeader: () => void = () => {
      setIsVisible(false);
    };

    window.addEventListener("click", hideHeader);

    return () => window.removeEventListener("click", hideHeader);
  }, []);

  useEffect(() => {
    const scrollChange: () => void = () => {
      const currentScrolledHeight = window.scrollY;
      console.log(prevScrollDirection.current);

      setScrolledHeight(currentScrolledHeight);

      if (currentScrolledHeight > prevScrolledHeight.current) {
        setScrollDirection("down");
      } else if (currentScrolledHeight < prevScrolledHeight.current) {
        setScrollDirection("up");
      }

      console.log(scrollDirection);
      if (prevScrollDirection.current !== scrollDirection) {
        setScrolledHeightAfterRedirection(window.scrollY);
      }

      prevScrolledHeight.current = currentScrolledHeight;
      prevScrollDirection.current = scrollDirection;
      console.log("_____________");
    };

    window.addEventListener("scroll", scrollChange);

    return () => window.removeEventListener("scroll", scrollChange);
  }, [scrolledHeight]);

  useEffect(() => {
    if (
      Math.abs(scrolledHeightAfterRedirection - scrolledHeight) > 100 &&
      scrollDirection == "down"
    ) {
      setIsVisible(false);
    } else if (
      Math.abs(scrolledHeightAfterRedirection - scrolledHeight) > 100 &&
      scrollDirection == "up"
    ) {
      setIsVisible(true);
    }

    // console.log(
    //   "Direction: ",
    //   scrollDirection,
    //   " After: ",
    //   scrolledHeightAfterRedirection,
    //   " Difference: ",
    //   Math.abs(scrolledHeightAfterRedirection - scrolledHeight),
    // );
  }, [scrolledHeight]);

  return (
    <div
      className={header_styles.container}
      style={{
        height: `${headerHeight}px`,
        top: `-${isVisible ? 0 : headerHeight}px`,
      }}
    >
      <h2>Header</h2>
    </div>
  );
};
