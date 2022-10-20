import React from 'react'
// import axios from 'axios'
// import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'



export default function Moderate({ restaurant, onDeleteRestaurant }) {
  
  const navigate = useNavigate()

  const handleClick = () => {
      navigate(`/restaurants/${id}`)
  }




 

  
    
    const {id, name, image_url, rating, price, cuisine} = restaurant;

  
  


  // let counter = 0;
  // for (let i = 0; i < restaurant.reviews.length; i++) {
  //   counter++;
  // }
    
  return (
    <>
    {restaurant.price === "$$" ? <div className='card'>
      <div>
        <h4 className='title'>{name}</h4>
        <img className='img' src={image_url} alt={name}/>
        <h3 className='h3'>Cuisine: {cuisine}</h3>
        <h4 className='h4'>Price: {price}</h4>
        <h3 className='h3'>Average rating: {rating}</h3>
        {/* <h4 className='h3'> reviews</h4> */}
        {/* <button className='button' onClick={handleDeleteClick}>Delete</button> */}
        
        <button className='button' onClick={handleClick}>More Info</button>
        </div>
    </div> : null}
    
    </>
  )
}