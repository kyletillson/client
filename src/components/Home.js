import React from "react";
import { useNavigate } from 'react-router-dom'


function Home({ user }) {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/restaurants")
  }
    if (user) {
      return <> <div className='text-centered'><h1>Hello,   {user.username}! Welcome to the Denver Restaurant Review site!</h1>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h2>To view all the available restaurants on Denver Restaurants site, navigate to the restaurants link</h2>
      <br></br>
      <br></br>
      <h2>Or</h2>
      <br></br>
      <br></br>
      <button className='bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded' onClick={handleClick}>Click here</button>
      </div>
      </>
    } else {
      return <div className='text-centered'> <h1>Please Log In or Sign Up</h1> </div>;
    }
  }
  
  export default Home;