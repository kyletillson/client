import React, { useState } from "react";
import { Error, FormField } from "../styles";
import { useNavigate } from 'react-router-dom'

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
          navigate("/restaurants")
        })

      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }


  return (
    <>
    <br></br>
    <br></br>
    <div className="box">
      <form onSubmit={handleSubmit}>
        <h1 className="login">Login</h1>
        <div className="input-container">
        <label htmlFor="username">Username</label>
        <br></br>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <br></br>
        <br></br>
        <div className="input-container">
        <label htmlFor="password">Password</label>
        <br></br>
        
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        
        <br></br>
        <br></br>
        <button className="text-white bg-red-900 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-900 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-900 dark:hover:bg-red-900 dark:focus:ring-red-900" type="submit">Login</button>
        <FormField>
        {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))}
      </FormField>
      </form>
      
      
    </div>
    </>
  );
}

export default Login;