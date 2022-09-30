import React from 'react'

export default function RestaurantCard({ restaurant, onDeleteResraurant }) {
    console.log({restaurant})
    const {id, name, image, description, price} = restaurant;
    console.log(restaurant.name)
    function handleDeleteClick() {
        fetch(`/restaurants${id}`, {
            method: "DELETE",
    
        })
        onDeleteResraurant(id)
    }
  return (
    <>
    <div>
        <img src={image} alt={name}/>
        <h3>{name}</h3>
        <h4>{description}</h4>
        <h4>{price}</h4>
        <button onClick={handleDeleteClick}>Delete</button>
    </div>
    </>
  )
}
