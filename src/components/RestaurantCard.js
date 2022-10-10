import React from 'react'
// import axios from 'axios'
// import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'


export default function RestaurantCard({ restaurant, onDeleteRestaurant }) {
  
  const navigate = useNavigate()

  const handleClick = () => {
      navigate(`/restaurants/${id}`)
  }

  // const config = {
  //   headers: {
  //     // "accept": "application/json",
  //     // "x-requested-with": "xmlhttprequest",
  //     // "Access-Control-Allow-Origin": "*",
  //     "Authorization": "Bearer 6rX97znRbKbHWKnrGaW8usg3DSpn8E81xINswLw1iP-oT3aQhApoZ7GJsGogudnJSkQRxu0ZDLfwjUiBQY4I59cm3csLpxQFTdaDvCRKOiKOaeINt8TlBJ8jX8NAY3Yx"
  //   }
  // };

  //   axios
  //     .get("https://api.yelp.com/v3/businesses/search?location=DENVER&limit=40", config)
  //     .then((response) => {
  //       console.log(response)
  //     }, [])
  // const BEARER_TOKEN = '6rX97znRbKbHWKnrGaW8usg3DSpn8E81xINswLw1iP-oT3aQhApoZ7GJsGogudnJSkQRxu0ZDLfwjUiBQY4I59cm3csLpxQFTdaDvCRKOiKOaeINt8TlBJ8jX8NAY3Yx';
  //   axios
  //     .get(
  //       `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=DENVER&limit=40`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${BEARER_TOKEN}`,
  //         },
  //         params: {
  //           term: 'restaurants',
  //         },
  //       },
  //     )
  //     .then((res) => res.json())
  //     .then((res) => console.log(res))

 

  
    
    const {id, name, image_url, rating, price, display_phone, display_address} = restaurant;
    
    function handleDeleteClick() {
        fetch(`/restaurants/${id}`, {
            method: "DELETE",
    
        })
        onDeleteRestaurant(id)
    }

    
  return (
    <>
    
    <div className='card'>
      <div>
        <h4 className='title'>{name}</h4>
        <img className='img' src={image_url} alt={name}/>
        <h4 className='h4'>Price: {price}</h4>
        <h3 className='h3'>Average rating: {rating}</h3>
        <h4 className='h4'>Phone: {display_phone}</h4>
        <h4 className='h4'>Address: {display_address}</h4>
        <button className='button' onClick={handleDeleteClick}>Delete</button>
        <br></br>
        <br></br>
        <button className='button' onClick={handleClick}>More Info</button>
        </div>
    </div>
    </>
  )
}
