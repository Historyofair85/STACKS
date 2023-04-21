import React from 'react';
import './styles/styles.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Auth from '../../utils/Auth';


export const Navigation = () => {

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  if (Auth.loggedIn()) {
    const id = Auth.getProfile().data._id;
    return (
      <>
        <Navbar bg="dark" variant="dark" id="nav">
          <Container>
            <Nav className="me-auto">
              <Nav.Link href="/">
                home
              </Nav.Link>
              <Nav.Link onClick={logout}>
                logout
              </Nav.Link>
              <Nav.Link href={`/users/${id}`}>
                profile
              </Nav.Link>
              <Nav.Link href="/search">
                liveblog
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
  // If logged out show login controls
  return (
    <Navbar bg="dark" variant="dark" id="nav">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/">
            home
          </Nav.Link>
          <Nav.Link href="/login">
            login
          </Nav.Link>
          <Nav.Link href="/signup">
            signup
          </Nav.Link>
          <Nav.Link href="/liveblog">
            liveblog
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

