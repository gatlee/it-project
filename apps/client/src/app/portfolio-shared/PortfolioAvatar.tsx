import React from 'react';
import JaneDoe from '../../assets/JaneDoe.jpg';
import { Image } from 'react-bootstrap';

const PortfolioAvatar = () => {
  // TODO: fetch image from the backend!

  const imageStyle = {
    maxHeight: '40vh',
  };

  return (
    <Image
      fluid
      className="mt-5 shadow-lg"
      src={JaneDoe}
      style={imageStyle}
      roundedCircle
    />
  );
};

export { PortfolioAvatar };
