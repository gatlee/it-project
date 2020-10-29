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
        <h1 className="my-3">Theme Image</h1>

        <Container>
          <Row>
            <Col className="text-center mb-3 px-1" sm={12} xl={4}>
              <img
                className={themeStyle + ' shadow'}
                src={Jilden}
                onClick={() => changeUserTheme(UserTheme.JILDEN)}
                alt=""
              />
            </Col>
            <Col className="text-center mb-3 px-1" sm={12} xl={4}>
              <img
                className={themeStyle + ' shadow'}
                src={Silva}
                onClick={() => changeUserTheme(UserTheme.SILVA)}
                alt=""
              />
            </Col>
            <Col className="text-center mb-3 px-1" sm={12} xl={4}>
              <img
                className={themeStyle + ' shadow'}
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
