import { css } from 'emotion';
import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useParams } from 'react-router-dom';
import { EditContext } from './EditContext';
import { useAuth0 } from '@auth0/auth0-react';

const PortfolioNavBar = () => {
  const { id } = useParams();
  const { user } = useAuth0();
  const editMode = useContext(EditContext);
  const URL_PREFIX = editMode ? `/edit` : `/u/${id}`;
  const name = editMode ? user.nickname : id;
  const logoStyle = css`
    position: relative;
    @media (min-width: 576px) {
      position: absolute;
    }
  `;

  return (
    <Navbar
      sticky="top"
      bg="dark"
      variant="dark"
      expand="sm"
      collapseOnSelect
      className="shadow"
    >
      <LinkContainer
        to={`${URL_PREFIX}/`}
        className={css`
          ${logoStyle}
        `}
      >
        <Navbar.Brand>{name}</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Container>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto" activeKey="blog">
            <LinkContainer to={`${URL_PREFIX}/projects`}>
              <Nav.Link eventKey="/projects">Projects</Nav.Link>
            </LinkContainer>
            <LinkContainer to={`${URL_PREFIX}/blog`}>
              <Nav.Link eventKey="/blog">Blog</Nav.Link>
            </LinkContainer>
            <LinkContainer to={`${URL_PREFIX}/about`}>
              <Nav.Link eventKey="/about">About</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export { PortfolioNavBar };
