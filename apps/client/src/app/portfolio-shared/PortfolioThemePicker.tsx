import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface PortfolioThemePicker {
  show: boolean;
  onHide: () => void;
}

const PortfolioThemePicker = (props: PortfolioThemePicker) => {
  const handleClose = () => props.onHide();

  return (
    <Modal show={props.show} centered toggle onHide={handleClose}>
      <Modal.Body>
        <h1>Color Scheme</h1>
        <h1>Theme Image</h1>
      </Modal.Body>
    </Modal>
  );
};

export { PortfolioThemePicker };
