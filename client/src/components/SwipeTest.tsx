import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SwipeCard from './SwipeCard';

function App():JSX.Element {
  const [names, setNames] = useState<string[]>([
    'harry',
    'sally',
    'mary',
    'joe',
    'terry',
    'larry',
    'geraldine',
    'harriet',
  ]);
  const removeCard = (nameToRemove:string):void => {
    const newNames = names.filter((name) => name !== nameToRemove);
    setNames(newNames);
  };
  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      backgroundColor: 'white',
    }}
    >
      <AnimatePresence>
        {names.map((name) => <SwipeCard name={name} remove={removeCard} key={name} />)}
      </AnimatePresence>
    </div>

  );
}
export default App;
