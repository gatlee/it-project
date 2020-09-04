import React from 'react';
import { BackgroundContainer } from './BackgroundContainer';
import GradientBackground from '../assets/GradientBackground.png';

const SignUp = () => {
  return (
    <BackgroundContainer background={GradientBackground}>
      <h1>This will maybe be the sign up page!</h1>
    </BackgroundContainer>
  );
};

export default SignUp;
