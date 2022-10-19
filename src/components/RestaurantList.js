import React from 'react'
import RestaurantCard from './RestaurantCard'
import { useNavigate } from 'react-router-dom'
import Cheap from './Cheap'
import FineDining from './FineDining'
import Vegetarian from './Vegetarian'
import Moderate from './Moderate'
import FiveStar from './FiveStar'
// import RequestRestaurant from './RequestRestaurant'

export default function RestaurantList({restaurants, onDeleteRestaurant}) {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/request_restaurant")
}
    
  return (
    <>
    

    <h1>Fine Dining</h1>
    <div className='cards'>
    {restaurants.map((restaurant) => {
            return (
                <FineDining key={restaurant.id} restaurant={restaurant} onDeleteRestaurant={onDeleteRestaurant} />
                  
            )
        })}
        </div>

<h1>Vegetarian</h1>
<div className='cards'>
    {restaurants.map((restaurant) => {
            return (
                <Vegetarian key={restaurant.id} restaurant={restaurant} onDeleteRestaurant={onDeleteRestaurant} />
                  
            )
        })}
        </div>

        <h1>Cheap Eats</h1>
    <div className='cards'>

    {restaurants.map((restaurant) => {
            return (
                <Cheap key={restaurant.id} restaurant={restaurant} onDeleteRestaurant={onDeleteRestaurant} />
                  
            )
        })}
        </div>

<h1>Moderately Priced</h1>
<div className='cards'>
    {restaurants.map((restaurant) => {
            return (
                <Moderate key={restaurant.id} restaurant={restaurant} onDeleteRestaurant={onDeleteRestaurant} />
                  
            )
        })}
        </div>

<h1>5 Star</h1>
<div className='cards'>
    {restaurants.map((restaurant) => {
            return (
                <FiveStar key={restaurant.id} restaurant={restaurant} onDeleteRestaurant={onDeleteRestaurant} />
                  
            )
        })}
        </div>
    
    <h1>All Restaurants</h1>
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
