import React from 'react';
import { BackgroundContainer } from '../BackgroundContainer';
import { AdminSignOut } from './AdminSignOut';
import GradientBackground from '../../assets/GradientBackground.png';
import { AdminTitle } from './AdminTitle';
import { Col, Container, Row } from 'react-bootstrap';
import { css } from 'emotion';

// Manage Public Information Page

const ManagePage = () => {
  const topMarginStyle = css({
    marginTop: '20vh',
  });

  return (
    <BackgroundContainer background={GradientBackground}>
      <div className="m-3 text-right">
        <AdminSignOut />
      </div>
      <Container>
        <Row className={topMarginStyle}></Row>
        <Row>
          <Col>
            <AdminTitle
              title="Edit Public Information"
              subtitle="What details would you like to change?"
            />
          </Col>
        </Row>
      </Container>
    </BackgroundContainer>
  );
};

export { ManagePage };
