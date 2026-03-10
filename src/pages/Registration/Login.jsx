import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Registration.css'; // custom styles
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosclient from '../../utils/axiosclient';

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  function updateField(fieldname, newvalue) {
    setCredentials((prev) => ({
      ...prev,
      [fieldname]: newvalue
    }));
  }

  async function submitLogin(e) {
    e.preventDefault();
    try {
      const response = await axiosclient.post('/login', credentials);
      alert('Login successful');
      navigate('/loginsuccess');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Invalid email or password');
      } else {
        alert('Login failed');
      }
    }
  }

  return (
    <div className="login-container">
      <Form onSubmit={submitLogin} className="login-form">
        <h3 className="text-center mb-4">Login</h3>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email"   
            value={credentials.email} 
            onChange={(e) => updateField('email', e.target.value)} 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            value={credentials.password} 
            onChange={(e) => updateField('password', e.target.value)} 
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>

        <p className="mt-3 text-center">
          Forgot Password? <Link to="/forgot-password">Click here</Link>
        </p>
        <p className="mt-3 text-center">
          New User? <Link to="/">Signup</Link>
        </p>
      </Form>
    </div>
  );
}