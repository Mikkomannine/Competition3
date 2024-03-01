import { useSignup } from "../hooks/useSignup";
import { useField } from "../hooks/useField";

const Signup = () => {
  const email = useField("email");
  const password = useField("password");
  // Add necessary code here
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email.value, password.value); // make necessary modification
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label>Email address:</label>
      <input {...email} />
      <label>Password:</label>
      <input {...password} />
      const password = useField("password");
      {/* Add necessary code here */}
      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;