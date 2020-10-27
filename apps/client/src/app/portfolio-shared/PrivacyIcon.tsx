import React from 'react';
import { Lock } from 'react-bootstrap-icons';

interface PrivacyIcon {
  hidden?: boolean;
}

const PrivacyIcon = (props: PrivacyIcon) => {
  return props.hidden ? null : <Lock />;
};

export { PrivacyIcon };
