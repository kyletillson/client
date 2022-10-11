import React, { useEffect, useState } from 'react'
// import {useNavigate} from "react-router-dom"
import { Error } from '../styles'

export default function NewRestaurant() {
  // const navigate = useNavigate()
  const [restaurants, setRestaurants] = useState([])
  const [display_address, setDisplay_Address] = useState("")
  const [name, setName] = useState("")
  const [image_url, setImage_Url] = useState("")
  const [display_phone, setDisplay_Phone] = useState("")
  const [price, setPrice] = useState("")
  const [rating, setRating] = useState("")
  const [errors, setErrors] = useState([]);

  useEffect(()=> {
    fetch("/restaurants")
    .then(response => response.json())
    .then((data) => {
      setRestaurants(data)
    })
  }, [])

  function onAddRestaurant(NewRestaurant) {
    const updatedRestaurantArray = [...restaurants, NewRestaurant]
    setRestaurants(updatedRestaurantArray)
  }

  function handleSubmit(e) {
    e.preventDefault();
    // navigate('/restaurants', {replace: true});
    fetch("/restaurants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          name: name,
          image_url: image_url,
          rating: rating,
          price: price,
          display_phone: display_phone,
          display_address: display_address,
      })
    }).then((r) => {
      if (r.ok) {
        r.json().then((NewRestaurant) => {
          onAddRestaurant(NewRestaurant)
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    })
    // .then((r) => r.json())
    // .then((NewRestaurant) => onAddRestaurant(NewRestaurant))
  }
  return (
    <>
    <br></br>
    <br></br>
    <div className='box'>
    <h1 className='login'>Add a Restaurant</h1>
    <br></br>
    <br></br>
    <form onSubmit={handleSubmit}>
    <div className="input-container">
      <input onChange={(e) => setName(e.target.value)} value={name} type="text" name="name" placeholder='Name' />
      <br></br>
      <br></br>
      </div>
      <div className="input-container">
      <input onChange={(e) => setImage_Url(e.target.value)} value={image_url} type="text" name="image" placeholder='Image' />
      <br></br>
      <br></br>
      </div>
      <div className="input-container">
      <input onChange={(e) => setPrice(e.target.value)} value={price} type="text" name="price" placeholder='Price' />
      <br></br>
      <br></br>
      </div>
      <div className="input-container">
      <input onChange={(e) => setRating(e.target.value)} value={rating} type="text" name="rating" placeholder='Rating' />
      <br></br>
      <br></br>
      </div>
      <div className="input-container">
      <input onChange={(e) => setDisplay_Phone(e.target.value)} value={display_phone} type="text" name="phone" placeholder='Phone' />
      <br></br>
      <br></br>
      <br></br>
      </div>
      <div className="input-container">
      <input onChange={(e) => setDisplay_Address(e.target.value)} value={display_address} type="text" name="address" placeholder='Address' />
      <br></br>
      <br></br>
      </div>
      <button className='button' type='submit'>Add Restaurant</button>
      {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))}
    </form>
    </div>
    </>
  )
}
