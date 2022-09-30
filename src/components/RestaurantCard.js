import React from 'react'
// import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'


export default function RestaurantCard({ restaurant, onDeleteRestaurant }) {
  
  const navigate = useNavigate()

  const handleClick = () => {
      navigate(`/restaurants/${id}`)
  }
  
    
    const {id, type_of_food, name, image, description, price} = restaurant;
    
    function handleDeleteClick() {
        fetch(`/restaurants${id}`, {
            method: "DELETE",
    
        })
        onDeleteRestaurant(id)
    }
  return (
    <>
    <div>
        <h4>{type_of_food}</h4>
        <img src={image} alt={name}/>
        <h3>{name}</h3>
        <h4>{description}</h4>
        <h4>{price}</h4>
        <button className='button' onClick={handleDeleteClick}>Delete</button>
        <br></br>
        <br></br>
        {/* <Link to={`/restaurants/${id}`}>View Restaurant</Link> */}
        <button className='button' onClick={handleClick}>More Info</button>
    </div>
    </>
  )
}
