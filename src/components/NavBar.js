import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { setActiveEndpoint } from '../store/actions';

const endpoints = [
  { path: '/chat', name: 'Chat' },
  { path: '/image-generation', name: 'Image Generation' },
  { path: '/image-editing', name: 'Image Editing' },
  { path: '/speech-to-text', name: 'Speech to Text' },
  { path: '/text-to-speech', name: 'Text to Speech' },
  { path: '/video-to-text', name: 'Video to Text' }
];

const NavBar = () => {
  const dispatch = useDispatch();

  const handleNavClick = (endpoint) => {
    dispatch(setActiveEndpoint(endpoint));
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Sar~AI</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {endpoints.map((endpoint) => (
              <Nav.Link
                key={endpoint.path}
                as={NavLink}
                to={endpoint.path}
                onClick={() => handleNavClick(endpoint.name)}
              >
                {endpoint.name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;