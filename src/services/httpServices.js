const { default: axios } = require("axios");
// const baseURL =
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:3000/api"
//     : process.env.NEXT_PUBLIC_API_URL;
// const http = axios.create({
//   baseURL,
//   withCredentials: true,
// });
const baseURL ="http://localhost:3000/api"
const http = axios.create({
  baseURL,
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

//  refresh token interceptors
