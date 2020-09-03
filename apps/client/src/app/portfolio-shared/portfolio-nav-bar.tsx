import React, { SyntheticEvent } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';

const PortfolioNavBar = () => {
  const foo = (eventKey: string, event?: SyntheticEvent) => {
    console.log(eventKey, event);
  };
  return (
    <Navbar sticky="top" bg="light" expand="sm" collapseOnSelect onSelect={foo}>
      <Navbar.Brand>ePortfolio</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Container>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" activeKey="blog">
            <Nav.Link eventKey="portfolio">Portfolio</Nav.Link>
            <Nav.Link eventKey="blog">Blog</Nav.Link>
            <Nav.Link eventKey="about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export { PortfolioNavBar };
