import React from 'react'
import RestaurantCard from './RestaurantCard'

export default function RestaurantList({restaurants, onDeleteRestaurant}) {
    
  return (
    <div>
        {restaurants.map((restaurant) => {
            return (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} onDeleteRestaurant={onDeleteRestaurant} />
            )
        })}
    </div>
  )
}
