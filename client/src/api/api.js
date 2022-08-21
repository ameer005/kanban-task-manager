import axios from "axios";

let token = JSON.parse(localStorage.getItem("token"));

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api/v1",
});

api.interceptors.request.use(
  (config) => {
    token = JSON.parse(localStorage.getItem("token"));
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
