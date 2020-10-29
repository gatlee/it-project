import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { UserContext } from './UserContext';
import { HomeAvatar } from '../homepage/HomeAvatar';
import { ThemedBackgroundContainer } from './ThemedBackgroundContainer';

const PortfolioHome = () => {
  const { name, username, profilePicture } = useContext(UserContext);

  const nameStyle = {
    '@media (max-width: 576px)': {
      fontSize: '4rem',
    },
  };

  return (
    <ThemedBackgroundContainer>
      <Container>
        <Row className="mt-5 mh-40">
          <Col className="mx-auto text-center" sm={10} lg={6}>
            <HomeAvatar image={profilePicture} />
          </Col>
        </Row>
        <Row>
          <Col className="mx-auto">
            <h1
              className="text-white display-1 mt-5 text-center"
              css={nameStyle}
            >
              {name || username}
            </h1>
          </Col>
        </Row>
      </Container>
    </ThemedBackgroundContainer>
  );
};

export { PortfolioHome };
