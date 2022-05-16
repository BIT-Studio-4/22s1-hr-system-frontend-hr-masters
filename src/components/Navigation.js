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
        <Nav navbar className='parent'>
          {props.loggedIn ? (
          <>
          <NavItem>
            <NavLink className="departments" href="/departments">Departments
            </NavLink>
          </NavItem>
          <NavItem className="logout">
            <NavLink href="/login" onClick={logout}>Logout</NavLink>
          </NavItem>
          </>
          ) : null }
        </Nav>
    </Navbar>
  )
}

export default Navigation
