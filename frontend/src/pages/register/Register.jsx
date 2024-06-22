import { useForm } from "react-hook-form";
import useSignup from "../../hooks/useSignup";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const { signup } = useSignup();

  const onSubmit = async (data) => {
    // Handle form submission here (e.g., send data to your API)
    const response = await signup(data);
  };

  return (
    <div className="card w-96 bg-primary-content">
      <div className="card-body">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-primary">Whispr</span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className={`w-full input input-bordered h-10 ${
                errors.fullName && "input-error"
              }`}
              {...register("fullName", { required: "Full name is required" })}
            />
            {errors.fullName && (
              <p className="text-error text-sm">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="johndoe"
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

          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className={`w-full input input-bordered h-10 ${
                errors.confirmPassword && "input-error"
              }`}
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-error text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* RADIO BUTTONS */}
          <div className="flex">
            <div className="form-control">
              <label className="label cursor-pointer gap-2">
                <span className="label-text">Male</span>
                <input
                  type="radio"
                  value="male"
                  {...register("gender")}
                  className="radio checked:bg-primary"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer gap-2">
                <span className="label-text">Female</span>
                <input
                  type="radio"
                  value="female"
                  {...register("gender")}
                  className="radio checked:bg-primary"
                />
              </label>
            </div>
          </div>

          <Link
            to="/login"
            className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Already have an account?
          </Link>

          <button
            className="btn btn-block btn-sm mt-2 bg-secondary"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
