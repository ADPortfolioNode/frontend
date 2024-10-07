import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { setActiveEndpoint } from '../store/actions';
import axios from 'axios';

const NavBar = () => {
  const [endpoints, setEndpoints] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEndpoints = async () => {
      try {
        const response = await axios.get('./data/endpoints.json');
        setEndpoints(response.data['openai_api_endpoints']);
      } catch (error) {
        console.error('Error fetching endpoints:', error);
      }
    };

    fetchEndpoints();
  }, []);

  const handleNavClick = (endpoint) => {
    dispatch(setActiveEndpoint(endpoint));
  };

  const categorizeEndpoints = (endpoints) => {
    const categories = {};
    endpoints.forEach((endpoint) => {
      const category = endpoint.category || 'Uncategorized';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(endpoint);
    });
    return categories;
  };

  const categorizedEndpoints = categorizeEndpoints(endpoints);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Sar~AI</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {Object.keys(categorizedEndpoints).map((category) => (
              <NavDropdown title={category} id={`nav-dropdown-${category}`} key={category}>
                {categorizedEndpoints[category].map((endpoint) => (
                  <NavDropdown.Item
                    key={endpoint.path}
                    as={NavLink}
                    to={endpoint.path}
                    onClick={() => handleNavClick(endpoint.name)}
                  >
                    {endpoint.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;