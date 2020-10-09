import React, { useContext } from 'react';
import FooterAdminButton from '../buttons/FooterAdminButton';
import EditThemeButton from '../buttons/EditThemeButton';
import ViewAsButton from '../buttons/ViewAsButton';
import { UserContext } from './UserContext';
import { Container, Col, ButtonToolbar } from 'react-bootstrap';

// Footer displayed on the edit page
const PortfolioEditFooter = () => {
  const { username } = useContext(UserContext);
  const link = `/u/${username}`;

  return (
    <ButtonToolbar className="justify-content-between" as={Container}>
      <Col>
        <span className="float-left">
          <FooterAdminButton />
          <EditThemeButton />
        </span>
      </Col>

      <Col style={{ marginTop: '0.05rem' }}>You are editing this portfolio</Col>

      <Col>
        <span className="float-right">
          <ViewAsButton target={link} content={'View as visitor'} />
        </span>
      </Col>
    </ButtonToolbar>
  );
};

export { PortfolioEditFooter };
