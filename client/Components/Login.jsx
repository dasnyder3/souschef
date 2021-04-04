import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const Login = () => {
  return (
    <Container stype={{}}>
      <Card
        className='text-center'
        style={{
          width: '200px',
          margin: 'auto',
          marginTop: '25%',
          marginBottom: 'auto',
        }}
      >
        <Card.Header>Sign In</Card.Header>
        <Card.Body>
          <a href='/auth/google'>
            <Button>Login with Google</Button>
          </a>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
