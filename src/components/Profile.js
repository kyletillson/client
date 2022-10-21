import React, {useState} from 'react'
import { useParams } from "react-router-dom"
import { Error } from '../styles'

export default function Profile({ user, setUser }) {

  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")
  const [password, setPassword] = useState("")
  const [password_confirmation, setPassword_Confirmation] = useState("")
  const [image_url, setImage_url] = useState("")
  // const [updatedUser, setUpdatedUser] = useState([])
  const [users, setUsers] = useState([])
  const [errors, setErrors] = useState([]);


  const { id } = useParams()

//   function onUpdateUser(updatedUsers) {
//     const updatedUserPage = [...updatedUser, updatedUsers]
//     setUpdatedUser(updatedUserPage)
// }

  function onDeleteUser() {
    const deleteUser = users.filter((user) => user.id !== id)
    setUsers(deleteUser)
  }

  function handleDeleteClick() {
    fetch("/delete", {
      method: "DELETE",
    })
    onDeleteUser()
  }


  function handleUpdate (e) {
    e.preventDefault();
    setUsername("");
    setBio("");
    setPassword("");
    setPassword_Confirmation("");
    setImage_url("");
    fetch("/update", {
        method: "PATCH",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            id: id,
            username: username,
            password: password,
            password_confirmation: password_confirmation,
            image_url: image_url,
            bio: bio,
        }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((updatedUser) => {
          (setUser(updatedUser))
        });
      } else {
        r.json().then((err) => setErrors(err.errors))
      }
    })
    // .then((r) => r.json())
    // .then((updatedUser) => (setUser(updatedUser)))
}
    if (user) {
        return <>
        
        <div className='text-centered'>
        <h1>Hello,   {user.username}! Welcome to your profile!</h1>
        <img className="image text-centered" src={user.image_url} alt={user.username} />
        <h4 className="h4">Bio: {user.bio}</h4>
        </div>
        <div className='box'>
          <h1 className='login'>Edit Profile</h1>
          <div>
          <form onSubmit={handleUpdate}>
          <div className="input-container">
            <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" name='Username' placeholder='Username'/>
            </div>
            
            
            <div className="input-container">
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name='Password' placeholder='Password'/>
            </div>
            
            
            <div className="input-container">
            <input onChange={(e) => setPassword_Confirmation(e.target.value)} value={password_confirmation} type="password" name='Password Confirmation' placeholder='Password Confirmation'/>
            </div>
            
            <div className="input-container">
            <input onChange={(e) => setImage_url(e.target.value)} value={image_url} type="text" name='Profile Image' placeholder='Profile Image'/>
            </div>
            
            <div className="input-container">
            <input onChange={(e) => setBio(e.target.value)} value={bio} type="text" name='Bio' placeholder='Bio'/>
            </div>
            
            <div className='text-centered'>
            <button className='button' type='submit'>Update Profile</button>
            </div>
            {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))}
          </form>
          
          <br></br>
          <div className='text-centered'>
          <button className='button' onClick={handleDeleteClick}>Delete Account</button>
          </div>
          
          </div>

        </div>
        
        </>
      } else {
        return <div className='text-centered'> <h1>Please Log In or Sign Up</h1> </div>;
      }
}
