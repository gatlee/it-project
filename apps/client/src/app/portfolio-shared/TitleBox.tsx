import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { ThemedBackgroundContainer } from './ThemedBackgroundContainer';

interface TitleBox {
  title: string;
  subtitle?: string;
}

// Pretty box with title and subheading
const TitleBox = (props: TitleBox) => {
  const style = {
    backgroundPosition: 'center',
    width: '100%',
    height: 'auto',
    backgroundSize: 'cover',
  };

  return (
    <ThemedBackgroundContainer style={style}>
      <Container fluid>
        <Container>
          <Row>
            <h1 className="text-white mt-5 mx-3 display-3  text-lg-left text-center w-100">
              {props.title}
            </h1>
          </Row>
          <Row>
            <h4 className="text-light my-5 mx-3 text-lg-left text-center   w-100">
              <em>{props.subtitle}</em>
            </h4>
          </Row>
        </Container>
      </Container>
    </ThemedBackgroundContainer>
  );
};

export { TitleBox };
