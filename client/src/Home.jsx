function Home({ user }) {
    if(user) {
        return <h1>Welcome, {user.username}!</h1>;
    }
    else {
        return <h1>Budget Application Details</h1>
    }
}

export default Home;