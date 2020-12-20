import React, { useState, useEffect } from 'react';
import {
  motion, AnimatePresence, useAnimation, Variants, AnimationControls,
} from 'framer-motion';
import { string } from 'yup';

const initalColors = ['red', 'orange', 'yellow', 'green', 'teal'];
const Card = ({
  color, controls, variants, remove,
}:{color:string, controls:AnimationControls, variants:Variants, remove:(something:any)=>void}) => (
  <motion.div
    drag="x"
    dragConstraints={{ left: 0, right: 0 }}
    variants={variants}
    exit="exit"
    onDragEnd={(e, i) => {
      if (i.point.x > 100) {
        remove(color);
      }
    }}
    style={{
      background: color,
      height: '20vh',
      width: '20vh',
      margin: '0 auto',
    }}
  >
    {color}
  </motion.div>
);

function Animtest():JSX.Element {
  const [colors, setColors] = useState<string[]>(initalColors);
  const controls = useAnimation();
  const cardVariants:Variants = {
    exit: {
      scale: 0.5,
      opacity: 0,
    },
  };
  const remove = (curCol:string) => {
    const newColors = colors.filter((color) => color !== curCol);
    setColors(newColors);
  };
  return (
    <div>
      <button onClick={() => { setColors(initalColors); }}>
        reset
      </button>
      <AnimatePresence>

        {colors.map((color) => (
          <Card
            // key={color}
            color={color}
            controls={controls}
            variants={cardVariants}
            remove={remove}
          />
          // <motion.div
          //   drag="x"
          //   dragConstraints={{ left: 0, right: 0 }}
          //   variants={cardVariants}
          //   exit="exit"
          //   onDragEnd={(e, i) => {
          //     if (i.point.x > 100) {
          //       const newColors = colors.slice(0, colors.length - 1);
          //       setColors(newColors);
          //     }
          //   }}
          //   style={{
          //     background: `rgb(0,0,${color})`,
          //     height: '20vh',
          //     width: '20vh',
          //     margin: '0 auto',
          //   }}
          // />
        ))}
      </AnimatePresence>
    </div>
  );
}
export default Animtest;
