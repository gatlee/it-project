import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BackgroundContainer } from '../BackgroundContainer';
import GradientBackground from '../../assets/GradientBackground.png';
import { useAuth0 } from '@auth0/auth0-react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Container, Row, Col } from 'react-bootstrap';
import ViewPortfolioButton from '../buttons/ViewPortfolioButton';
import UrlForm from '../input/UrlForm';
import SignOutButton from '../buttons/SignOutButton';
import useAuth0Api from '../api/useAuth0Api';
import { AdminButton } from './AdminButton';

// Axios Documentation: https://github.com/axios/axios

const AdminPage = () => {
  const { user } = useAuth0();
  const { given_name, picture, email } = user;
  const { getRegistrationStatus, updateRegistrationStatus } = useAuth0Api();

  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const registerUser = async (username: String) => {
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

  useEffect(() => {
    getRegistrationStatus()
      .then((registrationStatus) => {
        setRegistrationComplete(registrationStatus);
        setIsLoaded(true);
      })
      .catch();
  }, []);

  if (!isLoaded) {
    return null;
  }

  const topMarginStyle = {
    marginTop: '20vh',
  };

  return (
    <BackgroundContainer background={GradientBackground}>
      <div className="m-3 text-right">
        <SignOutButton />
      </div>
      <Container className="">
        <Row css={topMarginStyle}></Row>
        <Row>
          <Col>
            <h2 className="mt-5">
              <b>Welcome back, {given_name}</b>
            </h2>
            <p>
              <b>What would you like to do today?</b>
            </p>
            {!registrationComplete ? (
              <UrlForm
                onSubmit={registerUser}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            ) : (
              <div className="mb-5 mt-4">
                <ViewPortfolioButton />
                <LinkContainer to={`/edit`}>
                  <Button>Edit Portfolio</Button>
                </LinkContainer>
              </div>
            )}
            <div className="mb-3">
              <LinkContainer to={`/`}>
                <Button variant="info">Return to Homepage</Button>
              </LinkContainer>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <AdminButton label="test" />
          </Col>
        </Row>
        <Row>
          <Col>
            <AdminButton label="test" />
          </Col>
        </Row>
        <Row>
          <Col>
            <AdminButton label="test" />
          </Col>
        </Row>
      </Container>
    </BackgroundContainer>
  );
};

export default AdminPage;
