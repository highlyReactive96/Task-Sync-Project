import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const useStyles = makeStyles((theme) => ({

    navbar1: {
        backgroundColor: '#6C63FF',
      },

    root: {
    flexGrow: 1,
    padding: theme.spacing(4),
    textAlign: 'center',
  },
  title: {
    marginBottom: theme.spacing(4),
    '& span': {
      animation: '$blink 1s infinite',
    }
},
  button: {
    marginTop: theme.spacing(4),
    '&:hover': {
      backgroundColor: '#6C63FF', // Change the hover color here
      color: '#FFF',
    },
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    marginBottom: theme.spacing(4),
    '&:hover': {
      transform: 'scale(1.1)', // Change the hover effect here
      transition: 'transform .2s ease-out',
    },
  },
  text: {
    marginBottom: theme.spacing(4),
    fontWeight: 'bold',
    color: '#6C63FF', // Change the text color here
    '& span': {
      color: '#000',
    }
  },
}));

const HomePage = () => {
  const classes = useStyles();
  

  return (
    <div className={classes.root}>
        <Navbar style={{color:'black'}} variant="dark" className={`${classes.navbar1} bg-info`}>

        <Container >
          <Navbar.Brand href="#home" variant='h2' component='h1' style={{color:'gold'}}><h2>Task-Sync</h2></Navbar.Brand>
          <Nav className="me-right" >
          <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#About us">About Us</Nav.Link>
            <Nav.Link href="#Explore">Explore</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
        </Container>
   
        </Navbar>
        <Typography variant="h3" component="h3" className={classes.title}>
        Welcome <br />
        to <br />
        <span>Task Synk- A project Management System</span>
      </Typography>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12} md={6}>
          <img className={classes.image} src={"/Images/project11.jpg"} alt="Project Management" />
          <Typography variant="body1" className={classes.text}>
            Click on me to learn more about project management!
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <img className={classes.image} src={"/Images/project22.jpg"} alt="Project Workspace" />
          <Typography variant="body1" className={classes.text}>
            Click on me to learn more about project workspaces!
          </Typography>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" className={classes.button} component={Link} to="/login">
        Get Started
      </Button>
      
    </div>
  );
};

export default HomePage;
