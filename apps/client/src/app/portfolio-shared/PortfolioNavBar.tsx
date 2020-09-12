import React, { SyntheticEvent } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useParams } from 'react-router-dom';

const PortfolioNavBar = () => {
  const { id } = useParams();
  const URL_PREFIX = `/u/${id}`;

  const foo = (eventKey: string, event?: SyntheticEvent) => {
    console.log(eventKey, event);
  };
  return (
    <Navbar sticky="top" bg="light" expand="sm" collapseOnSelect onSelect={foo}>
      <LinkContainer to={`${URL_PREFIX}/`}>
        <Navbar.Brand>{id}'s ePortfolio</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Container>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" activeKey="blog">
            <LinkContainer to={`${URL_PREFIX}/portfolio`}>
              <Nav.Link eventKey="/portfolio">Portfolio</Nav.Link>
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
