import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

const PortfolioNavBar = () => {
  return (
    <Navbar sticky="top" bg="light" expand="sm" collapseOnSelect>
      <Navbar.Brand>ePortfolio</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>Portfolio</Nav.Link>
          <Nav.Link>Blog</Nav.Link>
          <Nav.Link>About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export { PortfolioNavBar };
