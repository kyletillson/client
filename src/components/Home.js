import React from "react";
// import Login from "./Login";
// import SignUpForm from "./SignUpForm";
// import { useNavigate } from 'react-router-dom'


function Home({ user }) {

  // const navigate = useNavigate()

  // const handleLogin = () => {
  //   navigate("/login")
  // }

  // const handleSignUp = () => {
  // navigate("/signup")
  // }
    if (user) {
      return <><h1>Hello,   {user.username}! Welcome to the Denver Restaurant Review site!</h1>
      </>
    } else {
      return <h1>Please Log In or Sign Up</h1>;
    }
    // return (
    //   <>
    //   <h1>Welcome to Denver Food!</h1>
    //   <br></br>
    //     <br></br>
    //     <br></br>
    //     <br></br>
    //   <div className="box">
    //     <button className="button" onClick={handleLogin}>Login</button>
    //     <br></br>
    //     <br></br>
    //     <br></br>
    //     <br></br>
    //     <button className="button" onClick={handleSignUp}>Sign Up</button>
    //   </div>
    //   </>
    // )
  }
  
  export default Home;