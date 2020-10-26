import React, { useState, useContext } from 'react';
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
import { AuthContext } from '../auth/AuthContext';
import { UserContext } from '../portfolio-shared/UserContext';

const AdminPage = () => {
  const { user } = useAuth0();
  const { email } = user;
  const { updateRegistrationStatus } = useAuth0Api();
  const { username, name } = useContext(UserContext);
  const { registrationComplete, isLoaded } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState('');

  // TODO: Redirect to /getstarted if registration not complete

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
              title={`Welcome back, ${name}`}
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
            <AdminLink to={`/u/${username}`} label="View Portfolio" />
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
