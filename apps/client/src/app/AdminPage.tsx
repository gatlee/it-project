import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BackgroundContainer } from './BackgroundContainer';
import GradientBackground from '../assets/GradientBackground.png';
import { useAuth0 } from '@auth0/auth0-react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import ViewPortfolioButton from './buttons/ViewPortfolioButton';
import LoadingScreen from './LoadingScreen';
import UrlForm from './input/UrlForm';
import SignOutButton from './buttons/SignOutButton';

// Axios Documentation: https://github.com/axios/axios

const AdminPage = () => {
  const { user, getAccessTokenWithPopup } = useAuth0();
  const { given_name, picture, email } = user;

  // Auth0 Management API constants
  const auth0Domain = 'pure-and-lazy.au.auth0.com';
  const audience = `https://${auth0Domain}/api/v2/`;
  const userDetailsByIdUrl = `https://${auth0Domain}/api/v2/users/${user.sub}`;

  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getUserRegistrationStatus = async () => {
    try {
      const accessToken = await getAccessTokenWithPopup({
        audience: audience,
        scope: 'read:current_user update:current_user_metadata',
      });
      console.log('got access token');

      const userDataResponse = await fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('got user response');

      const data = await userDataResponse.json();
      setRegistrationComplete(data.user_metadata.registration_complete);
      setIsLoaded(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  const updateRegistrationStatus = async () => {
    try {
      const accessToken = await getAccessTokenWithPopup({
        audience: audience,
        scope: 'read:current_user update:current_user_metadata',
      });
      console.log('got access token');

      const payload = {
        user_metadata: {
          registration_complete: true,
        },
      };

      const patchResponse = await fetch(userDetailsByIdUrl, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      console.log('patch response:', await patchResponse.json());
    } catch (e) {
      console.log(e);
    }
  };

  const registerUser = async (username: String) => {
    const requestOptions = {
      method: 'POST',
      url: '/api/auth/create-user',
      data: {
        username: username,
        email: email,
        auth0Id: user.sub,
      },
    };
    try {
      // @ts-ignore // my IDE is buggy
      const response = await axios(requestOptions);

      console.log('response:', response);

      if (response.status === 201) {
        await updateRegistrationStatus();
        window.location.reload();
        // instead of reloading we can call `await getUserRegistrationStatus()`
      }
    } catch (error) {
      console.log(error.response);

      const errorData = error.response.data;
      if (errorData === 'username taken') {
        setErrorMessage('URL is already taken');
      } else if (errorData === 'auth0Id conflict') {
        setErrorMessage('ID conflict. Please contact Pure && Lazy.');
      }
    }
  };

  useEffect(() => {
    getUserRegistrationStatus().then();
  }, []);

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return (
    <BackgroundContainer
      background={GradientBackground}
      style={{ textAlign: 'center' }}
    >
      <img src={picture} alt="Profile" style={{ maxWidth: '100px' }} />
      <p>{email}</p>
      <h2>Hi {given_name}, welcome to ePortfolio Maker by Pure && Lazy</h2>

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
      <SignOutButton />
    </BackgroundContainer>
  );
};

export default AdminPage;
