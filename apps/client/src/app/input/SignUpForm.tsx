import React from 'react';
import { Form } from 'react-bootstrap';
import SignUpButton from '../buttons/SignUpButton';

const SignUpForm = () => {
  return (
    <Form>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control placeholder="Enter a username" />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <SignUpButton />
    </Form>
  );
};

export default SignUpForm;
