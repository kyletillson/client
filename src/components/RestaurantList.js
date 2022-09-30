import React from 'react'
import RestaurantCard from './RestaurantCard'

export default function RestaurantList({restaurants, onDeleteRestaurant}) {
    console.log(restaurants)
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
