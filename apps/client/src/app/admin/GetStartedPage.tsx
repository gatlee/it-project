import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Row,
} from 'react-bootstrap';
import GradientBackground from '../../assets/GradientBackground.png';
import useAuth0Api from '../api/useAuth0Api';
import { BackgroundContainer } from '../BackgroundContainer';
import { AdminSignOut } from './AdminSignOut';
import { AdminTitle } from './AdminTitle';
import { AuthContext } from '../auth/AuthContext';
import { Redirect } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

const GetStartedPage = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  const [isInvalidName, setIsInvalidName] = useState(false);
  const [isInvalidUsername, setIsInvalidUsername] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { user, getAccessTokenSilently } = useAuth0();
  const { updateRegistrationStatus } = useAuth0Api();
  const { registrationComplete, isLoaded } = useContext(AuthContext);

  const registerUser = async (name: string, username: string) => {
    // Axios Documentation: https://github.com/axios/axios
    try {
      const userCreationResponse = await axios({
        method: 'POST',
        url: '/api/auth/create-user',
        data: {
          username: username,
          email: user.email,
          auth0Id: user.sub,
        },
      });

      if (userCreationResponse.status === 201) {
        const token = await getAccessTokenSilently();
        const nameEditResponse = await axios({
          method: 'PUT',
          url: '/api/portfolio/profile',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            name: name,
          },
        });

        if (nameEditResponse.status === 200) {
          await updateRegistrationStatus();
          window.location.reload();
        }
      }
    } catch (error) {
      console.log('Error registering user', error);
      const errorData = error.response.data;
      console.log(errorData);
      if (errorData === 'username taken') {
        setErrorMessage('Username is already taken');
        setIsInvalidUsername(true);
      } else if (errorData === 'auth0Id conflict') {
        setErrorMessage('ID conflict. Please contact Pure && Lazy.');
        setIsInvalidUsername(true);
      }
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setName(event.target.value);
    const regEx = new RegExp('^[a-z0-9 -]+$', 'i');
    setIsInvalidName(!regEx.test(event.target.value));
  };

  const handleUsernameChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUsername(event.target.value);
    setErrorMessage('');
    setIsInvalidUsername(false);

    const regEx = new RegExp('^[a-z0-9]+$', 'i');
    setIsInvalidUsername(!regEx.test(event.target.value));
    setErrorMessage(
      'Username must only be made of letters [a-z] and numbers [0-9]'
    );
  };

  const handleSubmit = async (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await registerUser(name, username);
    } catch (error) {
      console.log('Error during submission', error);
    }
    setSubmitting(false);
  };

  const topMarginStyle = {
    marginTop: '20vh',
  };

  const isInvalid = isInvalidName || isInvalidUsername;

  if (!isLoaded) {
    return null;
  }

  if (registrationComplete) {
    return <Redirect to="/admin" />;
  }

  return (
    <BackgroundContainer background={GradientBackground}>
      <div className="m-3 text-right">
        <AdminSignOut />
      </div>
      <Container>
        <Row css={topMarginStyle}></Row>
        <Row className="mb-3">
          <Col>
            <AdminTitle
              title="Welcome to Pure & Lazy!"
              subtitle="Before you get started, we need to know a few things about you"
            />
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={8}>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mt-2"
                controlId="name"
                style={{ position: 'relative' }}
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  onChange={handleNameChange}
                  type="text"
                  placeholder="Enter name"
                  isInvalid={isInvalidName}
                  required
                />
                <Form.Text className="text-muted">
                  This will be shown on your profile
                </Form.Text>
                <FormControl.Feedback type="invalid" tooltip>
                  Name must only be made of letters [a-z], numbers [0-9], spaces
                  [ ] and hyphens [-]
                </FormControl.Feedback>
              </Form.Group>

              <Form.Group
                className="mt-4"
                controlId="username"
                style={{ position: 'relative' }}
              >
                <Form.Label>Username</Form.Label>
                <Form.Control
                  onChange={handleUsernameChange}
                  type="text"
                  placeholder="Enter username"
                  isInvalid={isInvalidUsername}
                  required
                />
                <Form.Text className="text-muted">
                  This will be used to access your public profile. This{' '}
                  <b>can't</b> be changed in the future.
                </Form.Text>
                <FormControl.Feedback type="invalid" tooltip>
                  {errorMessage}
                </FormControl.Feedback>
              </Form.Group>

              <div className="mt-5">
                <LinkContainer to="/">
                  <Button variant="light" className="mr-3 border">
                    Cancel
                  </Button>
                </LinkContainer>
                <Button
                  className="border"
                  variant="primary"
                  type="submit"
                  disabled={isInvalid || submitting}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </BackgroundContainer>
  );
};

export { GetStartedPage };
