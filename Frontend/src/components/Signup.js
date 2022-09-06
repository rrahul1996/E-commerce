import React, { useState } from 'react'
import '../styles/register.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { userSignUp } from '../redux/actions/authAction';
import { ToastContainer } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Alert, Stack } from '@mui/material';

export default function Signup() {

  const [ error, setError] = useState("")
  const [ registered, setRegistered] = useState(false);
  const [validated, setValidated] = useState(false);

  const users = useSelector((state) => state.user);
  const { userData,} = users
  console.log(userData)

  const [ signupFormData, setSignupFormData] = useState({
    first_name : "",
    last_name : "",
    user_name : "",
    email : "",
    password : "",
    phone_number : "",
    city : "",
  });
  console.log(signupFormData);

  const dispatch = useDispatch();

  const signupFormDataHandler = (e) => {
    setSignupFormData({
      ...signupFormData,

      [e.target.name]: e.target.value.trim()
    });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    try {
      const response = await axios.post("http://localhost:8080/api/v1/signup", signupFormData);
      dispatch(userSignUp(response.data));
      setRegistered(true);
    } catch (error) {
      console.log("!!!!!error!!!1", error.response.data.message);
      setError(error.response.data.message);
    }
  }

  const navigate = useNavigate();

  if (registered) {
    navigate("/signin");
  }

  if(registered) {
    toast("User Signup Successfully")
  }

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
      />
      <h1 style={{textAlign : "center", marginTop : "10px", color : "black"}}>Registration</h1>
      {error && (
        <div style={{ color: "red", marginTop: "25px", textAlign: "center" }}>
          <Stack sx={{marginLeft:'35%', marginRight:'35%', width: '30%'}} spacing={2}>
            <Alert severity="error">{error}</Alert>
          </Stack>
        </div>
      )}
      <div className='signup_form'>
        <Form className='form' noValidate validated={validated} onSubmit={signupHandler}>
          <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter your first name"
                name="first_name"
                required
                onChange={signupFormDataHandler}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a First Name...
              </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Enter your Last name"
              name="last_name"
              required
              onChange={signupFormDataHandler}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a Last Name...
              </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" >
              <Form.Label>Username</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Username"
              name="user_name"
              required
              onChange={signupFormDataHandler}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a Username...
              </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" >
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email"
                required
                name="email"
                onChange={signupFormDataHandler}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a EmailId...
              </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control 
              type="password" 
              placeholder="Password" 
              name="password"
              required
              onChange={signupFormDataHandler}
              />
              <Form.Control.Feedback type="invalid">
                Please choose Password...
              </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Enter your phone number"
              name="phone_number"
              required
              onChange={signupFormDataHandler}
              />
              <Form.Control.Feedback type="invalid">
                Please choose Phone Number...
              </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Enter your City"
              name="city"
              required
              onChange={signupFormDataHandler}
              />
              <Form.Control.Feedback type="invalid">
                Please choose city...
              </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
              Sign Up
          </Button>
          <span style={{ marginLeft:'13px'}}>Already have an account?</span>
          <Link to="/signin">
            <span style={{ marginLeft:'13px'}}>Signin here</span>
          </Link>

        </Form>
      </div>
    </div>
  )
}
