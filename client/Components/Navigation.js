import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';

const Navigation = ({ user }) => (
  <Navbar bg='primary' variant='dark'>
    <Navbar.Brand href='/'>Sous-chef</Navbar.Brand>
    <Nav className='ml-auto'>
      {/* <Image src={user.picture} roundedCircle /> */}
      <NavDropdown title='Account' alignRight>
        <NavDropdown.Item href='/login'>Login</NavDropdown.Item>
        <NavDropdown.Item href='/logout'>Logout</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar>
);

export default Navigation;
