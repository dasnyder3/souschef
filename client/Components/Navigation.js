import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavDropdown } from 'react-bootstrap';

const Navigation = () => (
  <Navbar bg='primary'>
    <Navbar.Brand href='/'>Sous-chef</Navbar.Brand>
    <Nav className='ml-auto'>
      <NavDropdown title='Account'>
        <NavDropdown.Item href='/login'>Login</NavDropdown.Item>
        <NavDropdown.Item href='/logout'>Logout</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar>
);

export default Navigation;
