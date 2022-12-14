import React, { useEffect, useState } from 'react'
import RestaurantList from './RestaurantList'
import Search from './Search'

export default function Restaurants() {

    const [restaurants, setRestaurants] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(()=> {
        fetch("/restaurants")
        .then(response => response.json())
        .then((data) => {
            setRestaurants(data)
        })
    }, [])

    const displayedRestaurants = restaurants.filter((restaurant) => {
        return restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) || restaurant.cuisine.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    })

    function handleDeleteRestaurant(id) {
        const updateRestaurantArray = restaurants.filter((restaurant) => restaurant.id !== id)
        setRestaurants(updateRestaurantArray)
    }
  return (
    <>
    <br></br>
    <Search searchTerm={searchTerm} onSearchChange={setSearchTerm}></Search>
    <br></br>
    <RestaurantList restaurants={displayedRestaurants} onDeleteRestaurant={handleDeleteRestaurant} ></RestaurantList>
    </>
  )
}
