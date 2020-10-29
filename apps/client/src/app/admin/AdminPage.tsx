import React, { useContext } from 'react';
import { BackgroundContainer } from '../BackgroundContainer';
import GradientBackground from '../../assets/GradientBackground.png';
import { Container, Row, Col } from 'react-bootstrap';
import { AdminLink } from './AdminLink';
import { AdminTitle } from './AdminTitle';
import { AdminSignOut } from './AdminSignOut';
import { AuthContext } from '../auth/AuthContext';
import { UserContext } from '../portfolio-shared/UserContext';
import { Redirect } from 'react-router-dom';

const AdminPage = () => {
  const { name, username } = useContext(UserContext);
  const { registrationComplete, isLoaded } = useContext(AuthContext);

  if (!isLoaded) {
    return null;
  }

  if (!registrationComplete) {
    return <Redirect to="/getstarted" />;
  }

  const topMarginStyle = {
    marginTop: '22vh',
  };

  return (
    <BackgroundContainer background={GradientBackground}>
      <div className="m-3 text-right">
        <AdminSignOut />
      </div>
      <Container>
        <Row css={topMarginStyle}></Row>
        <Row className="mb-3">
          <Col>
            <AdminTitle
              title={`Welcome back, ${name}`}
              subtitle="What would you like to do today?"
            />
          </Col>
        </Row>
        <Row className="mb-1">
          <Col>
            <AdminLink to={`/edit`} label="Edit Portfolio" />
          </Col>
        </Row>
        <Row className="mb-1">
          <Col>
            <AdminLink to={`/u/${username}`} label="View Portfolio" />
          </Col>
        </Row>
        <Row className="mb-1">
          <Col>
            <AdminLink to={`/admin/manage`} label="Manage Public Information" />
          </Col>
        </Row>
      </Container>
    </BackgroundContainer>
  );
};

export default AdminPage;
