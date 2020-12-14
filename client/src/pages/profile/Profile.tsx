/*eslint-disable */
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';

function Roomates() {
  const [loading, setLoading] = useState<boolean>(false);
  const [prefernces, setPrefernces] = useState<boolean>(false); // todo: get actuall prefernces for the user and create prefernces interface
  const context = useContext(UserContext);
  useEffect(() => {
    console.log(context);
  }, []);
  return (
    <div className='cards-page'>
      {!loading && context ? (
        <div>
          <h3> {context.id}</h3>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}

export default Roomates;
