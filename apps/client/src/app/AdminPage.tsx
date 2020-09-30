import React, { useEffect, useState } from 'react';
import { BackgroundContainer } from './BackgroundContainer';
import GradientBackground from '../assets/GradientBackground.png';
import { useAuth0 } from '@auth0/auth0-react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import LoadingScreen from './LoadingScreen';
import UrlForm from './input/UrlForm';

const AdminPage = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const { name, given_name, picture, email, nickname } = user;

  // Auth0 Management API constants
  const auth0Domain = 'pure-and-lazy.au.auth0.com';
  const audience = `https://${auth0Domain}/api/v2/`;
  const userDetailsByIdUrl = `https://${auth0Domain}/api/v2/users/${user.sub}`;

  const [userData, setUserData] = useState(null);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const getUserData = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: audience,
        scope: 'read:current_user',
      });
      console.log('got access token');

      const userDataResponse = await fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('got user response');

      const data = await userDataResponse.json();
      // data.app_metadata.registration_complete = true;
      setUserData(data);
      setRegistrationComplete(data.app_metadata.registration_complete);
      setIsLoaded(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  const updateRegistrationStatus = async () => {
    try {
      console.log('audience:', audience);
      console.log('userDetailsByIdUrl:', userDetailsByIdUrl);
      const accessToken = await getAccessTokenSilently({
        audience: audience,
        scope: 'update:current_user_metadata',
      });
      console.log('got access token');

      const payload = {
        app_metadata: {
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
      console.log('patch response:', (await patchResponse.json()).message);

    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserData();
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
      {/*<h2>{name}</h2>*/}
      <p>{email}</p>
      {/*/!*<h4>Other User Content:</h4>*!/*/}
      {/*<p>{JSON.stringify(userData, null, 2)}</p>*/}
      <h2>Hi {given_name}, welcome to ePortfolio Maker by Pure && Lazy</h2>

      {!registrationComplete ? (
        <UrlForm handleSubmit={updateRegistrationStatus} />
      ) : (
        <>
          <LinkContainer to={`/u/${nickname}`}>
            <Button>View Portfolio</Button>
          </LinkContainer>
          <LinkContainer to={`/edit`}>
            <Button>Edit Portfolio</Button>
          </LinkContainer>
        </>
      )}
    </BackgroundContainer>
  );
};

export default AdminPage;
