import React from "react";
import "./style.css";
import { motion, useTransform, useMotionValue } from "framer-motion";

const data = [
  {
    image:
      "https://raw.githubusercontent.com/ui-code-tv/images/master/dog1.jpg",
    name: "Macy May",
    email: "macy@may.com",
    id: 1,
  },
  {
    image:
      "https://raw.githubusercontent.com/ui-code-tv/images/master/dog2.jpg",
    name: "Bob Banks",
    email: "bob@banks.com.",
    id: 2,
  },
  {
    image:
      "https://raw.githubusercontent.com/ui-code-tv/images/master/cat1.jpg",
    name: "Kitty Kat",
    email: "kit@kat.com.",
    id: 3,
  },
];
const Shuffle = () => {
  const [contact, setContact] = React.useState(data);

  const x = useMotionValue(0);
  const opacityRange = [0, 1, 1, 0];
  const xRange = [-100, -100, 100, 200];
  const opacity = useTransform(x, xRange, opacityRange);

  const onAdd = () => {
    setContact([
      ...contact,
      {
        image:
          "https://raw.githubusercontent.com/ui-code-tv/images/master/dog1.jpg",
        name: "New Person",
        email: "new@person.com",
        id: Math.floor(Math.random() * 2000),
      },
    ]);
  };
  const onRemove = () => {
    let i = Math.floor(Math.random() * contact.length);

    contact.splice(i, 1);
    setContact([...contact]);
  };
  const onshuffle = () => {
    const shuffled = [];
    while (contact.length > 0) {
      let i = (Math.random() * contact.length) | 0;
      shuffled.push(contact[i]);
      contact.splice(i, 1);
    }
    setContact([...shuffled]);
  };

  function template({ rotate, x }) {
    console.log("x", x);
    return `rotate(${rotate}) translateX(${x})`;
  }
  return (
    <div className="shuffle-page">
      <motion.div
      // transformTemplate={template}
      // whileHover={{ scale: 1.2 }}
      // whileTap={{ scale: 0.8 }}
      // animate={{ rotate: 360 }}
      // style={{ rotate: 0, x: "50px" }}
      // style={{ x: 100 }}
      >
        <motion.circle
          style={{ scale: 2, originX: "100px", originY: "100px" }}
        />
        <p>APplication</p>
      </motion.div>
      <h1>Shuffle List</h1>
      <div>
        <button className="shuffle-button" onClick={onAdd}>
          add
        </button>
        <button className="shuffle-button" onClick={onRemove}>
          remove
        </button>
        <button className="shuffle-button" onClick={onshuffle}>
          shuffle
        </button>
        <ul className="shuffle-wrapper">
          {contact.map((item) => {
            return (
              <motion.li
                className="shuffle-card"
                key={item.id}
                layout
                initial={{
                  scale: 0,
                }}
                exit={{
                  opacity: 0,
                  transition: { delay: 0.5, type: "spring" },
                }}
                animate={{
                  scale: 1,
                  transition: {
                    delay: 0.5,
                    type: "spring",
                  },
                }}
              >
                <div className="shuffle-content">
                  <div className="details">
                    <span className="name">Name: {item.name}</span>
                    <span className="email">Email: {item.email}</span>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Shuffle;
