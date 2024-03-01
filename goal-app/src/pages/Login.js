const Login = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;

    try {
      // Send a POST request to the login endpoint
      const loginResponse = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (loginResponse.ok) {
        // Login successful, redirect or perform any other actions
        console.log('Login successful');
      } else {
        // Login failed, handle the error
        console.error('Login failed');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('An error occurred', error);
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

      <label>Username:</label>
      <input type="text" name="username" />
      <label>Password:</label>
      <input type="password" name="password" />

      <button type="submit">Log in</button>
    </form>
  );
};

export default Login;

