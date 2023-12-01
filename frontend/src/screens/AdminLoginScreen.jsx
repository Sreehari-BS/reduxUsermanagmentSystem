import React, { useState } from 'react'
import { Form, Button } from "react-bootstrap";
import FormContainer from '../components/FormContainer'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:3000/api/admin";

const AdminLoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault();
        const data = await axios.post("/authAdmin", { email, password })
        if(data.data){
          navigate('/adminHome')
        }
    }
  return (
    <FormContainer>
        <h2> Admin Sign In</h2>
      <br />
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Sign In
        </Button>

      </Form>
    </FormContainer>
  )
}

export default AdminLoginScreen