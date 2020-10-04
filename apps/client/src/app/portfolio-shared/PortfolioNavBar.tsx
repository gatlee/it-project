import { css } from 'emotion';
import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useParams } from 'react-router-dom';
import { EditContext } from './EditContext';
import { UserContext } from './UserContext';

const PortfolioNavBar = () => {
  const { id } = useParams();
  const editMode = useContext(EditContext);
  const { name } = useContext(UserContext);
  const URL_PREFIX = editMode ? `/edit` : `/u/${id}`;
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
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav
          className="ml-auto"
          activeKey="blog"
          css={{
            '& .active': {
              fontWeight: 'bold !important',
            },
          }}
        >
          <LinkContainer to={`${URL_PREFIX}/projects`}>
            <Nav.Link eventKey="/projects" className="mx-2 px-1">
              Projects
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to={`${URL_PREFIX}/blog`}>
            <Nav.Link eventKey="/blog" className="mx-2 px-1">
              Blog
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to={`${URL_PREFIX}/about`}>
            <Nav.Link eventKey="/about" className="mx-2 px-1">
              About
            </Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export { PortfolioNavBar };
