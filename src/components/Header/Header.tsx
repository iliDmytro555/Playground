import React, { useEffect, useRef, useState } from "react";

import header_styles from "./Header.module.scss";

export const Header: React.FC = () => {
  const headerHeight: number = 100;

  const prevHeight = useRef<number>(window.scrollY);

  const [startHeight, setStartHeight] = useState(window.scrollY);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const hideHeader = () => {
      setIsVisible(!isVisible);
    };

    window.addEventListener("click", hideHeader);

    return () => window.removeEventListener("click", hideHeader);
  }, [isVisible]);

  useEffect(() => {
    const startedHeight = () => {
      setStartHeight(window.scrollY);
    };

    window.addEventListener("scrollend", startedHeight);

    return () => window.removeEventListener("scrollend", startedHeight);
  }, []);

  useEffect(() => {
    const scrolledHeight = (diff: number) => {
      const currentHeight = window.scrollY;

      if (currentHeight - startHeight > diff) {
        setIsVisible(false);
        setStartHeight(currentHeight);
      } else if (currentHeight - startHeight < -diff) {
        setIsVisible(true);
        setStartHeight(currentHeight);
      }

      if (
        (prevHeight.current < currentHeight && !isVisible) ||
        (prevHeight.current > currentHeight && isVisible)
      ) {
        setStartHeight(currentHeight);
      }

      prevHeight.current = currentHeight;
    };

    const exactScroll = () => scrolledHeight(30);

    window.addEventListener("scroll", exactScroll);

    return () => window.removeEventListener("scroll", exactScroll);
  }, [startHeight, isVisible]);

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
