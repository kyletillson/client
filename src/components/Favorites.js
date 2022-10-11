import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom"

export default function Favorites() {
    
    const { id } = useParams()

    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        fetch("/favorites")
        .then(res => res.json())
        .then(data => setFavorites(data))
    }, [])
    // console.log(favorites)
    // console.log(favorites)
    // favorites.map((favorite) => console.log(favorite.restaurant))

    function handleDeleteFavorite(id) {
        const updatedFavoriteArray = favorites.filter((favorite) => favorite.id !== id)
        setFavorites(updatedFavoriteArray)
    }

    function handleDeleteClick(id) {
        fetch(`/favorites/${id}`, {
            method: "DELETE",
        }).then(r => handleDeleteFavorite(id))
    }
    
    const restaurant = favorites.map((favorite) => {
        return (
            <>
            <div className='card-favorite'>
            <div>
            <h4 className='title'>{favorite.restaurant.name}</h4>
            <img className='img' src={favorite.restaurant.image_url} alt={favorite.restaurant.name}/>
            <h4 className='h4'>Price: {favorite.restaurant.price}</h4>
            <h3 className='h3'>Average rating: {favorite.restaurant.rating}</h3>
            <p className='h4'>Phone: {favorite.restaurant.display_phone}</p>
            <p className='h4'>Address: {favorite.restaurant.display_address}</p>
            <button className='button' onClick={()=> {handleDeleteClick(favorite.id)}}>Remove</button>
            </div>
            </div>
            </>
        )
    })
    // const restaurant = favorites[0].restaurant
    // console.log(restaurant)
  return (
    <>
    <h1>Favorites</h1>
    {restaurant}
    </>
  )
}
