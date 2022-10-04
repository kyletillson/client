import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"

export default function ShowRestaurant({user}) {
    const [restaurant, setRestaurant] = useState({
        reviews: []
    })
    const [type_of_food, setType_of_food] = useState("")
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [updatedRestaurant, setUpdatedRestaurant] = useState([])

    

    const { id } = useParams()

    useEffect(() => {
        fetch(`/restaurants/${id}`)
        .then(res => res.json())
        .then(data => setRestaurant(data))
    }, [])
    // console.log(restaurant)
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

    // function onUpdateRestaurant(updatedRestaurants) {
    //     setRestaurant([...updatedRestaurant, updatedRestaurants])
        
    //  }

    // function handleDeleteReview(id) {
    //     const updateReviewsArray = comments.filter((comment) => comment.id !== id)
    //     setRestaurant(updateReviewsArray)
    // }

    // function handleDeleteClick() {
    //     fetch(`/restaurants/${id}`, {
    //         method: "DELETE",
    
    //     })
    //     handleDeleteReview(id)
    // }


    
    function handleUpdate (e) {
        e.preventDefault();
        fetch(`/restaurants/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                type_of_food: type_of_food,
                name: name,
                image: image,
                description: description,
                price: price,
            })
        })
        .then((r) => r.json())
        .then((updatedRestaurant) => (onUpdateRestaurant))
    }


    
  return (
    <>
    
            {restaurant && <>
                <p className='title'>{restaurant.type_of_food}</p>
                <img className='img' src={restaurant.image} alt={restaurant.name} />
                <p className='h3'>{restaurant.name}</p>
                <p className='h4'>{restaurant.description}</p>
                <p className='h4'>{restaurant.price}</p>
                <p>Reviews</p>
                {allComments}
                {/* <br></br>
                <br></br>
                <button className='button' onClick={handleDeleteClick}>Delete Review</button> */}
                {/* <AddReview id={id} />
                {
                    restaurant.reviews.map(item => {
                        <Review key={item.id} id={item.id} comment={item.comment} user={item.user_id} />
                    })
                } */}
                
                {/* <p>{restaurant.reviews}</p> */}
            </>}
            
            <form onSubmit={handleSubmit}>
                <input className="form__field" onChange={(e) => setComment(e.target.value)} value={comment} type="text" placeholder='Review' />
                <button className='button' type='submit'>Add Review</button>
            </form>

            <p>Update Restaurant</p>
            <br></br>
            <br></br>
            <form onSubmit={handleUpdate}>
            <input onChange={(e) => setType_of_food(e.target.value)} value={type_of_food} type="text" name="Type of food" placeholder='Type of food' />
            <input onChange={(e) => setName(e.target.value)} value={name} type="text" name="Name" placeholder='Name' />
            <input onChange={(e) => setImage(e.target.value)} value={image} type="text" name="Image" placeholder='Image' />
            <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" name="Description" placeholder='Description' />
            <input onChange={(e) => setPrice(e.target.value)} value={price} type="text" name="Price" placeholder='Price' />
            <br></br>
            <br></br>
            <button className='button' type='submit'>Update Restaurant</button>
            </form>
            
    </>
  )
}
