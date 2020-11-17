import React from 'react';
import './loading.scss';

function Loading():JSX.Element {
  return (
    <div className="Loader">
      <div className="animation">
        <div className="truck">
          truck
          <div className="head">head</div>
          <div className="window" />
          <div className="window2" />
          <div className="truck-body">body</div>
          <div className="headlight" />

        </div>
      </div>
    </div>
  );
}
export default Loading;
