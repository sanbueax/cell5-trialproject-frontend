/* eslint-disable jsx-a11y/aria-props */
import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import UserContext from '../UserContext';

export default function NavBar() {
    const { user } = useContext(UserContext)

	return(
      <Navbar>
        <Navbar.Brand href="/">iTravel Philippines</Navbar.Brand>
        <Navbar.Toggle aria-control="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/explore">Explore</Nav.Link>
            {user.email 
            ? <React.Fragment>
              <Nav.Link href="/register">Add User</Nav.Link>
              <Nav.Link href="/logout">Logout</Nav.Link>
              </React.Fragment>
            : <Nav.Link href="/login">Login</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>        
      </Navbar>
	)
}