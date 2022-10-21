import React from 'react'
// import axios from 'axios'
// import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'



export default function Vegetarian({ restaurant, onDeleteRestaurant }) {
  
  const navigate = useNavigate()

  const handleClick = () => {
      navigate(`/restaurants/${id}`)
  }




 

  
    
    const {id, name, image_url, rating, price, cuisine} = restaurant;

  
  



    
  return (
    <>
    {/* {restaurant.cuisine.includes("Vegetarian") ? <div className='card'>
      <div>
        <h4 className='title'>{name}</h4>
        <img className='img' src={image_url} alt={name}/>
        <h3 className='h3'>Cuisine: {cuisine}</h3>
        <h4 className='h4'>Price: {price}</h4>
        <h3 className='h3'>Average rating: {rating}</h3>
        
        
        <button className='button' onClick={handleClick}>More Info</button>
        </div>
    </div> : null} */}
        {restaurant.cuisine.includes("Vegetarian") ? 
            <div class="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
              <div class="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                <div class="relative pb-48 overflow-hidden">
                  <img class="absolute inset-0 h-full w-full object-cover" src={image_url} alt={name}/>
                </div>
              <div class="p-4">
                <span class="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">{cuisine}</span>
                  <h2 class="mt-2 mb-2  font-bold">{name}</h2>
                    <p class="mt-2 mb-2  font-bold">Average rating: {rating}</p>
                  <div class="mt-3 flex items-center">
                    <span class="font-bold text-xl">{price}</span>
                  </div>
                </div>
              <div class="p-4 border-t border-b text-xs text-gray-700">
                <span class="flex items-center mb-1">
                  <button onClick={handleClick} className="far fa-clock fa-fw mr-2 text-gray-900">More Info</button>
                    </span>  
                  </div>
                </div>
              </div>
             : null}
 </>
  )
}



  
