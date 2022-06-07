import React, { useState } from "react";
import { Button, Form, Label, Input, FormGroup, Col } from "reactstrap";
import axios from "axios";

import "./css/Login.css"

function Login(props) {
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    main: "",
    email: "",
    password: "",
  });

  //Creates the form layout
  const form = () => {
    return (
      <Form>
        <FormGroup row>
          <Label key="email" sm={2}>
            Email
          </Label>
          <Col sm={8}>
            <Input
              name="email"
              type="email"
              id="email_textbox"
              onChange={(e) => handleInputChange(e)}
              validations="required" />
            <p style={{ color: "red" }}>{errorMessage.email}</p>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label key="password" sm={2}>
            Password
          </Label>
          <Col sm={8}>
            <Input
              name="password"
              type="password"
              id="password_textbox"
              onChange={(e) => handleInputChange(e)}
              validations="required" />
            <p style={{ color: "red" }}>{errorMessage.password}</p>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label key="remember" sm={2}>
            Remember me
          </Label>
          <Col sm={3}>
            <Input
              name="remember"
              type="checkbox"
              id="remember_checkbox"
              onChange={(e) => handleInputChange(e)} />
          </Col>
          <Col sm={3}>
            <Button className="loginButton" id="login_button" onClick={() => login()}>
              Login
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  };

  //Update the form field
  function handleInputChange(e) {
    if (e.target.type !== "checkbox") {
      e.persist();
      setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
      resetError(e.target.name);
    }
    else {
      setRememberMe(e.target.checked);
    }
  }

  //resets the error message when typing in that field
  const resetError = (name) => {
    let errors = errorMessage;
    errors[name] = "";
    let counter = 0;

    for (const [key, val] of Object.entries(errors)) {
      if (val !== "" && key !== "main") {
        counter++;
      }
    }

    if (counter === 0) {
      errors.main = "";
    }
    setErrorMessage(errors);
  };
  const BASE_URL = 'https://hr-masters-backend-test.herokuapp.com'
/*   const BASE_URL = 'http://127.0.0.1:8000' */
  //sends login data to the server.
  function login() {
    let loginData = loginInput;
    axios
      .get(`${BASE_URL}/sanctum/csrf-cookie`)
      .then((response) => {
        axios
          .post(`${BASE_URL}/api/login`, loginData)
          .then((response) => {
            console.log(response);
            props.loggedIn(true);
            if (rememberMe) {
              localStorage.setItem('auth_token', response.data.token);
              localStorage.setItem('auth_name', response.data.user.email);
            }
            sessionStorage.setItem('auth_token', response.data.token);
            sessionStorage.setItem('auth_name', response.data.user.email);
            localStorage.setItem('delete', 'false');
            window.location.href = "/employees";
          })
          .catch((error) => {
            let messages = {};
            messages.main = error.response.data.message;
            if (error.response.status !== 401) {
              messages.email = error.response.data.errors.email;
              messages.password = error.response.data.errors.password;
            }
            setErrorMessage(messages);
          });
      });
  }

  return (
    <section className="loginForm">
      <h3 className="loginMessage">You must login to use this site.</h3>
      <h4>Please sign in.</h4>
      {form()}
      <p style={{ color: "red" }} id="ErrorMessage">{errorMessage.main}</p>
    </section>
  );
}

export default Login;
