import React, { useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Col } from 'react-bootstrap';
import { AboutDisplay } from './AboutDisplay';
import { AboutEditor } from './AboutEditor';
import { updateDescription } from '../../admin/AdminUtils';
import { UserContext } from '../UserContext';
import { BackgroundContainer } from '../../BackgroundContainer';
import BackgroundImage from '../../../assets/landscape.png';
import { HomeAvatar } from '../../homepage/HomeAvatar';

const About = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [editorOpen, setEditorOpen] = useState(false);
  const { description, setDescription, profilePicture } = useContext(
    UserContext
  );

  const containerStyle = {
    backgroundColor: 'white',
    overflow: 'auto',
  };

  const [editorSaveButtonDisabled, setSaveButtonDisabled] = useState(false);

  const handleCancel = () => {
    setEditorOpen(false);
  };
  const handleOpenEditor = () => {
    setEditorOpen(true);
  };

  const handleSave = async (newDescription: string) => {
    setSaveButtonDisabled(true);
    try {
      await updateDescription(newDescription, getAccessTokenSilently);
    } catch (e) {
      console.log(e);
    }
    setEditorOpen(false);
    setSaveButtonDisabled(false);
    setDescription(newDescription);
  };

  return (
    <BackgroundContainer
      background={BackgroundImage}
      style={{
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${BackgroundImage})`,
      }}
    >
      <Container>
        <Col sm={3}>
          <HomeAvatar image={profilePicture} />
        </Col>
        <Col sm={8}>
          <Container className="my-3 p-4" style={containerStyle}>
            <AboutEditor
              initialDescription={description}
              editorSaveButtonDisabled={editorSaveButtonDisabled}
              onCancel={handleCancel}
              onSave={handleSave}
              show={editorOpen}
            />
            <AboutDisplay
              description={description}
              onOpenEditor={handleOpenEditor}
            />
          </Container>
        </Col>
      </Container>
    </BackgroundContainer>
  );
};

export { About };
