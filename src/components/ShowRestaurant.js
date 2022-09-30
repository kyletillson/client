import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"

export default function ShowRestaurant() {
    const [restaurant, setRestaurant] = useState({
        reviews: []
    })
    const { id } = useParams()

    useEffect(() => {
        fetch(`/restaurants/${id}`)
        .then(res => res.json())
        .then(data => setRestaurant(data))
    }, [])
    // console.log(restaurant)

    const allComments = restaurant.reviews.map((review) => {
        return <p>{review.comment}</p>
    })

    const [reviews, setReviews] = useState("")
    const [comment, setComment] = useState("")

    function onAddReview(NewReview) {
        const updatedReviewArray = [...reviews, NewReview]
        setReviews(updatedReviewArray)
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
                restaurant: restaurant,
            })
        })
        .then((r) => r.json())
        .then((NewReview) => onAddReview(NewReview))
    }

    // useEffect(() => {
    //     fetch("/reviews")
    //     .then(res => res.json())
    //     .then(data => setReviews(data))
    // }, [])
    // console.log(reviews)

    // const reviews = restaurant.reviews.map((reviews) => {
    //     return <p>{reviews}</p>
    // })

    
  return (
    <>
    <div>View Restaurant</div>
            {restaurant && <>
                <p>{restaurant.type_of_food}</p>
                <img src={restaurant.image} alt={restaurant.name} />
                <p>{restaurant.name}</p>
                <p>{restaurant.description}</p>
                <p>{restaurant.price}</p>
                <p>Reviews</p>
                {allComments}
                {/* <AddReview id={id} />
                {
                    restaurant.reviews.map(item => {
                        <Review key={item.id} id={item.id} comment={item.comment} user={item.user_id} />
                    })
                } */}
                
                {/* <p>{restaurant.reviews}</p> */}
            </>}
            <form onSubmit={handleSubmit}>
                <input onChange={(e) => setComment(e.target.value)} value={comment} type="text" placeholder='Comment' />
                <button type='submit'>Add Review</button>
            </form>
            
    </>
  )
}
