import React, { useState } from "react";

export default function AddReview({ id }) {
    const [newReview, setNewReview] = useState({
        comment: "",
        user_id: localStorage.getItem("signedIn"),
        restaurant_id: id,
    })

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setNewReview({ ...newReview, [name]: value })
    }

    function handleSubmit(event) {
        event.preventDefault()
        fetch('/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newReview)
        })
            .then(res => res.json())
            .then(data => console.log(data))
        window.location.reload(false)
    }

  return (
    <>
    <div>AddReview</div>
    <form onSubmit={handleSubmit}>
        <label>Comment</label>
        <input type="text" name="comment" onChange={handleChange}/>
        <button className="button" type="submit" >submit</button>

    </form>
    </>
  )
}
