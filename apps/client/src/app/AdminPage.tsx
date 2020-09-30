import React, { useEffect, useState } from 'react';
import { BackgroundContainer } from './BackgroundContainer';
import GradientBackground from '../assets/GradientBackground.png';
import { useAuth0 } from '@auth0/auth0-react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import LoadingScreen from './LoadingScreen';

export const AdminPage = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const { name, given_name, picture, email, nickname } = user;
  const [userData, setUserData] = useState(null);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      const auth0Domain = 'pure-and-lazy.au.auth0.com';

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${auth0Domain}/api/v2/`,
          scope: 'read:current_user',
        });
        console.log('got access token');

        const userDetailsByIdUrl = `https://${auth0Domain}/api/v2/users/${user.sub}`;

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
        <>
          <label htmlFor="public-url-form">
            <h4>To get started, please decide on a public facing URL:</h4>
          </label>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="base-url-prepend">
                https://pure-and-lazy.herokuapp.com/u/
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="public-url-form"
              aria-describedby="base-url-prepend"
            />
            <InputGroup.Append>
              <Button variant="primary">Submit</Button>
            </InputGroup.Append>
          </InputGroup>
        </>
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
