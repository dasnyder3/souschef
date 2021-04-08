import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';

const Navigation = ({ user }) => (
  <Navbar bg='primary' variant='dark' style={{ height: '3.5rem' }}>
    <Navbar.Brand href='/'>Sous-chef</Navbar.Brand>
    <Nav className='ml-auto' style={{ height: '100%' }}>
      <Image
        src={user.picture}
        style={{ maxHeight: '100%', width: 'auto' }}
        roundedCircle
      />
      <NavDropdown alignRight>
        <NavDropdown.Item href='/login'>Login</NavDropdown.Item>
        <NavDropdown.Item href='/logout'>Logout</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar>
);

export default Navigation;
