import { css } from 'emotion';
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { CenteredRowContent } from '../layout/CenteredRowContent';
import { ClockFill } from 'react-bootstrap-icons';
import { ThemedBackgroundContainer } from '../portfolio-shared/ThemedBackgroundContainer';

interface ContentHeader {
  title: string;
  image?: string;
  subtitle?: string;
  date?: string;
}

const ContentHeader = (props: ContentHeader) => {
  return (
    <ThemedBackgroundContainer>
      <Container fluid>
        <Container>
          <Row>
            <h1 className="text-white mt-5 mx-3 display-3 text-center w-100">
              {props.title}
            </h1>
          </Row>
          <Row>
            <h4 className="text-light my-5 mx-3 text-center   w-100">
              <em>{props.subtitle}</em>
            </h4>
          </Row>
          <Row>
            <CenteredRowContent>
              <h6 className="text-light my-2 mx-3">
                {props.date && (
                  <>
                    <ClockFill />
                    {'  '}
                    {props.date}
                  </>
                )}
              </h6>
            </CenteredRowContent>
          </Row>
        </Container>
      </Container>
    </ThemedBackgroundContainer>
  );
};

export { ContentHeader };
