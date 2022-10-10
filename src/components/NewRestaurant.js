import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"

export default function NewRestaurant() {
  const navigate = useNavigate()
  const [restaurants, setRestaurants] = useState([])
  const [type_of_food, setType_of_food] = useState("")
  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")

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
    navigate('/restaurants', {replace: true});
    fetch("/restaurants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type_of_food: type_of_food,
        name: name,
        image: image,
        description: description,
        price: price,
      })
    })
    .then((r) => r.json())
    .then((NewRestaurant) => onAddRestaurant(NewRestaurant))
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
      <input onChange={(e) => setType_of_food(e.target.value)} value={type_of_food} type="text" name="Type of food" placeholder='Type of food' />
      <br></br>
      <br></br>
      </div>
      <div className="input-container">
      <input onChange={(e) => setName(e.target.value)} value={name} type="text" name="Name" placeholder='Name' />
      <br></br>
      <br></br>
      </div>
      <div className="input-container">
      <input onChange={(e) => setImage(e.target.value)} value={image} type="text" name="Image" placeholder='Image' />
      <br></br>
      <br></br>
      </div>
      <div className="input-container">
      <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" name="Description" placeholder='Description' />
      <br></br>
      <br></br>
      </div>
      <div className="input-container">
      <input onChange={(e) => setPrice(e.target.value)} value={price} type="text" name="Price" placeholder='Price' />
      <br></br>
      <br></br>
      <br></br>
      </div>
      <button className='button' type='submit'>Add Restaurant</button>
    </form>
    </div>
    </>
  )
}
