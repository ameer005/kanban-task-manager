import api from "../../../api/api";

const signup = async (user) => {
  const { data } = await api.post("/auth/signup", user);

  return data;
};

const login = async (user) => {
  const { data } = await api.post("/auth/login", user);

  if (data) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.data.user));
  }

  return data;
};

const authService = {
  signup,
  login,
};

export default authService;
