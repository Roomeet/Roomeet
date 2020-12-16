import React from 'react';
import { motion } from 'framer-motion';

function Card({ name, remove }:{name:string, remove:(word:string)=>void}):JSX.Element {
  return (
    <motion.div
      exit={{
        scale: 0.5,
        opacity: 0,
      }}
      onDragEnd={
        (event, info) => {
          if (info.offset.x > 100 || info.offset.x < -100) {
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
