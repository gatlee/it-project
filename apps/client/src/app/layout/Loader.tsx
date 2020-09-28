import React from 'react';
import { Row, Spinner } from 'react-bootstrap';
import { CenteredRowContent } from './CenteredRowContent';

interface Loader {
  loaded: boolean;
  children: React.ReactNode;
}

//Shows loader until prop is changed
const Loader = (props: Loader) => {
  const spinner = (
    <Row className="align-tiems-center mt-5">
      <CenteredRowContent>
        <Spinner animation="grow" variant="primary" />
      </CenteredRowContent>
    </Row>
  );

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return props.loaded ? <>{props.children}</> : spinner;
};

export { Loader };
