import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

interface AdminButton {
  label: string;
}

const AdminButton = (props: AdminButton) => {
  const [hover, setHover] = useState(false);

  const handleClick = () => {
    console.log('I CLICKED MATE');
  };

  const handleMouseOver = () => {
    console.log('Yeet');
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <div
      className="m-1"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <div onClick={handleClick}>
        {hover ? (
          <Button className="ml-3">→ {props.label}</Button>
        ) : (
          <Button>→ {props.label}</Button>
        )}
      </div>
    </div>
  );
};

export { AdminButton };
