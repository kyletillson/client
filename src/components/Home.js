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
      <button className='text-white bg-red-900 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-900 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-900 dark:hover:bg-red-900 dark:focus:ring-red-900' onClick={handleClick}>Click here</button>
      </div>
      </>
    } else {
      return <div className='text-centered'> <h1>Please Log In or Sign Up</h1> </div>;
    }
  }
  
  export default Home;