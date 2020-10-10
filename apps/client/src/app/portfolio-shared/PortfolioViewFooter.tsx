import React from 'react';
import FooterAdminButton from '../buttons/FooterAdminButton';
import EditThemeButton from '../buttons/EditThemeButton';
import ViewAsButton from '../buttons/ViewAsButton';
import { Container, Col, ButtonToolbar, Row } from 'react-bootstrap';

// Footer displayed when viewing your own portfolio as a visitor
const PortfolioViewFooter = () => {
  const link = `/edit`;

  return (
    <>
      {/* Large screen display */}
      <ButtonToolbar
        className="justify-content-between d-none d-md-flex"
        as={Container}
      >
        <Col>
          <span className="float-left">
            <FooterAdminButton />
            <EditThemeButton />
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
      <Container className="d-md-none">
        <Row>
          <p className="mx-auto my-0">You are viewing this portfolio</p>
        </Row>

        <Row>
          <ButtonToolbar className="mx-auto">
            <FooterAdminButton isSmall={true} />
            <EditThemeButton isSmall={true} />
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
