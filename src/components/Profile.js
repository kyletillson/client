import React from 'react'

export default function profile({ user }) {
    if (user) {
        return <><h1>Hello,   {user.username}! Welcome to your profile!</h1> <img className="image" src={user.image_url} alt={user.username} ></img>
        <h4 className="h4">{user.bio}</h4>
        </>
      } else {
        return <h1>Please Log In or Sign Up</h1>;
      }
}
