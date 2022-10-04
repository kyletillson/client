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
    <div className='h4'>Add a Restaurant</div>
    <br></br>
    <br></br>
    <form onSubmit={handleSubmit}>
      <input onChange={(e) => setType_of_food(e.target.value)} value={type_of_food} type="text" name="Type of food" placeholder='Type of food' />
      <input onChange={(e) => setName(e.target.value)} value={name} type="text" name="Name" placeholder='Name' />
      <input onChange={(e) => setImage(e.target.value)} value={image} type="text" name="Image" placeholder='Image' />
      <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" name="Description" placeholder='Description' />
      <input onChange={(e) => setPrice(e.target.value)} value={price} type="text" name="Price" placeholder='Price' />
      <br></br>
      <br></br>
      <br></br>
      <button className='button' type='submit'>Add Restaurant</button>
    </form>
    </>
  )
}
