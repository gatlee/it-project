import React, { useContext } from 'react';
import FooterAdminButton from '../buttons/FooterAdminButton';
import ViewAsButton from '../buttons/ViewAsButton';
import { UserContext } from './UserContext';
import { useLocation } from 'react-router-dom';
import { Container, Col, ButtonToolbar, Row } from 'react-bootstrap';

// Footer displayed when viewing your own portfolio as a visitor
const PortfolioViewFooter = () => {
  const { pathname } = useLocation();
  const { username } = useContext(UserContext);
  const userPrefix: string = `/u/${username}`;
  const link: string = `/edit${pathname.slice(userPrefix.length)}`;

  return (
    <>
      {/* Large screen display */}
      <ButtonToolbar
        className="justify-content-between d-none d-lg-flex"
        as={Container}
      >
        <Col>
          <span className="float-left">
            <FooterAdminButton />
          </span>
        </Col>

        <Col style={{ marginTop: '0.1rem' }}>
          You are viewing this portfolio
        </Col>

        <Col>
          <span className="float-right">
            <ViewAsButton target={link} content={'View as editor'} />
          </span>
        </Col>
      </ButtonToolbar>

      {/* Small screen display */}
      <Container className="d-lg-none">
        <Row>
          <p className="mx-auto my-0">You are viewing this portfolio</p>
        </Row>

        <Row>
          <ButtonToolbar className="mx-auto mb-2">
            <FooterAdminButton isSmall={true} />
            <ViewAsButton
              target={link}
              content={'View as editor'}
              isSmall={true}
            />
          </ButtonToolbar>
        </Row>
      </Container>
    </>
  );
};

export { PortfolioViewFooter };
