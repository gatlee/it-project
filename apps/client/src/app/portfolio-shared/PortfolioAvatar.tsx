import React from 'react';
import JaneDoe from '../../assets/JaneDoe.jpg';
import { Image } from 'react-bootstrap';

const PortfolioAvatar = () => {
  const imageStyle = {
    maxHeight: '40vh',
  };

  return (
    <Image
      fluid
      className="mt-5"
      src={JaneDoe}
      style={imageStyle}
      roundedCircle
    />
  );
};

export { PortfolioAvatar };
