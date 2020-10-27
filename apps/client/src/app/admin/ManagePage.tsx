import React, { useState } from 'react';
import { BackgroundContainer } from '../BackgroundContainer';
import { AdminSignOut } from './AdminSignOut';
import GradientBackground from '../../assets/GradientBackground.png';
import { AdminTitle } from './AdminTitle';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { css } from 'emotion';

// Manage Public Information Page

const ManagePage = () => {
  const [name, setName] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setName(event.target.value);
  };

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
        <Row>
          <Col lg={6} md={8}>
            <Form onSubmit={() => alert('Functionality Not Done Yet')}>
              <Form.Group className="mt-2" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  onChange={handleNameChange}
                  type="text"
                  placeholder="Enter name"
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </BackgroundContainer>
  );
};

export { ManagePage };
