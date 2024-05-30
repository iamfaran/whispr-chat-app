const login = (req, res) => {
  res.send("Login route");
};

const register = (req, res) => {
  res.send("Register route");
};

const logout = (req, res) => {
  res.send("Logout route");
};

export { login, register, logout };
