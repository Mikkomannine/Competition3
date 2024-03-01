import { useSignup } from "../hooks/useSignup";
import { useField } from "../hooks/useField";

const Signup = () => {
  const username = useField("username");
  const email = useField("email");
  const password = useField("password");
  const dateOfBirth = useField("date");
  const phonenumber = useField("phonenumber");
  // Add necessary code here
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username.value, email.value, password.value, dateOfBirth.value, phonenumber.value);
    await signup(username.value, email.value, password.value, dateOfBirth.value, phonenumber.value); // make necessary modification
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label>Username:</label>
      <input {...username} />
      <label>Email address:</label>
      <input {...email} />
      <label>Password:</label>
      <input {...password} />
      <label>Date of Birth:</label>
      <input {...dateOfBirth} />
      <label>Phone Number:</label>
      <input {...phonenumber} />
      
      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;