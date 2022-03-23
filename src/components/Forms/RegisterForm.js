/* this is register form
 *  provide loading button and error message
 */
import axios from 'axios'
import { Button, Form, FormGroup, Input, Alert, Col } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import React, { useState } from 'react'

const RegisterForm = (props) => {
  const BASE_URL = props.BASE_URL
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPassword_confirmation] = useState('')
  const [isHome, setIsHome] = useState(false)
  const [authError, setAuthError] = useState(false) // Used for authentication errors
  const [unknownError, setUnknownError] = useState(false) // Used for network errors
  const [isLoading, setIsLoading] = useState(false) //for loading message

  //register function will sent a post reqest to server
  const handleSubmit = (e) => {
    e.preventDefault()

    setAuthError(false)
    setUnknownError(false)
    setIsLoading(true)

    axios.get(`${BASE_URL}/sanctum/csrf-cookie`).then((_) => {
      axios
        .post(`${BASE_URL}/api/v1/register`, {
          name: name,
          email: email,
          password: password,
          password_confirmation: password_confirmation,
        })
        .then((response) => {
          if (response.status === 201) {
            alert('User created successfully.')
            setIsHome(true)
          }
        })
        .catch((error) => {
          // Authentication error as specified in your Laravel API application
          if (error.response.status === 422) {
            setAuthError(true)
            setIsLoading(false)
          } else {
            setUnknownError(true)
            setIsLoading(false)
          }
        })
    })
  }

  //redirect to home page if create a new user
  if (isHome === true) {
    return <Redirect to='/' />
  }

  return (
    <>
      <Col sm={{ size: 5, offset: 3 }}>
        <h1 style={{ marginTop: '10px' }} className='text-center'>
          Register
        </h1>
      </Col>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Col sm={{ size: 5, offset: 3 }}>
            <Input
              type='name'
              name='name'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Col>
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
          <Col sm={{ size: 5, offset: 3 }} className='mt-2'>
            <Input
              type='password'
              name='password_confirmation'
              placeholder='Password_confirmation'
              value={password_confirmation}
              onChange={(e) => setPassword_confirmation(e.target.value)}
              required
            />
          </Col>
        </FormGroup>
        {authError ? (
          <Alert color='danger'>
            Username or Email in use, or password format invalid. Please try it
            later.
          </Alert>
        ) : null}
        {unknownError ? (
          <Alert color='danger'>
            There was a problem. Check your format of input and try again.
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

export default RegisterForm
