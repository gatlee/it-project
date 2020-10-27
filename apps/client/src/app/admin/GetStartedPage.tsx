import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import React, { useState } from 'react';
import {
  Button,
  Container,
  Form,
  FormControl,
  Row,
  Col,
} from 'react-bootstrap';
import GradientBackground from '../../assets/GradientBackground.png';
import useAuth0Api from '../api/useAuth0Api';
import { BackgroundContainer } from '../BackgroundContainer';
import { AdminSignOut } from './AdminSignOut';
import { AdminTitle } from './AdminTitle';

const GetStartedPage = () => {
  // TODO: Use name from db
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  // TODO: Client side validation
  const [isInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { updateRegistrationStatus } = useAuth0Api();

  const { user } = useAuth0();
  const { given_name: email } = user;

  // TODO: Redirect to /admin if registration already complete

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
          <Col>
            <AdminTitle
              title="Welcome to Pure & Lazy!"
              subtitle="Before you get started, we need to know a few things about you"
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
          </Col>
        </Row>
      </Container>
    </BackgroundContainer>
  );
};

export { GetStartedPage };
