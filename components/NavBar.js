/* eslint-disable jsx-a11y/aria-props */
// import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
// import UserContext from '../UserContext';

export default function NavBar() {
    // const user = useContext(UserContext)

	return(
      <Navbar className="bgcolor" bg="light" expand="lg" fixed="top">
        <Navbar.Brand href="/">iTravel Philippines</Navbar.Brand>
        <Navbar.Toggle aria-control="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/explore">Explore</Nav.Link>
          </Nav>
        </Navbar.Collapse>        
      </Navbar>
	)
}