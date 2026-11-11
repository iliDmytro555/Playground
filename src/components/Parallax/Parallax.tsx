import React from "react";
import parallax_styles from "./Parallax.module.scss";
import parallaxBackground from "../../asset/resource/images/parallaxBackground.webp";

export const Parallax: React.FC = () => {
  return (
    <div className={parallax_styles.parallax}>
      <img
        src={parallaxBackground}
        className={parallax_styles.parallaxBackground}
      />
      <h1 className={parallax_styles.parallaxTitle}>Playground</h1>
      <p className={parallax_styles.parallaxDescription}>
        A project with a few things I'd like to improve, such as a background
        parallax effect, a sticky header, a slider, a drag-and-drop area, an FAQ
        section, a liquid glass effect, and a theme switcher
      </p>
    </div>
  );
};
