import React, { useEffect, useState } from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';

interface UrlForm {
  onSubmit: (input: string) => void;
  errorMessage: string;
  setErrorMessage(errorMessage: string);
}

// Form Validation reference: https://react-bootstrap.github.io/components/forms/#forms-validation

export const UrlForm = (props: UrlForm) => {
  const [urlPath, setUrlPath] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUrlPath(event.target.value);
    props.setErrorMessage('');
    console.log(urlPath);
  };

  const handleSubmit = async (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    console.log('urlPath:', urlPath);
    props.onSubmit(urlPath);
  };

  useEffect(() => {
    if (props.errorMessage !== '') {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  }, [props.errorMessage]);

  return (
    <>
      <label htmlFor="public-url-form">
        <h4>To get started please decide on a public facing URL:</h4>
      </label>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="base-url-prepend">
              https://pure-and-lazy.herokuapp.com/u/
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            id="public-url-form"
            aria-describedby="base-url-prepend"
            onChange={handleChange}
            isInvalid={isInvalid}
          />
          <InputGroup.Append>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </InputGroup.Append>
          <FormControl.Feedback
            type="invalid"
            tooltip
            style={{ marginLeft: '312px' }}
          >
            {/* styling for this component is forced because I don't know how else */}
            {props.errorMessage}
          </FormControl.Feedback>
        </InputGroup>
      </Form>
    </>
  );
};

export default UrlForm;
