import React, { useContext, useEffect, useState } from 'react';
import { BackgroundContainer } from '../BackgroundContainer';
import { AdminSignOut } from './AdminSignOut';
import GradientBackground from '../../assets/GradientBackground.png';
import { AdminTitle } from './AdminTitle';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { css } from 'emotion';
import { UserContext } from '../portfolio-shared/UserContext';
import { LinkContainer } from 'react-router-bootstrap';
import { updateName } from './AdminUtils';
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

// Manage Public Information Page

const ManagePage = () => {
  const { name, setName } = useContext(UserContext);
  const [formName, setFormName] = useState(name);
  const { getAccessTokenSilently } = useAuth0();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const { registrationComplete, isLoaded } = useContext(AuthContext);

  if (!isLoaded) {
    return null;
  }

  if (!registrationComplete) {
    return <Redirect to="/getstarted" />;
  }

  useEffect(() => {
    setFormName(name);
  }, [name]);

  const handleNameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormName(event.target.value);
  };

  const topMarginStyle = css({
    marginTop: '20vh',
  });

  const handleSubmit = async (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setSaving(true);
    event.preventDefault();
    updateName(formName, getAccessTokenSilently).then((response) => {
      if (response.ok) {
        setName(formName);

        // Setting a minimum time at least it was too fast on local
        setTimeout(() => {
          setSaving(false);
          setSuccess(true);
        }, 500);

        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    });
  };

  const buttonStyle = {
    minWidth: '72px',
  };

  const SaveButton = () => {
    let content;
    if (saving) {
      content = (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      );
    } else if (success) {
      content = 'Saved!';
    } else {
      content = 'Save';
    }

    return (
      <Button
        className="border"
        variant={success ? 'success' : 'primary'}
        type="submit"
        disabled={saving}
        style={buttonStyle}
      >
        {content}
      </Button>
    );
  };

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
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mt-2" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={formName}
                  onChange={handleNameChange}
                  type="text"
                  placeholder="Enter name"
                />
                <Form.Text className="text-muted">
                  This will be shown on your profile
                </Form.Text>
              </Form.Group>

              <div className="mt-5">
                <SaveButton />
                <LinkContainer to="/admin" style={buttonStyle}>
                  <Button variant="light" className="ml-3 border">
                    Back
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
