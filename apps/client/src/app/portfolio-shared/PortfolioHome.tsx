import { useAuth0 } from '@auth0/auth0-react';
import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { updateProfilePicture } from '../admin/AdminUtils';
import { HomeAvatar } from '../homepage/HomeAvatar';
import { AVATAR_WIDTH } from '../homepage/HomeConstants';
import { ThemedBackgroundContainer } from './ThemedBackgroundContainer';
import { UserContext } from './UserContext';

const PortfolioHome = () => {
  const { name, username, profilePicture, setProfilePicture } = useContext(
    UserContext
  );
  const { getAccessTokenSilently } = useAuth0();

  const nameStyle = {
    '@media (max-width: 576px)': {
      fontSize: '4rem',
    },
  };

  const handleImageChange = async (newImage: string) => {
    // Crop image using Cloudinary Transformations before setting it
    // Do note: It's quite powerful, there are transformations where it
    // finds your face and crops it
    //
    // For now now just getting it rudimentary, I do not want to deal with the library this late
    const secondLastSlash = newImage.lastIndexOf(
      '/',
      newImage.lastIndexOf('/') - 1
    );

    const croppedImage = [
      newImage.slice(0, secondLastSlash),
      `/c_lfill,h_${AVATAR_WIDTH},w_${AVATAR_WIDTH}/`,
      newImage.slice(secondLastSlash),
    ].join('');

    updateProfilePicture(croppedImage, getAccessTokenSilently).then(
      (response) => {
        if (response.ok) {
          setProfilePicture(croppedImage);
        }
        console.log(response);
      }
    );
  };

  return (
    <ThemedBackgroundContainer>
      <Container>
        <Row className="mt-5 mh-40">
          <Col className="mx-auto text-center" sm={10} lg={6}>
            <HomeAvatar
              image={profilePicture}
              onImageChange={handleImageChange}
            />
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
