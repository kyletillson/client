import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import Map from './Map';
import { useNavigate } from 'react-router-dom'


export default function ShowRestaurant({user}) {

    const navigate = useNavigate()

    const [restaurant, setRestaurant] = useState({
        reviews: [],
        favorites: []
    })
    

    const { id } = useParams()

    function onAddFavorite(newFavorite) {
      setRestaurant(r => ({...r, favorites: [...r.favorites, newFavorite]}))
      
   }

    const add = function addFavorite() {
        fetch("/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            restaurant_id: id,
          })
        })
        .then((r) => r.json())
        .then((newFavorite) => onAddFavorite(newFavorite))
        
        
      }
    
    useEffect(() => {
        fetch(`/restaurants/${id}`)
        .then(res => res.json())
        .then(data => setRestaurant(data))
    }, [id])

      const allComments = restaurant.reviews.map((review) => {
        return <div key={review.id} className='page-centered'> 
        <br></br>
                {/* <p className='h4'>{review.author}: commented on {review.created_at} <br></br> {review.comment} */}
                <div className="px-4 sm:px-6 lg:px-8">
      <div
        v-for="review in reviews"
        key="review.id"
        className="max-w-lg px-8 py-8 rounded-md shadow-lg bg-white"
      >
        <p className="mt-2 text-sm font-medium leading-5 text-gray-500">{review.created_at}</p>
        <div className="mt-6 flex items-center space-x-1">
          <p className="text-sm font-medium leading-5 capitalize text-gray-500">
            Cuisine
          </p>
          <span className="text-gray-500">&bull;</span>
          <p
            v-if="review.verifiedPurchase"
            className="text-sm font-medium leading-5 text-gray-500"
          >
            {restaurant.cuisine}
          </p>
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-gray-800">
            {restaurant.name}
          </h3>
          <p className="text-sm font-medium leading-5 text-gray-600">
            {review.comment}
          </p>
        </div>
        <div className="mt-6 flex items-center space-x-2">
          <div className="flex flex-shrink-0 rounded-full border border-gray-200">
            <img
              className="w-8 h-8 object-cover rounded-full"
              src={review.image_url}
              alt={review.author}
            />
          </div>
          <span className="text-sm font-semibold leading-5 text-gray-900">{review.author}</span>
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <p className="text-sm font-medium leading-5 text-gray-600">
            {user && (user.id === review.user_id) ?
                <button className='button-delete' onClick={()=> {handleDeleteClick(review.id)}}>Delete</button>
                : null} 
          </p>
        </div>
      </div>
    </div>
    <br></br>      
    </div>
    
                
    })

    const [comment, setComment] = useState("")
    
    function onAddReview(newReview) {
       setRestaurant(r => ({...r, reviews: [...r.reviews, newReview]}))
       setComment("")
    }

    function onDeleteReview(id) {
        const updateReviewsArray = restaurant.reviews.filter((comment) => comment.id !== id)
        setRestaurant(r => ({...r, reviews: updateReviewsArray}))
    }

    function handleDeleteClick(id) {
        fetch(`/reviews/${id}`, {
            method: "DELETE",
    
        }).then(r => onDeleteReview(id))
        
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                comment: comment,
                restaurant_id: id,
            })
        })
        .then((r) => r.json())
        .then((newReview) => onAddReview(newReview))
    }

const handleClick = () => {
    navigate("/request_change")
}

const count = restaurant.reviews.length

const favCount = restaurant.favorites ? restaurant.favorites.length : null

 const favorite = restaurant.favorites ? restaurant.favorites.find((favorite) => {
  return favorite.user_id === user.id
}) : null

