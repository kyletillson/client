import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function RestaurantCard({ restaurant }) {
  
  const navigate = useNavigate()

  const handleClick = () => {
      navigate(`/restaurants/${id}`)
  }

    const {id, name, image_url, rating, price, cuisine} = restaurant;

  return (
    <>
            <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
              <div className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                <div className="relative pb-48 overflow-hidden">
                  <img className="absolute inset-0 h-full w-full object-cover" src={image_url} alt={name}/>
                </div>
              <div className="p-4">
                <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">{cuisine}</span>
                  <h2 className="mt-2 mb-2  font-bold">{name}</h2>
                    <p className="mt-2 mb-2  font-bold">Average rating: {rating}</p>
                  <div className="mt-3 flex items-center">
                    <span className="font-bold text-xl">{price}</span>
                  </div>
                </div>
              <div className="p-4 border-t border-b text-xs text-gray-700">
                <span className="flex items-center mb-1">
                  <button onClick={handleClick} className="far fa-clock fa-fw mr-2 text-gray-900">More Info</button>
                    </span>  
                  </div>
                </div>
              </div>
            
    </>
  )
}
