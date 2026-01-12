import axios from "axios";
import { auth } from "../firebaseConfig";


const api = axios.create({
  baseURL: "https://red-saver-server.vercel.app",
  timeout: 15000,
});


api.interceptors.request.use(
  async (config) => {
    try {
      let token = null;


      if (auth.currentUser) {
        token = await auth.currentUser.getIdToken();
      } else {

        token = localStorage.getItem("redsaver_token");
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.warn("Token attach failed");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;

    if (status === 401) {
      try {
        await auth.signOut();
      } catch {}

      localStorage.removeItem("redsaver_token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
