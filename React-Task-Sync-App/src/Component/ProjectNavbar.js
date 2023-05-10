import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
function ProjectNavbar() {
  return (
    <Navbar className='sidebar' variant="light">
        <Container>
          <Navbar.Brand href="#home">Bootstart</Navbar.Brand>
          <Nav className="me-right">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#home">SignOut</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default ProjectNavbar