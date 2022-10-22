import React, { useState } from "react";
import { Error } from "../styles";
import { useNavigate } from 'react-router-dom'

function SignUpForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("")

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        password_confirmation: passwordConfirmation,
        image_url: imageUrl,
        bio: bio,
        email: email
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          onLogin(user)
          navigate("/")
        });
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
      <h1 className="signup">Signup</h1>
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
        <div/>
        <br></br>
        <div className="input-container">
      
        <label htmlFor="password">Password</label>
        <br></br>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        </div>
      
        <div className="input-container">
        <label htmlFor="password">Password Confirmation</label>
        <br></br>
        <input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        />
        </div>
        <div className="input-container">
        <label htmlFor="imageUrl">Profile Image</label>
        <br></br>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        </div>
        <div className="input-container">
        <label htmlFor="imageUrl">Email</label>
        <br></br>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div className="input-container">
        <label htmlFor="bio">Bio</label>
        <br></br>
        <input
          rows="3"
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        </div>
      
      </div>
      
        <button className="button" type="submit" >{isLoading ? "Loading..." : "Sign Up"}</button>
      
        {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))}
      
    </form>
    </div>
    </>
  );
}

export default SignUpForm;