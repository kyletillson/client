import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"

export default function ShowRestaurant() {
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
        return <p>{review.comment}</p>
    })

    const [comment, setComment] = useState("")
    
  

    function onAddReview(newReview) {
       setRestaurant(r => ({...r, reviews: [...r.reviews, newReview]}))
       setComment("")
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
                <input class="form__field" onChange={(e) => setComment(e.target.value)} value={comment} type="text" placeholder='Comment' />
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
