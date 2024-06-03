const Login = () => {
  return (
    <div
      className="card w-96 bg-primary-content
    "
    >
      <div className="card-body">
        {" "}
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-primary"> Whisper</span>
        </h1>
        <form>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
            />
          </div>
          <a
            href="#"
            className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </a>

          <div>
            <button className="btn btn-block btn-sm mt-2 bg-secondary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
