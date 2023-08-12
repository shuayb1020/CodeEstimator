// import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";


function Registration() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const navigate = useNavigate();
  
  const handleFirstnameChange = (event) => {
    setFirst_name(event.target.value);
  };

  const handleLastnameChange = (event) => {
    setLast_name(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { username, password, email, first_name, last_name };
    fetch("https://alfawzaaniy.pythonanywhere.com/register", {
      credentials: 'include',
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Registration successful!', data);
        setIsPending(false);
        setError(null);
        navigate("/");
      })
      .catch((error) => {
        console.error('Error registering user:', error);
        setError(error.message);
        setIsPending(false);
      });
  };

  return (
    <div className='registration'>
      <h2>Registeration Page</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Firstname:
          <input 
          type="text" 
          value={first_name} 
          onChange={handleFirstnameChange} 
          required
          />
        </label>
        <br />
        <label>
          Lastname:
          <input 
          type="text" 
          value={last_name} 
          onChange={handleLastnameChange} 
          required
          />
        </label>
        <br />
        <label>
          Email:
          <input 
          type="email" 
          value={email} 
          onChange={handleEmailChange} 
          required
          />
        </label>
        <br />

        <label>
          Username:
          <input 
          type="text" 
          value={username} 
          onChange={handleUsernameChange} 
          required
          />
        </label>
        <br />
        
        
        <label>
          Password:
          <input 
          type="password" 
          value={password} 
          onChange={handlePasswordChange} 
          required
          />
        </label>
        <br />
        {/* <button type="submit">Register</button> */}
        {!isPending && <button type="submit">Register</button>}
        {isPending && <button disabled>Loading...</button>}
        {error && <div className='error'>{error}</div>}
        <p> Already have an account? <Link to={'/'}>Login</Link></p>
      </form>
    </div>
  );
}

export default Registration;
