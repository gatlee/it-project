import { css } from 'emotion';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface PortfolioThemePicker {
  show: boolean;
  onHide: () => void;
}

const PortfolioThemePicker = (props: PortfolioThemePicker) => {
  const handleClose = () => props.onHide();

  const darkThemeButton = css({
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    border: '4px solid #E3E3E3',
    background: 'black',
    ':hover': {
      border: '4px solid gray',
    },
  });

  const lightThemeButton = css({
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    border: '4px solid #E3E3E3',
    background: 'white',
    ':hover': {
      border: '4px solid gray',
    },
  });

  return (
    <Modal show={props.show} centered toggle onHide={handleClose}>
      <Modal.Body className="m-3">
        <h2 className="mb-3">Color Scheme</h2>
        <button className={lightThemeButton + ' mr-3'} />
        <button className={darkThemeButton} />
        <h2 className="mt-3">Theme Image</h2>
      </Modal.Body>
    </Modal>
  );
};

export { PortfolioThemePicker };
