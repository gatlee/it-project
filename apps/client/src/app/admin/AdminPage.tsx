import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BackgroundContainer } from '../BackgroundContainer';
import GradientBackground from '../../assets/GradientBackground.png';
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Row, Col } from 'react-bootstrap';
import UrlForm from '../input/UrlForm';
import useAuth0Api from '../api/useAuth0Api';
import { AdminLink } from './AdminLink';
import { AdminTitle } from './AdminTitle';
import { AdminSignOut } from './AdminSignOut';

const AdminPage = () => {
  const { user } = useAuth0();
  const { given_name: givenName, email } = user;
  const {
    getRegistrationStatusWithCache,
    updateRegistrationStatus,
  } = useAuth0Api();
  const { logout } = useAuth0();

  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  useEffect(() => {
    getRegistrationStatusWithCache()
      .then((registrationStatus) => {
        setRegistrationComplete(registrationStatus);
        setIsLoaded(true);
      })
      .catch();
  }, [getRegistrationStatusWithCache]);

  if (!isLoaded) {
    return null;
  }

  const topMarginStyle = {
    marginTop: '22vh',
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
              title={`Welcome back, ${givenName}`}
              subtitle="What would you like to do today?"
            />
            {!registrationComplete && (
              <UrlForm
                onSubmit={registerUser}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            )}
          </Col>
        </Row>
        <Row className="mb-1">
          <Col>
            <AdminLink to={`/edit`} label="Edit Portfolio" />
          </Col>
        </Row>
        <Row className="mb-1">
          <Col>
            <AdminLink to={`/u/${givenName}`} label="View Portfolio" />
          </Col>
        </Row>
        <Row className="mb-1">
          <Col>
            <AdminLink to={`/admin/manage`} label="Manage Public Information" />
          </Col>
        </Row>
      </Container>
    </BackgroundContainer>
  );
};

export default AdminPage;
