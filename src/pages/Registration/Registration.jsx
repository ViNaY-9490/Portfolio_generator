import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Registration.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import axiosclient from '../../utils/axiosclient';

export default function Signup() {
  const [userdetails, setUserdetails] = useState({
    name: "",
    email: "",
    password: ""
  });

  function updateFieldData(fieldname, newvalue) {
    setUserdetails((prev) => ({
      ...prev,
      [fieldname]: newvalue
    }));
  }

  async function submituserdetails(e) {
  e.preventDefault(); // prevent page reload
  try {
    const response = await axiosclient.post('/register', userdetails);
    if (response.status === 201 || response.status === 200) {
      alert('Registration successful');
    }
  } catch (error) {
    console.error("Registration failed:", error);
    alert('Registration failed');
  }
}

  return (
    <div style={{height:'100vh', backgroundColor:'#f0f0f0', display:'flex', justifyContent:'center', alignItems:'center'}}>
      <Form onSubmit={submituserdetails}>
        <h2>Sign up</h2>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Username" 
            value={userdetails.name} 
            onChange={(e) => updateFieldData('name', e.target.value)} 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email"  
            value={userdetails.email} 
            onChange={(e) => updateFieldData('email', e.target.value)} 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            value={userdetails.password} 
            onChange={(e) => updateFieldData('password', e.target.value)} 
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Signup
        </Button>
       
      <p>Already Registered? <Link to="/login">Login</Link></p>

      </Form>
    </div>
  );
}