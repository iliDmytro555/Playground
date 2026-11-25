import React from "react";
import { Parallax } from "../../components/Parallax/Parallax";
import { Header } from "../../components/Header/Header";
import { Slider } from "../../components/Slider/Slider";

export const MainPage: React.FC = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Parallax />
        <Slider
          arr={[
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
            36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52,
            53, 54, 55, 56, 57, 58, 59,
          ]}
          visibleSlidesAmount={5}
          width={50}
          direction="horizontal"
          isCircular={false}
          delay={0}
        />
      </main>
    </>
  );
};
