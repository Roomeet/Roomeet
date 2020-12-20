import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SwipeCard from './SwipeCard';

const initNames = [
  'harry',
  'sally',
  'mary',
  'joe',
  'terry',
  'larry',
  'geraldine',
  'harriet',
];
function App():JSX.Element {
  const [names, setNames] = useState<string[]>(initNames);
  const removeCard = (nameToRemove:string):void => {
    // const newNames = names.filter((name) => name !== nameToRemove);
    const newNames = names.slice(1);
    setNames(newNames);
  };
  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      backgroundColor: 'white',
    }}
    >
      <button onClick={() => { setNames(initNames); }}>
        reset
      </button>
      <AnimatePresence exitBeforeEnter initial={false}>
        {/* {names.map((name) => <SwipeCard name={name} remove={removeCard} key={name} />)} */}
        <SwipeCard
          key={names[0]}
          name={names[0]}
          remove={removeCard}
        />
      </AnimatePresence>
    </div>

  );
}
export default App;
