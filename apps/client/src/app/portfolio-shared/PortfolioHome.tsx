import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import BackgroundImage from '../../assets/landscape.png';
import { BackgroundContainer } from '../BackgroundContainer';
import { EditContext } from './EditContext';
import { UserContext } from './UserContext';
import { useAuth0 } from '@auth0/auth0-react';
import { updateProfilePicture } from '../admin/AdminUtils';
import { HomeAvatar } from '../homepage/HomeAvatar';

const DEFAULT_BACKGROUND =
  'https://res.cloudinary.com/pure-and-lazy/image/upload/v1603370613/greybackground_aiad1y.png';

const PortfolioHome = () => {
  const { name, username } = useContext(UserContext);
  const { getAccessTokenSilently } = useAuth0();
  const [image, setImage] = useState('');
  const editMode = useContext(EditContext);

  const nameStyle = {
    '@media (max-width: 576px)': {
      fontSize: '4rem',
    },
  };

  // TODO: How to update the UserContext data? Current is bandaiding

  const loadProfilePicture = useCallback(() => {
    fetch(`/api/portfolio/${username}/profile`)
      .then((r) => r.json())
      .then((r) => setImage(r.profilePicture))
      .catch((e) => {
        console.log(e);
      });
  }, [username]);

  //Update Items on Load
  useEffect(() => {
    loadProfilePicture();
  }, [loadProfilePicture]);

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
      '/c_lfill,h_256,w_256/',
      newImage.slice(secondLastSlash),
    ].join('');

    updateProfilePicture(croppedImage, getAccessTokenSilently).then(
      (response) => {
        if (response.ok) {
          setImage(croppedImage);
        }
        console.log(response);
      }
    );
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
            <HomeAvatar image={image} onImageChange={handleImageChange} />
          </Col>
        </Row>
        <Row>
          <Col className="mx-auto">
            <h1
              className="text-white display-1 mt-5 text-center user-select-none"
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
