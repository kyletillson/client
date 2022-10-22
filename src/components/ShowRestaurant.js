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
                <p className='h4'>{review.author}: commented on {review.created_at} <br></br> {review.comment} <br></br> {user && (user.id === review.user_id) ?
                <button className='button-delete' onClick={()=> {handleDeleteClick(review.id)}}>Delete</button>
                : null} </p>
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

const favorite = restaurant.favorites.find((favorite) => {
  return favorite.user_id === user.id
})

function handleDeleteFavorite(id) {
  fetch(`/favorites/${id}`, {
      method: "DELETE",
  }).then(r => 
    setRestaurant({...restaurant, favorites: restaurant.favorites.filter(f => f.id !== id)}) )
}

  return (
    <>
                <div className="container mx-auto">
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
                    </span>  
                  </div>
                </div>
              </div>
          </div>
          <div>
          
          <div className='page-centered'>
                {favCount ? <h3 className='p-4 border-t border-b text-2xl text-gray-700 text-center'>Favorited by {favCount} others</h3> : <h3 className='p-4 border-t border-b text-2xl text-gray-700 text-center'>Be the first to favorite this restaurant!</h3>}
                </div>
                <br></br>
                <h3 className='p-4 border-t border-b text-2xl text-gray-700 text-center'>Location on map</h3>
          <div className="container mx-auto">
            <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4 centered">
              <div className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                <div className="relative pb-48 overflow-hidden">
                {restaurant.latitude && restaurant.longitude ?  <Map latitude={restaurant.latitude} longitude={restaurant.longitude}/> : null}
                </div>
              <div className="p-4">
                   <h2 className="mt-2 mb-2  font-bold">{restaurant.name}</h2>
                    <a className="mt-2 mb-2  font-bold" href={'https://www.google.com/maps/search/' + restaurant.name + restaurant.display_address}>{restaurant.display_address}</a>
                  </div>
                </div>
              </div>
          </div>
                <br></br>
                <br></br>
                <div className='page-centered'>
                {count > 0 ? <h3 className='p-4 border-t border-b text-2xl text-gray-700 text-center'>{count} Reviews</h3> : <h3 className='p-4 border-t border-b text-2xl text-gray-700 text-center'>0 Reviews</h3>}
                </div>
                {allComments}
                <br></br>
                <br></br>
                <div className="box">
                <form onSubmit={handleSubmit}>
                <div className="input-container">
                <input onChange={(e) => setComment(e.target.value)} value={comment} type="text" placeholder='Review' />
                </div>
                <div className='text-centered'>
                <button className='button' type='submit'>Add Review</button>
                </div>
                </form>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div className='text-centered'>
                <p className='h4'>Incorrect information?</p>
                <button className='button' onClick={handleClick}>Request change</button>
                </div>
                </div>
      </>
  )
}
