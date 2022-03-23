import React, { useState } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  FormText,
} from 'reactstrap'
import axios from 'axios'

import Humanize from "../Humanize";
import "../css/UpdateModal.css";

const EmployeeUpdateModal = (props) => {
  const BASE_URL = props.BASE_URL
  const SUB_URL = props.SUB_URL
  const label = props.label
  const employee = props.employee
  const [authError, setAuthError] = useState(false)
  const [unknownError, setUnknownError] = useState(false)
  const [isLoading, setIsLoading] = useState(false) //for loading message
  //store a pice of new data,, when edit will be targeted will automatically show the original data
  const [form, setForm] = useState(
    !employee
      ? {
          id: 0,
          first_name: '',
          last_name: '',
          email: '',
          username: '',
          performance_plan: [],
        }
      : employee
  )

  //input onchange function
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }
//creation  fuction
const submitFormAdd = (e) => {
  e.preventDefault()
  setAuthError(false)
  setUnknownError(false)
  setIsLoading(true)
  axios
    .post(`${BASE_URL}/${SUB_URL}`, form, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      if (response.status === 201) {
        form.id = response.data.employee.id
        props.addItemToState(form)
        alert('User created successfully.')
        props.toggle()
      }
    })
    .catch((error) => {
      if (error.response.status === 422) {
        setAuthError(true)
        setIsLoading(false)
      } else {
        setUnknownError(true)
        setIsLoading(false)
      }
    })
}

//editing function
const submitFormEdit = (e) => {
  e.preventDefault()
  setAuthError(false)
  setUnknownError(false)
  setIsLoading(true)
  axios
    .put(`${BASE_URL}/${SUB_URL}/${form.id}`, form, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      if (response.status === 201) {
        alert('User updated successfully.')
        props.updateState(form)
        props.toggle()
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
  }
   //validation rule for first name, last name and email reqired
  //when edit function will be targeted the email input will be disable
  const emailPattern =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const namePattern = '^[A-Za-z-]{2,8}$'

return (
  <Form onSubmit={label === 'Edit' ? submitFormEdit : submitFormAdd}>
    <FormGroup>
      <Label for='first_name'>First Name</Label>
      <Input
        valid={form.first_name.match(namePattern)}
        invalid={!form.first_name.match(namePattern)}
        type='text'
        name='first_name'
        id='first_name'
        onChange={onChange}
        value={form.first_name === null ? '' : form.first_name}
        placeholder='ex. James'
        required
      />
      <FormText>Names must be alphabet.</FormText>
    </FormGroup>
    <FormGroup>
      <Label for='last_name'>Last Name</Label>
      <Input
        valid={form.last_name.match(namePattern)}
        invalid={!form.last_name.match(namePattern)}
        type='text'
        name='last_name'
        id='last_name'
        onChange={onChange}
        value={form.last_name === null ? '' : form.last_name}
        placeholder='ex. Bond'
        required
      />
    </FormGroup>
    <FormGroup>
      <Label for='email'>Email</Label>
      <Input
        valid={form.email.match(emailPattern)}
        invalid={!form.email.match(emailPattern)}
        type='email'
        name='email'
        id='email'
        onChange={onChange}
        value={form.email === null ? '' : form.email}
        disabled={employee ? true : false}
        placeholder='ex. jamesbond.@gmail.com'
        required
      />
    </FormGroup>
    <FormGroup>
      <Label for='username'>Username</Label>
      <Input
        valid={form.username }
        type='text'
        name='username'
        id='username'
        onChange={onChange}
        value={form.username === null ? '' : form.username}
      />
    </FormGroup>
    {authError ? (
      <Alert color='danger'>
        The email is in use or invalid format, please change it and try again.
      </Alert>
    ) : null}
    {unknownError ? (
      <Alert color='danger'>
        There was a problem submitting your credentials.
      </Alert>
    ) : null}
    {/* loding button */}
    {!isLoading && <Button className='mt-2'>Submit</Button>}
    {isLoading && <Button className='mt-2'>Loading...</Button>}
  </Form>
)
}

export default EmployeeUpdateModal;
