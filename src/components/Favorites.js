import React, {useState, useEffect} from 'react'


export default function Favorites() {

    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        fetch("/favorites")
        .then(res => res.json())
        .then(data => setFavorites(data))
    }, [])

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
            <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4 centered">
              <div className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                <div className="relative pb-48 overflow-hidden">
                  <img className="absolute inset-0 h-full w-full object-cover" src={favorite.restaurant.image_url} alt={favorite.restaurant.name}/>
                </div>
              <div className="p-4">
                <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">{favorite.restaurant.cuisine}</span>
                  <h2 className="mt-2 mb-2  font-bold">{favorite.restaurant.name}</h2>
                    <p className="mt-2 mb-2  font-bold">Average rating: {favorite.restaurant.rating}</p>
                    <p className="mt-2 mb-2  font-bold">Phone: {favorite.restaurant.display_phone}</p>
                    <p className="mt-2 mb-2  font-bold">Address: {favorite.restaurant.display_address}</p>
                <div className="mt-3 flex items-center">
                    <span className="font-bold text-xl">{favorite.restaurant.price}</span>
                </div>
                </div>
                    <div className="p-4 border-t border-b text-xs text-gray-700">
                        <span className="flex items-center mb-1">
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

  return (
    <>
    <div className='text-centered'>
        <h1>Favorites</h1>
    </div>
        <div className="container mx-auto">
            <div className="flex flex-wrap -mx-4">
                {restaurant}
            </div>
        </div>
    </>
  )
}
