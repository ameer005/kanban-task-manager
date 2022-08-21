import axios from "axios";

let token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "/api/v1",
});

api.interceptors.request.use(
  (config) => {
    token = localStorage.getItem("token");
    config.headers.common["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error.response);
    if (error.response.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default api;
