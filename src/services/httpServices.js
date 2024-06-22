const { default: axios } = require("axios");

const http = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

const api = {
  post: http.post,
  get: http.get,
  put: http.put,
  patch: http.patch,
  delete: http.delete,
};

export default api;

// we have to set refresh token interceptors later
