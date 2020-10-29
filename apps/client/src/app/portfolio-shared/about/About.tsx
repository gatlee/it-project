import React, { useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Col, Row } from 'react-bootstrap';
import { AboutDisplay } from './AboutDisplay';
import { AboutEditor } from './AboutEditor';
import { updateDescription } from '../../admin/AdminUtils';
import { UserContext } from '../UserContext';
import { HomeAvatar } from '../../homepage/HomeAvatar';
import { ThemedBackgroundContainer } from '../ThemedBackgroundContainer';
import { css } from '@emotion/core';

const About = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [editorOpen, setEditorOpen] = useState(false);
  const { description, setDescription, profilePicture } = useContext(
    UserContext
  );

  const containerStyle = {
    backgroundColor: 'white',
    overflow: 'auto',
    height: '100%',
  };

  const profilePictureStyle = {
    marginTop: '18%',
    '@media (max-width: 576px)': {
      marginTop: '0%',
    },
  };

  const descriptionStyle = {
    marginTop: '18%',
    paddingBottom: '120px',
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
    <ThemedBackgroundContainer>
      <Container className="pt-5">
        <Row>
          <Col sm={4} xs={12} className="pr-sm-5" css={profilePictureStyle}>
            <HomeAvatar image={profilePicture} />
          </Col>
          <Col sm={8} xs={12} className="pl-sm-5" css={descriptionStyle}>
            <Container className="p-4 mx-auto" style={containerStyle}>
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
        </Row>
      </Container>
    </ThemedBackgroundContainer>
  );
};

export { About };
