import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Navbar, Nav, Container } from 'react-bootstrap';
import LoginForm from './LoginForm';
import { colors } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: '#6C63FF', // Change the color here
  },
}));

const First = () => {
  const classes = useStyles();

  return (
    <div>
      <Navbar variant="dark" className={classes.navbar}>
        <Container>
          <Navbar.Brand href="#home">Task-Sync</Navbar.Brand>
          <Nav className="me-right">
            <Nav.Link href="#home" >Home</Nav.Link>
            <Nav.Link href="#About us">About Us</Nav.Link>
            <Nav.Link href="#Explore">Explore</Nav.Link>
            <Nav.Link href="#Register">Register</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <LoginForm />
    </div>
  );
};

export default First;
