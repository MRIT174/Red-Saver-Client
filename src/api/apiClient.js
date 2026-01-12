import axios from "axios";
import { auth } from "../firebaseConfig";

const api = axios.create({
  baseURL: "https://red-saver-server.vercel.app",
});

api.interceptors.request.use(async (config) => {
  let token = null;

  if (auth.currentUser) {
    token = await auth.currentUser.getIdToken();
  } else {
    token = localStorage.getItem("redsaver_token");
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("redsaver_token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
