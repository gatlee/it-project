import { css } from 'emotion';
import React from 'react';
import { Container, Modal, Col, Row } from 'react-bootstrap';

interface PortfolioThemePicker {
  show: boolean;
  onHide: () => void;
}

const PortfolioThemePicker = (props: PortfolioThemePicker) => {
  const handleClose = () => props.onHide();

  const themeButtonStyle = (color: string) =>
    css({
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      border: '4px solid #E3E3E3',
      background: `${color}`,
      ':hover': {
        border: '4px solid gray',
        '-webkit-transition': '.3s ease',
      },
    });

  const themeStyle = css({
    width: '200px',
    height: '100px',
    background: 'LightGray',
    border: 'none',
  });

  const modalStyle = css({
    width: '40vw',
    maxWidth: 'none',
  });

  return (
    <Modal
      show={props.show}
      centered
      onHide={handleClose}
      dialogClassName={modalStyle}
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Body className="m-3" id="example-custom-modal-styling-title">
        <h3 className="mb-3">Color Scheme</h3>
        <button className={themeButtonStyle('white') + ' mr-3'} />
        <button className={themeButtonStyle('black')} />
        <h3 className="mt-3 mb-3">Theme Image</h3>

        <Container>
          <Row>
            <Col className="text-center mb-3">
              <img className={themeStyle + ' shadow '} />
            </Col>
            <Col className="text-center mb-3">
              <img className={themeStyle + ' shadow '} />
            </Col>
            <Col className="text-center mb-3">
              <img className={themeStyle + ' shadow '} />
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export { PortfolioThemePicker };
