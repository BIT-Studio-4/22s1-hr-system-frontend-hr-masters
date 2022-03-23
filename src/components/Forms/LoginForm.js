/* this is login form
 *   provide loading button and error message
 */
import axios from 'axios'
import { Button, Form, FormGroup, Input, Alert, Col } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import React, { useState } from 'react'

const LoginForm = (props) => {
  const BASE_URL = props.BASE_URL
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isHome, setIsHome] = useState(false)
  const [authError, setAuthError] = useState(false) // Used for authentication errors
  const [unknownError, setUnknownError] = useState(false) // Used for network errors
  const [isLoading, setIsLoading] = useState(false) //for loading message

  //login function will sent a post reqest to server
  const handleSubmit = (e) => {
    e.preventDefault()
    setAuthError(false)
    setUnknownError(false)
    setIsLoading(true)

    axios.get(`${BASE_URL}/sanctum/csrf-cookie`).then((_) => {
      axios
        .post(`${BASE_URL}/api/v1/login`, {
          email: email,
          password: password,
        })
        .then((response) => {
          if (response.status === 201) {
            props.login()
            setIsHome(true)
            // Set a new item called token in session storage. You will send
            // it in the request header later on
            sessionStorage.setItem('token', response.data.token)
          }
        })
        .catch((error) => {
          // Authentication error as specified in your Laravel API application
          if (error.response.status === 401) {
            setAuthError(true)
            setIsLoading(false)
          } else {
            setUnknownError(true)
            setIsLoading(false)
          }
        })
    })
  }

  //redirect to home page if log it  in
  if (isHome === true) {
    return <Redirect to='/' />
  }

  return (
    <>
      <Col sm={{ size: 5, offset: 3 }}>
        <h1 style={{ marginTop: '10px' }} className='text-center'>
          Login
        </h1>
      </Col>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Col sm={{ size: 5, offset: 3 }}>
            <Input
              type='email'
              name='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={{ size: 5, offset: 3 }} className='mt-2'>
            <Input
              type='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Col>
        </FormGroup>
        {authError ? (
          <Alert color='danger'>
            Cannot recognize your credentials. Please try again.
          </Alert>
        ) : null}
        {unknownError ? (
          <Alert color='danger'>
            There was a problem submitting your credentials.
          </Alert>
        ) : null}
        {/* loding button */}
        <Col sm={{ offset: 3 }}>
          {!isLoading && <Button className='mt-2'>Submit</Button>}
          {isLoading && <Button className='mt-2'>Loading...</Button>}
        </Col>
      </Form>
    </>
  )
}

export default LoginForm
