import React from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

interface UrlForm {
  handleSubmit: () => void;
}

export const UrlForm = (props: UrlForm) => {
  return (
    <>
      <label htmlFor="public-url-form">
        <h4>To get started please decide on a public facing URL:</h4>
      </label>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="base-url-prepend">
            https://pure-and-lazy.herokuapp.com/u/
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl id="public-url-form" aria-describedby="base-url-prepend" />
        <InputGroup.Append>
          <Button variant="primary" onClick={() => props.handleSubmit()}>Submit</Button>
        </InputGroup.Append>
      </InputGroup>
    </>
  );
};

export default UrlForm;
