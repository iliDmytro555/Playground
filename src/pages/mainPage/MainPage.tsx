import React from "react";
import { Parallax } from "../../components/Parallax/Parallax";
import { Header } from "../../components/Header/Header";

export const MainPage: React.FC = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Parallax />
      </main>
    </>
  );
};
