import React, { useContext, useState } from 'react';
import { BackgroundContainer } from '../BackgroundContainer';
import { AdminSignOut } from './AdminSignOut';
import GradientBackground from '../../assets/GradientBackground.png';
import { AdminTitle } from './AdminTitle';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { css } from 'emotion';
import { UserContext } from '../portfolio-shared/UserContext';
import { LinkContainer } from 'react-router-bootstrap';

// Manage Public Information Page

const ManagePage = () => {
  const { name } = useContext(UserContext);

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
                  value={name}
                  onChange={handleNameChange}
                  type="text"
                  placeholder="Enter name"
                />
                <Form.Text className="text-muted">
                  This will be shown on your profile
                </Form.Text>
              </Form.Group>

              <div className="mt-5">
                <Button className="border" variant="primary" type="submit">
                  Save
                </Button>
                <LinkContainer to="/admin">
                  <Button variant="light" className="ml-3 border">
                    Cancel
                  </Button>
                </LinkContainer>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </BackgroundContainer>
  );
};

export { ManagePage };
