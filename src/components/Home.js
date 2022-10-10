function Home({ user }) {
    if (user) {
      return <><h1>Hello,   {user.username}! Welcome to the Restaurant Review site!</h1>
      </>
    } else {
      return <h1>Please Log In or Sign Up</h1>;
    }
  }
  
  export default Home;