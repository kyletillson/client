import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom"


import NavBar from "./NavBar";




function App() {
  const [user, setUser] = useState(null);

  // const { id } = useParams()

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <div>
      <div>
      <NavBar user={user} setUser={setUser}/>
      {/* user={user} setUser={setUser} */}

      </div>

    </div>
  );
}

export default App;