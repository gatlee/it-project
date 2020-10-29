import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import BackgroundImage from '../../assets/landscape.png';
import { BackgroundContainer } from '../BackgroundContainer';
import { UserContext } from './UserContext';
import { HomeAvatar } from '../homepage/HomeAvatar';

const PortfolioHome = () => {
  const { name, username, profilePicture } = useContext(UserContext);

  const nameStyle = {
    '@media (max-width: 576px)': {
      fontSize: '4rem',
    },
  };

  return (
    <BackgroundContainer
      background={BackgroundImage}
      style={{
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${BackgroundImage})`,
      }}
    >
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
    </BackgroundContainer>
  );
};

export { PortfolioHome };
