import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import RequestRestaurant from "./RequestRestaurant";
import RequestChange from "./RequestChange";

import Home from "./Home";
import Login from "./Login";
import SignUpForm from "./SignUpForm";
import NewRestaurant from "./NewRestaurant";
import Restaurants from "./Restaurants";
import ShowRestaurant from "./ShowRestaurant";
import Profile from "./Profile";
import Favorites from "./Favorites";

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
        <nav className="navbar">
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
      {user ? (
           <></>
        ) : (
          <>
            <Link to="/login">Login</Link>
          </>
        )}
        {/* <Link to="/login">Login</Link> */}
      </div>
      <div>
      {user ? (
          <></>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
          </>
        )}
        {/* <Link to="/signup">Signup</Link> */}
      </div>
      {/* <div>
      {user ? (
           <Link to="/newrestaurant">New Restaurant</Link>
        ) : (
          <>
            
          </>
        )}
        
      </div> */}
      <div>
      {user ? (
           <Link to="/restaurants">Restaurants</Link>
        ) : (
          <>
            
          </>
        )}
        {/* <Link to="/restaurants">Restaurants</Link> */}
      </div>
      <div>
      {user ? (
          <Link to="/users">Profile</Link>
        ) : (
          <>
            
          </>
        )}
        {/* <Link to="/users">Profile</Link> */}
      </div>
      <div>
      {user ? (
          <Link to="/favorites">Favorites</Link>
        ) : (
          <>
            
          </>
        )}
        {/* <Link to="/favorites">Favorites</Link> */}
      </div>
      <div>
        <br></br>
        {user ? (
          <button className="button" onClick={handleLogoutClick}>Logout</button>
        ) : (
          <>
            
          </>
        )}
      </div>
      <br></br>
      <br></br>
      {/* <button className="button" onClick={handleClick}>{user.username}</button> */}
     

        </nav>
      

      <Routes>
        <Route path="/" element={<Home user={user}/>} />
        <Route path="/login" element={<Login setUser={setUser}/>} />
        <Route path="/signup" element={<SignUpForm onLogin={setUser}/>}/>
        <Route path="/newrestaurant" element={<NewRestaurant />}/>
        <Route path="/restaurants" element={<Restaurants />}/>
        <Route path="/restaurants/:id" element={<ShowRestaurant user={user}/>} />
        <Route path="/favorites" element={<Favorites user={user}/>} />
        <Route path="/users" element={<Profile user={user} setUser={setUser}/>} />
        <Route path="/request_restaurant" element={<RequestRestaurant user={user} setUser={setUser}/>} />
        <Route path="/request_change" element={<RequestChange user={user} setUser={setUser}/>} />
      </Routes>
    </div>
    
  );
}







export default NavBar;