import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"

export default function ShowRestaurant({user}) {
    const [restaurant, setRestaurant] = useState({
        reviews: []
    })
    const [display_address, setDisplay_Address] = useState("")
    const [name, setName] = useState("")
    const [image_url, setImage_Url] = useState("")
    const [display_phone, setDisplay_Phone] = useState("")
    const [price, setPrice] = useState("")
    const [rating, setRating] = useState("")
    const [updatedRestaurant, setUpdatedRestaurant] = useState([])

    

    const { id } = useParams()

    useEffect(() => {
        fetch(`/restaurants/${id}`)
        .then(res => res.json())
        .then(data => setRestaurant(data))
    }, [])


    
      const allComments = restaurant.reviews.map((review) => {
        return <div>
            <p className='h4'>{review.author}: {review.comment}</p>
        {user && (user.id === review.user_id) ?
        <button onClick={()=> {handleDeleteClick(review.id)}}>delete</button>
        : null}
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

    function onUpdateRestaurant(updatedRestaurants) {
        const updatedRestaurantPage = [...updatedRestaurant, updatedRestaurants]
        setUpdatedRestaurant(updatedRestaurantPage)
    }


    
    function handleUpdate (e) {
        e.preventDefault();
        fetch(`/restaurants/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                name: name,
                image_url: image_url,
                rating: rating,
                price: price,
                display_phone: display_phone,
                display_address: display_address,
            })
        })
        .then((r) => r.json())
        .then((updatedRestaurant) => (onUpdateRestaurant))
    }

  


    
  return (
    <>
    
            
                <p className='title'>{restaurant.name}</p>
                <img className='img' src={restaurant.image_url} alt={restaurant.name} />
                <p className='h3'>Price: {restaurant.price}</p>
                <p className='h4'>Average rating: {restaurant.rating}</p>
                <p className='h4'>Phone: {restaurant.display_phone}</p>
                <p className='h4'>Address: {restaurant.display_address}</p>
                <p>Reviews</p>
                {allComments}
           
            
            <form onSubmit={handleSubmit}>
                <input className="form__field" onChange={(e) => setComment(e.target.value)} value={comment} type="text" placeholder='Review' />
                <button className='button' type='submit'>Add Review</button>
            </form>

            <p>Update Restaurant</p>
            <br></br>
            <br></br>
            <form onSubmit={handleUpdate}>
            <input onChange={(e) => setName(e.target.value)} value={name} type="text" name="Name" placeholder='Name' />
            <input onChange={(e) => setImage_Url(e.target.value)} value={image_url} type="text" name="Image" placeholder='Image' />
            <input onChange={(e) => setPrice(e.target.value)} value={price} type="text" name="Price" placeholder='Price' />
            <input onChange={(e) => setRating(e.target.value)} value={rating} type="text" name="Rating" placeholder='Rating' />
            <input onChange={(e) => setDisplay_Phone(e.target.value)} value={display_phone} type="text" name="Phone" placeholder='Phone' />
            <input onChange={(e) => setDisplay_Address(e.target.value)} value={display_address} type="text" name="Address" placeholder='Address' />
            <br></br>
            <br></br>
            <button className='button' type='submit'>Update Restaurant</button>
            </form>
            
    </>
  )
}
