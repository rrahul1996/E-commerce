import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/signin.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { userSignIn } from '../redux/actions/authAction';

export default function Signin() {

    const [error, setError] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [validated, setValidated] = useState(false);

    const users = useSelector((state) => state.user);
    const { userLoggedIn, } = users;
    

    const [ signinFormData, setSigninFormData] = useState({
        email : "",
        password : "",
    });
    

    const dispatch = useDispatch();
    
    const signinFormDataHandler = (e) => {
        setSigninFormData({
          ...signinFormData,
    
          // Trimming any whitespace
          [e.target.name]: e.target.value.trim()
        });
      };

    const loginHandler = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);

        try {
            const response = await axios.post("http://localhost:8080/api/v1/signin", signinFormData);
            dispatch(userSignIn(response.data))
            setLoggedIn(true)
        } catch (error) {
            setError(true)
        }
    }

    const navigate = useNavigate();

    if (userLoggedIn) {
        navigate("/");
    }

    if(loggedIn) {
        toast("User Signin Successfully")
    }
    
  return (
    <>
    <ToastContainer
        position="top-center"
        autoClose={1000}
    />
    <h1 style={{textAlign : "center", marginTop : "10px", color : "black"}}>Login Page</h1>
    {error && <div className='wrong'>Your EMAIL or PASSWORD is incorrect</div>}
        <div className='login_form'>
            <Form className='form' noValidate validated={validated} onSubmit={loginHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                    type="email"
                    placeholder="Enter email" 
                    name="email"
                    required
                    onChange={signinFormDataHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a EmailId...
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Password"
                    name="password"
                    required
                    onChange={signinFormDataHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please choose Password...
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>

                <div style={{marginTop: '10px'}}>
                    <span className='new_user'>New user?</span> 
                    <Link to='/signup'>
                        <span className='sign'>Signup here</span>
                    </Link>
                </div>
                
            </Form>
        </div>
</>
  )
}
