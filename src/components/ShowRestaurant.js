import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import Map from './Map';
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'

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
        return <div className='review'>
                <p className='h4'>{review.author}: commented on {review.created_at} <br></br> {review.comment} <br></br> {user && (user.id === review.user_id) ?
                <button className='button-delete' onClick={()=> {handleDeleteClick(review.id)}}>Delete</button>
                : null} </p>
                </div>
    })


    const [comment, setComment] = useState("")
    
  
// ***********************************************
    function onAddReview(newReview) {
       setRestaurant(r => ({...r, reviews: [...r.reviews, newReview]}))
       setComment("")
    }
// ****************************************************

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
// when un favorited set restaurant state again and favorites array should not include this restaurant

function handleDeleteFavorite(id) {
  fetch(`/favorites/${id}`, {
      method: "DELETE",
  }).then(r => 
    setRestaurant({...restaurant, favorites: restaurant.favorites.filter(f => f.id !== id)}) )
}



    
  return (
    <>
                <h1 className='title'>{restaurant.name}</h1>
                <img className='img' src={restaurant.image_url} alt={restaurant.name} />
                <h1 className='h4'>Cuisine: {restaurant.cuisine}</h1>
                <h1 className='h3'>Price: {restaurant.price}</h1>
                <h1 className='h4'>Average rating: {restaurant.rating}</h1>
                <h1 className='h4'>Phone: {restaurant.display_phone}</h1>
                <a className='h4' href={'https://www.google.com/maps/search/' + restaurant.name + restaurant.display_address}>{restaurant.display_address}</a>
                {favCount ? <h3>Favorited by {favCount} others</h3> : <h3>Be the first to favorite this restaurant!</h3>}
                {favorite ? <button className='button' onClick={() => handleDeleteFavorite(favorite.id)}>unfavorite</button> : <button className='button' onClick={add}>Favorite</button>}
                <br></br>
                <br></br>
                <a className='button-delete' href={restaurant.menu}>Menu</a>
                {count > 0 ? <h3>{count} Reviews</h3> : <h3>0 Reviews</h3>}
                {allComments}
                <br></br>
                <br></br>
                <div className="box">
                <form onSubmit={handleSubmit}>
                <div className="input-container">
                <input onChange={(e) => setComment(e.target.value)} value={comment} type="text" placeholder='Review' />
                </div>
                <button className='button' type='submit'>Add Review</button>
                </form>
                </div>
                <br></br>
                <br></br>
                {restaurant.latitude && restaurant.longitude ?  <Map latitude={restaurant.latitude} longitude={restaurant.longitude}/> : null}
                <br></br>
                <br></br>
                <br></br>
                <p className='h4'>Incorrect information?</p>
                <button className='button' onClick={handleClick}>Request change</button>
      </>
  )
}
