import React, { useState } from 'react'
import {
  Collapse,
  Navbar,
  Link,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'
import "./Navigation.css"

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('delete', 'true');
  }

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/employees" className="NavbarBrand">HR Management System</NavbarBrand>
      <Collapse isOpen={isOpen} navbar>
        <Nav className="parent" navbar>
          {props.loggedIn ? (
          <NavItem >
            <NavLink href="/login" className="logout" onClick={logout}>Logout</NavLink>
          </NavItem>
          ) : null }
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default Navigation
