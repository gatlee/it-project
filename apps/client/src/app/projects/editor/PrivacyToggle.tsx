import React from 'react';
import { ToggleButton, ButtonGroup } from 'react-bootstrap';

interface PrivacyToggle {
  isPublic: boolean;
  onPublicChange: (newIsPublic: boolean) => void;
}

const PrivacyToggle = (props: PrivacyToggle) => {
  return (
    <ButtonGroup toggle>
      <ToggleButton
        type="radio"
        value="Public"
        checked={props.isPublic}
        onChange={() => props.onPublicChange(true)}
        variant="secondary"
      >
        Public
      </ToggleButton>
      <ToggleButton
        type="radio"
        value="Private"
        checked={!props.isPublic}
        onChange={() => props.onPublicChange(false)}
        variant="secondary"
      >
        Private
      </ToggleButton>
    </ButtonGroup>
  );
};

export { PrivacyToggle };
