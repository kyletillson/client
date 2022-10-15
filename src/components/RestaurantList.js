import React from 'react'
import RestaurantCard from './RestaurantCard'
import { useNavigate } from 'react-router-dom'
// import RequestRestaurant from './RequestRestaurant'

export default function RestaurantList({restaurants, onDeleteRestaurant}) {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/request_restaurant")
}
    
  return (
    <>
    <div className='cards'>
        {restaurants.map((restaurant) => {
            return (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} onDeleteRestaurant={onDeleteRestaurant} />
            )
        })}
        
    </div>
    <p className='h3'>Don't see your favorite restaurant?</p>
    <button className='button' onClick={handleClick}>Request Restaurant</button>
    </>
  )
}
