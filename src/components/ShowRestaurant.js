import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
// import { Error } from '../styles'
import Map from './Map';
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

export default function ShowRestaurant({user}) {

    const navigate = useNavigate()

    // const [errors, setErrors] = useState([]);

    const [restaurant, setRestaurant] = useState({
        reviews: []
    })
    // const [display_address, setDisplay_Address] = useState("")
    // const [name, setName] = useState("")
    // const [image_url, setImage_Url] = useState("")
    // const [display_phone, setDisplay_Phone] = useState("")
    // const [price, setPrice] = useState("")
    // const [rating, setRating] = useState("")
    // const [updatedRestaurant, setUpdatedRestaurant] = useState([])

    

    const { id } = useParams()

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
        // .then(data => console.log(data))
      }

    

    useEffect(() => {
        fetch(`/restaurants/${id}`)
        .then(res => res.json())
        .then(data => setRestaurant(data))
    }, [id])



        
    const date = new Date();

    const revDate = format(date, 'MM/dd/yyyy')
        
    
      const allComments = restaurant.reviews.map((review) => {
        return <div className='review'>
                <p className='h4'>{review.author}: commented on {review.time} <br></br> {review.comment} <br></br> {user && (user.id === review.user_id) ?
                <button className='button-delete' onClick={()=> {handleDeleteClick(review.id)}}>Delete</button>
                : null} </p>
                {/* {user && (user.id === review.user_id) ?
                <button className='button' onClick={()=> {handleDeleteClick(review.id)}}>Delete</button>
                : null} */}
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

// const menu = () => {
//   navigate({restaurant.menu})
// }

const count = restaurant.reviews.length

const favCount = restaurant.favorites ? restaurant.favorites.length : null


    
  return (
    <>
    
            
                
                <h1 className='title'>{restaurant.name}</h1>
                <img className='img' src={restaurant.image_url} alt={restaurant.name} />
                <h1 className='h4'>Cuisine: {restaurant.cuisine}</h1>
                <h1 className='h3'>Price: {restaurant.price}</h1>
                <h1 className='h4'>Average rating: {restaurant.rating}</h1>
                <h1 className='h4'>Phone: {restaurant.display_phone}</h1>
                {/* <h1 className='h4'>Address: {restaurant.display_address}</h1> */}
                {/* <a className='h4' href={'https://www.google.com/maps/search/' + restaurant.display_address}>{restaurant.display_address}</a> */}
                <a className='h4' href={'https://www.google.com/maps/search/' + restaurant.name + restaurant.display_address}>{restaurant.display_address}</a>
                {favCount ? <h3>Favorited by {favCount} others</h3> : <h3>Be the first to favorite this restaurant!</h3>}
                <button className='button' onClick={add}>Favorite</button>
                <br></br>
                <br></br>
                <a className='button-delete' href={restaurant.menu}>Menu</a>
                {count > 0 ? <h3>{count} Reviews</h3> : <h3>0 Reviews</h3>}
                {/* <h3>{count} Reviews</h3> */}
                {allComments}
                <br></br>
                <br></br>
                {/* <button className='button' onClick={addLikes}>Like</button> */}
           
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
            {/* <div className="box">
            <h2 className='login'>Update Restaurant</h2>
            <br></br>
            <br></br>
            <form onSubmit={handleUpdate}>
            <div className="input-container">
            <input onChange={(e) => setName(e.target.value)} value={name} type="text" name="Name" placeholder='Name' />
            </div>
            <div className="input-container">
            <input onChange={(e) => setImage_Url(e.target.value)} value={image_url} type="text" name="Image" placeholder='Image' />
            </div>
            <div className="input-container">
            <input onChange={(e) => setPrice(e.target.value)} value={price} type="text" name="Price" placeholder='Price' />
            </div>
            <div className="input-container">
            <input onChange={(e) => setRating(e.target.value)} value={rating} type="text" name="Rating" placeholder='Rating' />
            </div>
            <div className="input-container">
            <input onChange={(e) => setDisplay_Phone(e.target.value)} value={display_phone} type="text" name="Phone" placeholder='Phone' />
            </div>
            <div className="input-container">
            <input onChange={(e) => setDisplay_Address(e.target.value)} value={display_address} type="text" name="Address" placeholder='Address' />
            </div>
            <button className='button' type='submit'>Update Restaurant</button>
            {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))}
            </form>
            </div> */}
            {/* {restaurant.latitude && restaurant.longitude ?  <Map latitude={restaurant.latitude} longitude={restaurant.longitude}/> : null} */}
           
            {/* MAPPPPPPPPPPPPPPPPPPPPPPPP */}
            {/* <div>
<div className="sidebar">
Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
</div>
<div ref={mapContainer} className="map-container" />
</div> */}
            
    </>
  )
}
