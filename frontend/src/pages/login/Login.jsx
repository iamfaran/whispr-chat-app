import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Send login request to your backend API
      const response = await axios.post("/api/auth/login", data);

      // Assuming your API returns user data on successful login
      if (response.status === 200) {
        login(response.data); // Update user context on successful login
        navigate("/"); // Redirect to home page
      }
    } catch (error) {
      // Handle login errors (e.g., invalid credentials)
      console.error("Login error:", error);
    }
  };

  // If user is already logged in, redirect to home
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="card w-96 bg-primary-content">
      <div className="card-body">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login <span className="text-primary">Whisper</span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className={`w-full input input-bordered h-10 ${
                errors.username && "input-error"
              }`}
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="text-error text-sm">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className={`w-full input input-bordered h-10 ${
                errors.password && "input-error"
              }`}
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-error text-sm">{errors.password.message}</p>
            )}
          </div>

          <a
            href="#"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </a>

          <button
            className="btn btn-block btn-sm mt-2 bg-secondary"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
