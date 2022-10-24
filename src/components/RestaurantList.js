import React from 'react'
import RestaurantCard from './RestaurantCard'
import { useNavigate } from 'react-router-dom'
import Cheap from './Cheap'
import FineDining from './FineDining'
import Vegetarian from './Vegetarian'
import Moderate from './Moderate'
import FiveStar from './FiveStar'


export default function RestaurantList({restaurants, onDeleteRestaurant}) {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/request_restaurant")
}
    
  return (
    <>
    <h1 className='p-4 border-t border-b text-2xl text-gray-700 text-center'>Moderately Priced</h1>
<div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
    {restaurants.map((restaurant) => {
            return (
                <Moderate key={restaurant.id} restaurant={restaurant} onDeleteRestaurant={onDeleteRestaurant} />
            )
        })}
        </div>
        </div>
    
        

<h1 className='p-4 border-t border-b text-2xl text-gray-700 text-center'>Vegetarian</h1>
<div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
    {restaurants.map((restaurant) => {
            return (
                <Vegetarian key={restaurant.id} restaurant={restaurant} onDeleteRestaurant={onDeleteRestaurant} />
            )
        })}
        </div>
        </div>
       
        <h1 className='p-4 border-t border-b text-2xl text-gray-700 text-center'>Fine Dining</h1>
    <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
    {restaurants.map((restaurant) => {
            return (
                <FineDining key={restaurant.id} restaurant={restaurant} onDeleteRestaurant={onDeleteRestaurant} /> 
            )
        })}
        </div>
        </div>
        <h1 className='p-4 border-t border-b text-2xl text-gray-700 text-center'>Cheap Eats</h1>
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">

    {restaurants.map((restaurant) => {
            return (
                <Cheap key={restaurant.id} restaurant={restaurant} onDeleteRestaurant={onDeleteRestaurant} />   
            )
        })}
        </div>
        </div>

<h1 className='p-4 border-t border-b text-2xl text-gray-700 text-center'>5 Star</h1>
<div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
    {restaurants.map((restaurant) => {
            return (
                <FiveStar key={restaurant.id} restaurant={restaurant} onDeleteRestaurant={onDeleteRestaurant} />  
            )
        })}
        </div>
        </div>
    
    <h1 className='p-4 border-t border-b text-2xl text-gray-700 text-center'>All Restaurants</h1>
    <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
        {restaurants.map((restaurant) => {
            return (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} onDeleteRestaurant={onDeleteRestaurant} /> 
            )
        })}
        </div>
        </div>
    <div className='text-centered'>
    <p className='p-4 text-2xl text-gray-700 text-center'>Don't see your favorite restaurant?</p>
    </div>
    <div className='button-centered'>
    <button className='text-white bg-red-900 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-900 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-900 dark:hover:bg-red-900 dark:focus:ring-red-900' onClick={handleClick}>Request Restaurant</button>
    </div>
    </>
  )
}
