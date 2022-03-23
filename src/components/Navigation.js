import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Alert,
} from 'reactstrap'
import "./css/Navigation.css"
// Import components:
import EmployeeTable from './Tables/EmployeeTables'
import LoginForm from './Forms/LoginForm'
import RegisterForm from './Forms/RegisterForm'
import Loader from './Loader'

const BASE_URL = process.env.REACT_APP_SERVER_URL
const Navigation = () => {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  const [isLoading, setIsLoading] = useState(true) //for loading message
  //login state
  const [isLoggedIn, setIsLoggedIn] = useState(
    // In session/local storage, all values are of type string
    sessionStorage.getItem('isLoggedIn') === 'true' || false
  )
    //for error message when fetch data
  const [fetchError, setFetchError] = useState(false)
  const [unknownError, setUnknownError] = useState(false)
  
  //change login state and store token
  const login = () => {
    setIsLoggedIn(true)
    sessionStorage.setItem('isLoggedIn', true)
    setIsLoading(false)
  }

  //logout function
  const logout = () => {
    axios
      .get(`${BASE_URL}/api/logout`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(false)
          sessionStorage.clear() // Clear all items in session storage
          alert('Logged out.') // Debugging purposes
        }
      })
  }

  //to get sub url form each sub component
  const [subUrl, setSubUrl] = useState()
  const addSubUrl = (suburl) => {
    setSubUrl(suburl)
  }

  //sent get request
  const getItems = () => {
    setFetchError(false)
    setUnknownError(false)

    axios
      .get(`${BASE_URL}/${subUrl}`)
      .then((response) => {
        setItems(response.data.data)
        //logic check to avoid error which may happend when call pagination
        setIsLoading(false)
      })
      .catch((err) => {
        if (err.response.status && err.response.status === 401) {
          setFetchError(true)
        } else {
          setUnknownError(true)
        }
      })
  }

  //watch suburl,when it changes will call fetch funciton rerender the page
  useEffect(() => {
    if (subUrl) {
      getItems()
    }
  }, [subUrl])

 //when create a new item in each component will store the data
 const addItemToState = (item) => {
  setItems([...items, item])
}
  //change the status of edit and place them at the same order
  const updateState = (item) => {
    //get index of table on the list
    const itemIndex = items.findIndex((data) => data.id === item.id)
    const newArray = [
      ...items.slice(0, itemIndex),
      item,
      ...items.slice(itemIndex + 1),
    ]
    setItems(newArray)
  }

   //change the status of delete
   const deleteItemFromState = (id) => {
    const updatedItems = items.filter((item) => item.id !== id)
    setItems(updatedItems)
  }
  //for delte a single item from a single table
  const deleteItem = (id, subUrl) => {
    let confirmDelete = window.confirm('Delete item forever?')
    if (confirmDelete) {
      axios
        .delete(`${BASE_URL}/${subUrl}/${id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        })
        .then((response) => {
          if (response.status === 201) {
            deleteItemFromState(id)
          }
        })
        .catch((err) => console.log(err))
    }
  }

  //authlink will check if it logged in, if not loggin will display 'login' and 'register' tags on nav
  const authLink = isLoggedIn ? (
    <>
      <NavItem>
        <NavLink onClick={logout} style={{ cursor: 'pointer' }}>
          Logout
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href='/employess'>Employees</NavLink>
      </NavItem>
    </>
  ) : (
    <>
      <NavItem>
        <NavLink href='/login'>Login</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href='/register'>Register</NavLink>
      </NavItem>
    </>
  )
  //custmise props will pass them to each component
  const customProps = {
    items: items,
    BASE_URL: BASE_URL,
    addSubUrl: addSubUrl,
    updateState: updateState,
    addItemToState: addItemToState,
    deleteItemFromState: deleteItemFromState,
    deleteItem: deleteItem,
    isLoading: isLoading,
  }

  return (
    <Router>
      <Navbar color='dark' dark expand='md'>
        <NavbarBrand style={{ marginLeft: '20px' }} href='/'>
          HR Management System
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            {authLink}
          </Nav>
        </Collapse>
      </Navbar>
      <Container>
        <Switch>
          {isLoggedIn ? (
            <>
              <Route
                exact
                path={['/employee', '/employee/:id']}
                render={() => <EmployeeTable {...customProps} />}
              />

              {!subUrl && !isLoading && (
                <h2
                  style={{
                    marginTop: '150px',
                    textAlign: 'center',
                  }}
                >
                  Welcome to HR Management system !{' '}
                </h2>
              )}
              {/* render loader component */}
              {subUrl && isLoading && (
                <h4>
                  <Loader />
                </h4>
              )}
              {subUrl && !isLoading && (
                <div>
                  {unknownError ? (
                    <Alert color='danger'>There was a unknown problem.</Alert>
                  ) : null}
                </div>
              )}
            </>
          ) : (
            <>
              <Route
                exact
                path={['/', '/login']}
                render={() => <LoginForm login={login} BASE_URL={BASE_URL} />}
              />
              <Route
                exact
                path='/register'
                render={() => <RegisterForm BASE_URL={BASE_URL} />}
              />
            </>
          )}
        </Switch>
      </Container>
    </Router>
  )
}

export default Navigation
