import React from 'react';
import { BackgroundContainer } from './BackgroundContainer';
import GradientBackground from '../assets/GradientBackground.png';
import SignUpForm from './input/SignUpForm';

const SignUp = () => {
  return (
    <BackgroundContainer
      background={GradientBackground}
      style={{ textAlign: 'center' }}
    >
      <SignUpForm />
    </BackgroundContainer>
  );
};

export default SignUp;
