import React, {useState, useEffect} from 'react'
// import { useParams } from "react-router-dom"

export default function Favorites() {
    
    // const { id } = useParams()

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
            {/* <div className='card-favorite'>
            <div>
            <h4 className='title'>{favorite.restaurant.name}</h4>
            <img className='img' src={favorite.restaurant.image_url} alt={favorite.restaurant.name}/>
            <h4 className='h4'>Price: {favorite.restaurant.price}</h4>
            <h3 className='h3'>Average rating: {favorite.restaurant.rating}</h3>
            <p className='h4'>Phone: {favorite.restaurant.display_phone}</p>
            <p className='h4'>Address: {favorite.restaurant.display_address}</p>
            <button className='button' onClick={()=> {handleDeleteClick(favorite.id)}}>Remove</button>
            </div>
            </div> */}


            <div class="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4 centered">
              <div class="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                <div class="relative pb-48 overflow-hidden">
                  <img class="absolute inset-0 h-full w-full object-cover" src={favorite.restaurant.image_url} alt={favorite.restaurant.name}/>
                </div>
              <div class="p-4">
                <span class="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">{favorite.restaurant.cuisine}</span>
                  <h2 class="mt-2 mb-2  font-bold">{favorite.restaurant.name}</h2>
                    <p class="mt-2 mb-2  font-bold">Average rating: {favorite.restaurant.rating}</p>
                    <p class="mt-2 mb-2  font-bold">Phone: {favorite.restaurant.display_phone}</p>
                    <p class="mt-2 mb-2  font-bold">Address: {favorite.restaurant.display_address}</p>
                    
                  <div class="mt-3 flex items-center">
                    <span class="font-bold text-xl">{favorite.restaurant.price}</span>
                  </div>
                </div>
              <div class="p-4 border-t border-b text-xs text-gray-700">
                <span class="flex items-center mb-1">
                <button className='far fa-clock fa-fw mr-2 text-gray-900' onClick={()=> {handleDeleteClick(favorite.id)}}>Remove</button>
                    </span>  
                  </div>
                </div>
              </div>
          
          <div>
          </div>
            </>
        )
    })
    // const restaurant = favorites[0].restaurant
    // console.log(restaurant)
  return (
    <>
    <div className='text-centered'>
    <h1>Favorites</h1>
    </div>
    <div class="container mx-auto">
          <div class="flex flex-wrap -mx-4">
          {restaurant}
          </div>
          </div>
    
    </>
  )
}
