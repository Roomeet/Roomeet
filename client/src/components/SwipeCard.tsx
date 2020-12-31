import React from 'react';
import { motion, Variants } from 'framer-motion';

const screenWidth = window.screen.availWidth;
function Card({ name, remove }:{name:string, remove:(word:string)=>void}):JSX.Element {
  const cardVariants = {
    initial: {
      opacity: 0,
      scale: 0.5,
    },
    animate: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      x: screenWidth,
      scale: 0.9,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onDragEnd={
        (event, info) => {
          if (info.offset.x > screenWidth / 6) {
            cardVariants.exit.x = screenWidth;
            remove(name);
          }
          if (info.offset.x < -screenWidth / 6) {
            cardVariants.exit.x = -screenWidth;
            remove(name);
          }
        }
      }
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      style={{
        margin: 'auto',
        // marginTop: '20vh',
        height: '30vh',
        width: '30vw',
        backgroundColor: 'red',
      }}
      dragElastic={0.9}
    >
      {name}
    </motion.div>

  );
}
export default Card;
