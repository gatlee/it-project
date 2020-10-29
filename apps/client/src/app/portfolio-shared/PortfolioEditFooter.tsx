import React, { useContext, useState } from 'react';
import FooterAdminButton from '../buttons/FooterAdminButton';
import EditThemeButton from '../buttons/EditThemeButton';
import ViewAsButton from '../buttons/ViewAsButton';
import { useLocation } from 'react-router-dom';
import { UserContext } from './UserContext';
import { Container, Col, ButtonToolbar, Row } from 'react-bootstrap';
import { PortfolioThemePicker } from './PortfolioThemePicker';

// Footer displayed on the edit page
const PortfolioEditFooter = () => {
  const { username } = useContext(UserContext);
  const { pathname } = useLocation();
  const editPrefix = '/edit';
  const link = `/u/${username}${pathname.slice(editPrefix.length)}`;

  const [showThemePicker, setThemePicker] = useState(false);

  const handleThemeOpen = () => setThemePicker(true);
  const handleThemeClose = () => setThemePicker(false);

  return (
    <>
      <PortfolioThemePicker show={showThemePicker} onHide={handleThemeClose} />
      {/* Large screen display */}
      <ButtonToolbar
        className="justify-content-between d-none d-lg-flex"
        as={Container}
      >
        <Col>
          <span className="float-left">
            <FooterAdminButton />
            <EditThemeButton onClick={handleThemeOpen} />
          </span>
        </Col>

        <Col style={{ marginTop: '0.1rem' }}>
          You are editing this portfolio
        </Col>

        <Col>
          <span className="float-right">
            <ViewAsButton target={link} content={'View as visitor'} />
          </span>
        </Col>
      </ButtonToolbar>

      {/* Small screen display */}
      <Container className="d-lg-none">
        <Row>
          <p className="mx-auto my-0">You are editing this portfolio</p>
        </Row>

        <Row>
          <ButtonToolbar className="mx-auto mb-2">
            <FooterAdminButton isSmall={true} />
            <EditThemeButton isSmall={true} onClick={handleThemeOpen} />
            <ViewAsButton
              target={link}
              content={'View as visitor'}
              isSmall={true}
            />
          </ButtonToolbar>
        </Row>
      </Container>
    </>
  );
};

export { PortfolioEditFooter };
