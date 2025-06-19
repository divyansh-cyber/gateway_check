import React from 'react';

const Loader: React.FC<{ fadeOut?: boolean }> = ({ fadeOut }) => (
  <div className={`loader-container${fadeOut ? ' fade-out' : ''}`}>
    <h1 className="loader-text">Loading Modern Web...</h1>
    <div className="loader-spinner"></div>
  </div>
);

export default Loader; 