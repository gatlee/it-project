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
import SignOutButton from "./buttons/SignOutButton";

// Axios Documentation: https://github.com/axios/axios

const AdminPage = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const { given_name, picture, email } = user;

  // Auth0 Management API constants
  const auth0Domain = 'pure-and-lazy.au.auth0.com';
  const audience = `https://${auth0Domain}/api/v2/`;
  const userDetailsByIdUrl = `https://${auth0Domain}/api/v2/users/${user.sub}`;

  // const [userData, setUserData] = useState(null);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
      // data.user_metadata.registration_complete = true;
      // setUserData(data);
      setRegistrationComplete(data.user_metadata.registration_complete);
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
      console.log('patch response:', (await patchResponse.json()));

    } catch (e) {
      console.log(e);
    }
  };

  const registerUser = async (username: String) => {
    // const apiUrl = "/api/auth/create-user"
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
      // @ts-ignore
      const response = await axios(requestOptions);
      // const response = await axios.post(apiUrl, {
      //   username: username,
      //   email: email,
      //   auth0Id: user.sub,
      // })
      console.log('response:', response);

      if (response.status === 200) {
        await updateRegistrationStatus();
        window.location.reload();
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
    getUserData().then();
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
