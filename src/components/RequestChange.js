import React, { useState} from 'react'
import { Error } from '../styles'

export default function RequestChange() {

    const [restaurant_name, setRestaurant_Name] = useState("")
    const [restaurant_city, setRestaurant_City] = useState("")
    const [restaurant_state, setRestaurant_State] = useState("")
    const [restaurant_zip, setRestaurant_Zip] = useState("")
    const [errors, setErrors] = useState([]);

     function handleUpdate (e) {
        e.preventDefault();
        fetch("/newrestaurants", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                restaurant_name: restaurant_name,
                restaurant_city: restaurant_city,
                restaurant_state: restaurant_state,
                restaurant_zip: restaurant_zip,
            }),
        }).then((r) => {
            if (r.ok) {
                r.json()
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
        .then((r) => r.json())
    }
  return (
    <>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <div className="box">
            <h2 className='login'>Request Change</h2>
            <br></br>
            <br></br>
            <form onSubmit={handleUpdate}>
            <div className="input-container">
            <input onChange={(e) => setRestaurant_Name(e.target.value)} value={restaurant_name} type="text" name="Name" placeholder='Restaurant Name' />
            </div>
            <div className="input-container">
            <input onChange={(e) => setRestaurant_City(e.target.value)} value={restaurant_city} type="text" name="City" placeholder='Restaurant City' />
            </div>
            <div className="input-container">
            <input onChange={(e) => setRestaurant_State(e.target.value)} value={restaurant_state} type="text" name="State" placeholder='Restaurant State' />
            </div>
            <div className="input-container">
            <input onChange={(e) => setRestaurant_Zip(e.target.value)} value={restaurant_zip} type="text" name="Zip Code" placeholder='Restaurant Zip Code' />
            </div>
            <button className='button' type='submit'>Submit Request</button>
            {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))}
            </form>
            </div>
    </>
  )
}
