import React, { useEffect, useState } from 'react';
import { BackgroundContainer } from '../BackgroundContainer';
import GradientBackground from '../../assets/GradientBackground.png';
import { AdminSignOut } from './AdminSignOut';
import { Container, Row, Form, Button, FormControl } from 'react-bootstrap';
import { AdminTitle } from './AdminTitle';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import useAuth0Api from '../api/useAuth0Api';

const GetStartedPage = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  // TODO: Client side validation
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { updateRegistrationStatus } = useAuth0Api();

  const { user } = useAuth0();
  const { given_name: givenName, email } = user;

  // TODO: Make use of this
  const registerUser = async (username: string) => {
    // Axios Documentation: https://github.com/axios/axios
    try {
      const response = await axios({
        method: 'POST',
        url: '/api/auth/create-user',
        data: {
          username: username,
          email: email,
          auth0Id: user.sub,
        },
      });

      if (response.status === 201) {
        await updateRegistrationStatus();
        window.location.reload();
        // instead of reloading we can call `await getRegistrationStatus()`
        // or just call `setRegistrationComplete(true)`
      }
    } catch (error) {
      const errorData = error.response.data;
      if (errorData === 'username taken') {
        setErrorMessage('URL is already taken');
      } else if (errorData === 'auth0Id conflict') {
        setErrorMessage('ID conflict. Please contact Pure && Lazy.');
      }
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setName(event.target.value);
  };

  const handleUsernameChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUsername(event.target.value);
    // props.setErrorMessage('');
  };

  // TODO: Implement this
  const handleSubmit = async (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    registerUser(username);
  };

  const topMarginStyle = {
    marginTop: '20vh',
  };

  return (
    <BackgroundContainer background={GradientBackground}>
      <div className="m-3 text-right">
        <AdminSignOut />
      </div>
      <Container>
        <Row css={topMarginStyle}></Row>
        <Row className="mb-3">
          <AdminTitle
            title="Welcome to Pure & Lazy!"
            subtitle="Before you get started, we need to know a few things about you"
          />
        </Row>
        <Row>
          <Form onSubmit={() => alert('Functionality Not Done Yet')}>
            <Form.Group className="mt-2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={handleNameChange}
                type="text"
                placeholder="Enter name"
              />
            </Form.Group>

            <Form.Group className="mt-4" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                onChange={handleUsernameChange}
                type="text"
                placeholder="Enter username"
                isInvalid={isInvalid}
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
              <Button className="border" variant="primary" type="submit">
                Save
              </Button>
              <Button className="ml-3 border" variant="light">
                Cancel
              </Button>
            </div>
          </Form>
        </Row>
      </Container>
    </BackgroundContainer>
  );
};

export { GetStartedPage };