function handleDeleteFavorite(id) {
  fetch(`/favorites/${id}`, {
      method: "DELETE",
  }).then(r => 
    setRestaurant({...restaurant, favorites: restaurant.favorites.filter(f => f.id !== id)}) )
}

  return (
    <>
                <div className="container mx-auto">
                <div className="flex flex-wrap -mx-4">
            <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4 centered">
              <div className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                <div className="relative pb-48 overflow-hidden">
                  <img className="absolute inset-0 h-full w-full object-cover" src={restaurant.image_url} alt={restaurant.name}/>
                </div>
              <div className="p-4">
                <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">{restaurant.cuisine}</span>
                  <h2 className="mt-2 mb-2  font-bold">{restaurant.name}</h2>
                    <p className="mt-2 mb-2  font-bold">Average rating: {restaurant.rating}</p>
                    <p className="mt-2 mb-2  font-bold">Phone: {restaurant.display_phone}</p>
                    <a className="mt-2 mb-2  font-bold" href={'https://www.google.com/maps/search/' + restaurant.name + restaurant.display_address}>{restaurant.display_address}</a>
                  <div className="mt-3 flex items-center">
                    <span className="font-bold text-xl">{restaurant.price}</span>
                  </div>
                </div>
              <div className="p-4 border-t border-b text-xs text-gray-700">
                <span className="flex items-center mb-1">
                {favorite ? <button className='far fa-clock fa-fw mr-2 text-gray-900' onClick={() => handleDeleteFavorite(favorite.id)}>unfavorite</button> : <button className='far fa-clock fa-fw mr-2 text-gray-900' onClick={add}>Favorite</button>}
                <a className='far fa-clock fa-fw mr-2 text-gray-900' href={restaurant.menu}>Menu</a>
                <p>{count > 0 ? <h3 className='far fa-clock fa-fw mr-2 text-gray-900'>{count} Reviews</h3> : <h3 className='far fa-clock fa-fw mr-2 text-gray-900'>0 Reviews</h3>}</p>
                <p>{favCount ? <h3 className='far fa-clock fa-fw mr-2 text-gray-900'>{favCount} Favorites</h3> : <h3 className='far fa-clock fa-fw mr-2 text-gray-900'>0 Favorites</h3>}</p>
                    </span>  
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4 centered">
              <div className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                <div className="relative pb-48 overflow-hidden">
                {restaurant.latitude && restaurant.longitude ?  <Map latitude={restaurant.latitude} longitude={restaurant.longitude}/> : null}
                <a className="mt-2 mb-2  font-bold" href={'https://www.google.com/maps/search/' + restaurant.name + restaurant.display_address}>{restaurant.display_address}</a>
                </div>
                </div>
              </div>

          </div>
          </div>


          <div>

            
          
          {/* <div className='page-centered'>
                {favCount ? <h3 className='p-4 border-t border-b text-2xl text-gray-700 text-center'>Favorited by {favCount} others</h3> : <h3 className='p-4 border-t border-b text-2xl text-gray-700 text-center'>Be the first to favorite this restaurant!</h3>}
                </div> */}
                <br></br>
                <br></br>
                <br></br>
                <div className='page-centered'>
                <h3 className='p-4 border-t border-b text-2xl text-gray-700 text-center'>Reviews</h3>
                </div>
                <div className="container mx-auto">
                <div className="flex flex-wrap -mx-4">
                {allComments}
                </div>
                </div>
                <br></br>
                <br></br>
                <div className="box">
                <form onSubmit={handleSubmit}>
                <div className="input-container">
                <input onChange={(e) => setComment(e.target.value)} value={comment} type="text" placeholder='Review' />
                </div>
                <div className='text-centered'>
                <button type='submit' className="text-white bg-red-900 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-900 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-900 dark:hover:bg-red-900 dark:focus:ring-red-900">
  <svg aria-hidden="true" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
  <span class="sr-only">Icon description</span></button>
                </div>
                </form>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div className='text-centered'>
                <p className='p-4 text-2xl text-gray-700 text-center'>Incorrect information?</p>
                <button className='text-white bg-red-900 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-900 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-900 dark:hover:bg-red-900 dark:focus:ring-red-900' onClick={handleClick}>Request change</button>
                </div>
                </div>
                

               

                

 
    {/* <div class="px-4 sm:px-6 lg:px-8">
      <div
        v-for="review in reviews"
        key="review.id"
        class="max-w-lg px-8 py-8 rounded-md shadow-lg bg-white"
      >
        <p class="mt-2 text-sm font-medium leading-5 text-gray-500">{review.created_at}</p>
        <div class="mt-6 flex items-center space-x-1">
          <p class="text-sm font-medium leading-5 capitalize text-gray-500">
            Cuisine
          </p>
          <span class="text-gray-500">&bull;</span>
          <p
            v-if="review.verifiedPurchase"
            class="text-sm font-medium leading-5 text-gray-500"
          >
            {restaurant.cuisine}
          </p>
        </div>
        <div class="space-y-1">
          <h3 class="font-semibold text-gray-800">
            {restaurant.name}
          </h3>
          <p class="text-sm font-medium leading-5 text-gray-600">
            {review.comment}
          </p>
        </div>
        <div class="mt-6 flex items-center space-x-2">
          <div class="flex flex-shrink-0 rounded-full border border-gray-200">
            <img
              class="w-8 h-8 object-cover rounded-full"
              src="review.photo"
              alt=""
            />
          </div>
          <span class="text-sm font-semibold leading-5 text-gray-900">{review.author}</span>
          <div class="flex-shrink-0">
            <svg
              class="w-5 h-5 text-gray-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div> */}
    



      </>
  )
}
