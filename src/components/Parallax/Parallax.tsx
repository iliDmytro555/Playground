import React, { ChangeEvent, useState } from "react";
import parallax_styles from "./Parallax.module.scss";
import parallaxBackground from "../../asset/resource/images/parallaxBackground.webp";

export const Parallax: React.FC = () => {
  console.log(parallax_styles);

  const colors: { col: string; indexes: number[] }[] = [
    { col: "lilac", indexes: [1, 2, 3, 4, 5, 6] },
    { col: "indigo", indexes: [1, 2, 3, 4, 5, 6] },
    { col: "amber", indexes: [1, 2, 3, 4, 5, 6] },
    { col: "cyan", indexes: [1, 2, 3, 4, 5, 6] },
    { col: "red", indexes: [1, 2, 3] },
    { col: "green", indexes: [1, 2, 3] },
    { col: "blue", indexes: [1, 2, 3] },
    { col: "yellow", indexes: [1, 2, 3] },
    { col: "neutral", indexes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
  ];

  const fonts: { sizeIndex: number; weightIndexes: number[] }[] = [
    { sizeIndex: 1, weightIndexes: [1, 2, 3, 4, 5, 6, 7] },
    { sizeIndex: 2, weightIndexes: [1, 2, 3, 4, 5, 6, 7] },
    { sizeIndex: 3, weightIndexes: [1, 2, 3, 4, 5, 6, 7] },
    { sizeIndex: 4, weightIndexes: [1, 2, 3, 4, 5, 6, 7] },
    { sizeIndex: 5, weightIndexes: [1, 2, 3, 4, 5, 6, 7] },
    { sizeIndex: 6, weightIndexes: [1, 2, 3, 4, 5, 6, 7] },
    { sizeIndex: 7, weightIndexes: [1, 2, 3, 4, 5, 6, 7] },
    { sizeIndex: 8, weightIndexes: [1, 2, 3, 4, 5, 6, 7] },
    { sizeIndex: 9, weightIndexes: [1, 2, 3, 4, 5, 6, 7] },
    { sizeIndex: 10, weightIndexes: [1, 2, 3, 4, 5, 6, 7] },
    { sizeIndex: 11, weightIndexes: [1, 2, 3, 4, 5, 6, 7] },
  ];

  const [currentHeight, setCurrentHeight] = useState<number>(1);

  const [spacing, setSpacing] = useState<number>(4);

  return (
    <div className={parallax_styles.parallax}>
      <img
        src={parallaxBackground}
        className={parallax_styles.parallaxBackground}
      />
      <h1 className={parallax_styles.parallaxTitle}>Playground</h1>
      <h2>AAA</h2>
      <h3>AAA</h3>
      <h4>AAA</h4>
      <h5>AAA</h5>
      <h6>AAA</h6>
      <p className={parallax_styles.parallaxDescription}>
        A project with a few things I'd like to improve, such as a background
        parallax effect, a sticky header, a slider, a drag-and-drop area, an FAQ
        section, a liquid glass effect, and a theme switcher
      </p>

      {colors.map(({ col, indexes }) => (
        <div key={col} className={parallax_styles[`${col}Block`]}>
          {indexes.map((index) => (
            <div
              key={index}
              className={parallax_styles[`${col}${index}`]}
            ></div>
          ))}
        </div>
      ))}

      {fonts.map(({ sizeIndex, weightIndexes }) => (
        <div>
          {weightIndexes.map((w) => (
            <p
              className={`${parallax_styles[`size${sizeIndex}`]} ${parallax_styles[`weight${w}`]}`}
              style={{
                display: "inline-block",
              }}
            >
              Text
            </p>
          ))}
        </div>
      ))}

      <input
        type="number"
        min={1}
        max={6}
        value={currentHeight}
        onInput={(e) => {
          setCurrentHeight(e.currentTarget.valueAsNumber);
        }}
      />

      <p className={parallax_styles[`height${currentHeight}`]}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
        autem tempora quas error libero fugiat nesciunt? Modi quod eius eum quis
        aliquid, beatae accusantium iste molestias quo qui, nihil provident
        recusandae! Velit maiores soluta iure eligendi fugiat vitae placeat
        cumque rem ipsa quia pariatur nulla delectus exercitationem non, quaerat
        dolorum ratione consequuntur nesciunt ut? Culpa placeat explicabo quo
        deleniti, et nemo aspernatur perspiciatis laborum unde quos esse,
        accusamus sunt in, laboriosam veritatis. Assumenda optio illum
        laboriosam, ea quod nisi dolorem vel asperiores architecto eum iure
        dicta ratione ipsum quaerat labore earum eius in facere? Tempora quidem
        nemo animi ipsam ad accusamus laudantium dolore corporis, voluptatem
        dignissimos fugiat eligendi fuga aspernatur est doloribus inventore
        eaque iure minus magni beatae cum similique delectus! Ratione
        necessitatibus adipisci soluta nobis impedit est ducimus ab, hic aliquid
        nisi rerum molestias. Vero alias nesciunt veniam quo voluptate nulla
        consectetur hic placeat veritatis ipsam nemo, nisi minima odit dolorem
        cupiditate omnis itaque. Nostrum, modi sunt laborum eius nam quidem
        accusamus sed unde vero quam eum dicta mollitia! Quam fugit sapiente
        quisquam ratione tenetur quibusdam! Mollitia vitae quibusdam quasi
        consequuntur repellat, accusantium enim dolorum obcaecati maxime
        dolores? Voluptatibus sapiente, vitae expedita, quibusdam, excepturi
        consequuntur suscipit odio iure eum maxime nesciunt dignissimos ad
        placeat. Eligendi explicabo atque omnis nam repudiandae dolores. Tenetur
        nobis architecto praesentium pariatur corporis reprehenderit nostrum
        quisquam quam aspernatur fugit consectetur reiciendis odit illo error
        quaerat quod est placeat aperiam totam suscipit, illum voluptatem
        sapiente? Pariatur, blanditiis, ipsam totam sunt ipsum reiciendis illum,
        voluptatum adipisci provident qui consequuntur illo placeat
        reprehenderit. Molestias dolorem voluptates quos ea, reiciendis eligendi
        doloribus aliquam placeat quidem? Ea, nostrum. Quis minima id qui
        laudantium nemo quisquam officiis ab quia perspiciatis libero, iste
        reprehenderit aspernatur maxime eos mollitia alias numquam ducimus
        veritatis. Architecto error id reprehenderit voluptatem commodi eum
        harum placeat molestiae?
      </p>

      <input
        type="number"
        min={1}
        max={13}
        value={spacing}
        onInput={(e) => {
          setSpacing(e.currentTarget.valueAsNumber);
        }}
      />

      <div className={parallax_styles.blocksContainer}>
        <div
          className={`${parallax_styles.block} ${parallax_styles[`spacing${spacing}`]}`}
        ></div>
        <div
          className={`${parallax_styles.block} ${parallax_styles[`spacing${spacing}`]}`}
        ></div>
      </div>
    </div>
  );
};
