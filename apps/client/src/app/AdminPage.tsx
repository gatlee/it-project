import React from 'react';
import { BackgroundContainer } from './BackgroundContainer';
import GradientBackground from '../assets/GradientBackground.png';
import { useAuth0 } from '@auth0/auth0-react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

export const AdminPage = () => {
  const { user } = useAuth0();
  const { name, picture, email, nickname } = user;

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
      <LinkContainer to={`/u/${nickname}`}>
        <Button>Edit Portfolio</Button>
      </LinkContainer>
    </BackgroundContainer>
  );
};

export default AdminPage;
