import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faLock } from '@fortawesome/free-solid-svg-icons';

interface PrivacyIcon {
  hidden?: boolean;
}

const PrivacyIcon = (props: PrivacyIcon) => {
  if (props.hidden) {
    return null;
  }

  const tooltip = (
    <Tooltip id="button-tooltip">
      <FontAwesomeIcon icon={faInfoCircle} /> Only visible to you
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 100, hide: 100 }}
      overlay={tooltip}
    >
      <FontAwesomeIcon icon={faLock} />
    </OverlayTrigger>
  );
};

export { PrivacyIcon };
