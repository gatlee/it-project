import React from 'react';
import { Form, Col } from 'react-bootstrap';
import SignUpButton from '../buttons/SignUpButton';

const SignUpForm = () => {
  return (
    <Form>
      <Col md={{ span: 4, offset: 4 }}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder="Username" />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <SignUpButton />
      </Col>
    </Form>
  );
};

export default SignUpForm;
