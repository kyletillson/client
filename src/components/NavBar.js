import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import SignUpForm from "./SignUpForm";
import NewRestaurant from "./NewRestaurant";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <div>
        <nav>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/signup">Signup</Link>
      </div>
      <div>
        <Link to="/newrestaurant">New Restaurant</Link>
      </div>
      <div>
        {user ? (
          <button onClick={handleLogoutClick}>Logout</button>
        ) : (
          <>
            
          </>
        )}
      </div>

        </nav>
      

      <Routes>
        <Route path="/" element={<Home user={user}/>} />
        <Route path="/login" element={<Login setUser={setUser}/>} />
        <Route path="/signup" element={<SignUpForm setUser={setUser}/>}/>
        <Route path="/newrestaurant" element={<NewRestaurant />}/>
      </Routes>
    </div>
    
  );
}







export default NavBar;