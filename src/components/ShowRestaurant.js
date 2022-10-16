import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
// import { Error } from '../styles'
import Map from './Map';
import { useNavigate } from 'react-router-dom'
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
    }, [])



        

        
    
      const allComments = restaurant.reviews.map((review) => {
        return <div>
                <p className='h4'>{review.author}: {review.comment} {user && (user.id === review.user_id) ?
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

    // function onUpdateRestaurant(updatedRestaurants) {
    //     const updatedRestaurantPage = [...updatedRestaurant, updatedRestaurants]
    //     setUpdatedRestaurant(updatedRestaurantPage)
    // }


    
    // function handleUpdate (e) {
    //     e.preventDefault();
    //     fetch(`/restaurants/${id}`, {
    //         method: "PATCH",
    //         headers: {
    //             "Content-type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             id: id,
    //             name: name,
    //             image_url: image_url,
    //             rating: rating,
    //             price: price,
    //             display_phone: display_phone,
    //             display_address: display_address,
    //         }),
    //     }).then((r) => {
    //         if (r.ok) {
    //             r.json().then((updatedRestaurant) => {
    //                 (setRestaurant(updatedRestaurant))
    //             });
    //         } else {
    //             r.json().then((err) => setErrors(err.errors))
    //         }
    //     })
    //     // .then((r) => r.json())
    //     // .then((updatedRestaurant) => (setRestaurant(updatedRestaurant)))
    // }


    // MAPPPPPPPPPPPPPPPPPPPPPPPP

//     mapboxgl.accessToken = 'pk.eyJ1Ijoia3lsZXRpbGxzb24iLCJhIjoiY2w4bWY1aThtMGV1dTNubXlpbTh0cDI4eSJ9.MqRCL4Aiv3OYWHQEZfrU8A';

// console.log(restaurant.latitude)

//     const mapContainer = useRef(null);
// const map = useRef(null);
// const [lng, setLng] = useState(restaurant.longitude);
// const [lat, setLat] = useState(restaurant.latitude);
// const [zoom, setZoom] = useState(9);
 
// useEffect(() => {
// if (map.current) return; // initialize map only once
// map.current = new mapboxgl.Map({
// container: mapContainer.current,
// style: 'mapbox://styles/mapbox/streets-v11',
// center: [lng, lat],
// zoom: zoom
// });
// });
 
// useEffect(() => {
// if (!map.current) return; // wait for map to initialize
// map.current.on('move', () => {
// setLng(map.current.getCenter().lng.toFixed(4));
// setLat(map.current.getCenter().lat.toFixed(4));
// setZoom(map.current.getZoom().toFixed(2));
// });
// });

// const [likes, setLikes] = useState(0)

// function addLikes() {
//     fetch(`/restaurants/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-type": "application/json"
//       },
//       body: JSON.stringify({
//         likes: likes +1,
//       }),
//     })
//     .then((r) => r.json())
//     .then((data) => setLikes(data))
//   }
// const [count, setCount] = useState(0);

//   let incrementCount = () => {
//     setCount(count + 1);
//   };


const handleClick = () => {
    navigate("/request_change")
}

// const menu = () => {
//   navigate({restaurant.menu})
// }


    
  return (
    <>
    
            
                <h1 className='title'>{restaurant.name}</h1>
                <img className='img' src={restaurant.image_url} alt={restaurant.name} />
                <h1 className='h4'>Cuisine: {restaurant.cuisine}</h1>
                <h1 className='h3'>Price: {restaurant.price}</h1>
                <h1 className='h4'>Average rating: {restaurant.rating}</h1>
                <h1 className='h4'>Phone: {restaurant.display_phone}</h1>
                <h1 className='h4'>Address: {restaurant.display_address}</h1>
                <button className='button' onClick={add}>Favorite</button>
                <br></br>
                <br></br>
                <a className='button-delete' href={restaurant.menu}>Menu</a>
                <h3>Reviews</h3>
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
