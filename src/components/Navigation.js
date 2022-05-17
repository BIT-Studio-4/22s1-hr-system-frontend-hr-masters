import React from 'react'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'
import "./css/Navigation.css"

const Navigation = (props) => {

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('delete', 'true');
  }

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/employees" className="NavbarBrand">HR Management System</NavbarBrand>
        <Nav className="parent" navbar>
          {props.loggedIn ? (
          <NavItem >
            <NavLink href="/login" className="logout" onClick={logout}>Logout</NavLink>
          </NavItem>
          ) : null }
        </Nav>
    </Navbar>
  )
}

export default Navigation
