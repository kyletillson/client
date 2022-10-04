function Home({ user }) {
    if (user) {
      return <><h1>Hello,   {user.username}! Welcome to the Restaurant Review site!</h1> <img className="image" src={user.image_url} ></img>
      <h4 className="h4">{user.bio}</h4>
      </>
    } else {
      return <h1>Please Login or Sign Up</h1>;
    }
  }
  
  export default Home;