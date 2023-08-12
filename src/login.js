import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    };

    fetch("https://alfawzaaniy.pythonanywhere.com/users/login/", requestOptions, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid username or password");
        }
        return response.json();
      })
      .then((data) => {
        // handle successful login
        localStorage.setItem('token', data.successful);
        navigate("/Index"); // navigate to the dashboard page
      })
      .catch((error) => {
        // handle login error
        setError(error.message);
      });
  };

  return (
    <div className ='login'>
    <h2>Login Page</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Username:
          <input 
          type="text" 
          value={username} 
          onChange={handleUsernameChange} 
          required/>
        </label>
        <label>
          Password:
          <input 
          type="password" 
          value={password} 
          onChange={handlePasswordChange} 
          required/>
        </label>
        <button type="submit">Login</button>
        <p> don't have an account? <Link to={'/Registration'}>Crete account</Link></p>

        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default LoginPage;
