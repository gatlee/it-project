import React, { useContext, useState } from 'react';
import { Col, Container, Row, Image } from 'react-bootstrap';
import BackgroundImage from '../../assets/landscape.png';
import { BackgroundContainer } from '../BackgroundContainer';
import { EditContext } from './EditContext';
import { UserContext } from './UserContext';
import { ProjectItemImage } from '../projects/editor/ProjectItemImage';

const DEFAULT_BACKGROUND =
  'https://res.cloudinary.com/pure-and-lazy/image/upload/v1603370613/greybackground_aiad1y.png';

const PortfolioHome = () => {
  const { name, username, profilePicture } = useContext(UserContext);
  const [image, setImage] = useState(profilePicture);
  const editMode = useContext(EditContext);

  const nameStyle = {
    '@media (max-width: 576px)': {
      fontSize: '4rem',
    },
  };

  const handleImageChange = (newImage: string) => {
    // Crop image using Cloudinary Transformations before setting it
    // Do note: It's quite powerful, there are transformations where it
    // finds your face and crops it
    //
    // For now now just getting it rudimentary, I do not want to deal with the library this late
    const secondLastSlash = newImage.lastIndexOf(
      '/',
      newImage.lastIndexOf('/') - 1
    );

    setImage(
      [
        newImage.slice(0, secondLastSlash),
        '/c_lfill,h_500,w_500/',
        newImage.slice(secondLastSlash),
      ].join('')
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
          <Col className="mx-auto text-center" sm={10} md={6} lg={4}>
            {editMode ? (
              <ProjectItemImage
                image={image || DEFAULT_BACKGROUND}
                onImageChange={handleImageChange}
                avatar={true}
              />
            ) : (
              <Image
                fluid
                className="shadow-lg"
                src={image || DEFAULT_BACKGROUND}
                roundedCircle
              />
            )}
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
