import { UserTheme } from '@pure-and-lazy/api-interfaces';
import { css } from 'emotion';
import React from 'react';
import { Col, Container, Modal, Row } from 'react-bootstrap';
import Bean from '../../assets/Bean.png';
import Jilden from '../../assets/landscape.png';
import Silva from '../../assets/Silva.png';
import { updateTheme } from '../admin/AdminUtils';
import { useAuth0 } from '@auth0/auth0-react';

interface PortfolioThemePicker {
  show: boolean;
  onHide: () => void;
}

const PortfolioThemePicker = (props: PortfolioThemePicker) => {
  const { getAccessTokenSilently } = useAuth0();
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
    '@media (min-width: 576px)': {
      width: '40vw',
    },
    maxWidth: 'none',
  });

  const changeUserTheme = (theme: UserTheme) => {
    updateTheme(theme, getAccessTokenSilently).then(() =>
      window.location.reload()
    );
  };

  return (
    <Modal
      show={props.show}
      centered
      onHide={handleClose}
      dialogClassName={modalStyle}
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Body
        className="m-3 text-center"
        id="example-custom-modal-styling-title"
      >
        <h3 className="mb-3">Color Scheme</h3>
        <button className={themeButtonStyle('white') + ' mr-3'} />
        <button className={themeButtonStyle('black')} />
        <h3 className="my-3">Theme Image</h3>

        <Container>
          <Row>
            <Col className="text-center mb-3 mx-1">
              <img
                className={themeStyle}
                src={Jilden}
                onClick={() => changeUserTheme(UserTheme.JILDEN)}
                alt=""
              />
            </Col>
            <Col className="text-center mb-3 mx-1">
              <img
                className={themeStyle}
                src={Silva}
                onClick={() => changeUserTheme(UserTheme.SILVA)}
                alt=""
              />
            </Col>
            <Col className="text-center mb-3 mx-1">
              <img
                className={themeStyle}
                src={Bean}
                onClick={() => changeUserTheme(UserTheme.BEAN)}
                alt=""
              />
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export { PortfolioThemePicker };
