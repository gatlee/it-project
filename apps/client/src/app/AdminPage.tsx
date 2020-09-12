import React, { useState } from 'react';
import { BackgroundContainer } from './BackgroundContainer';
import GradientBackground from '../assets/GradientBackground.png';
import { useAuth0 } from '@auth0/auth0-react';

export const AdminPage = () => {
  const apiUrl = 'localhost:3001/api';
  const { user, getAccessTokenSilently } = useAuth0();
  // getAccessTokenSilently is for retrieving the signed in user's token
  const { name, picture, email } = user;
  const [data, setData] = useState();

  const callApi = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${apiUrl}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      setData(error.message);
    }
  };

  return (
    <BackgroundContainer
      background={GradientBackground}
      style={{ textAlign: 'center' }}
    >
      <img src={picture} alt="Profile" style={{ maxWidth: '100px' }} />
      <h2>{name}</h2>
      <p>{email}</p>
      <h4>Other User Content:</h4>
      <p>{JSON.stringify(user, null, 2)}</p>
    </BackgroundContainer>
  );
};

export default AdminPage;
