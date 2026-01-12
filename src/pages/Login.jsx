import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router";
import { useAuth } from "../provider/AuthProvider";
import api from "../api/apiClient";
import Swal from "sweetalert2"; // <-- import SweetAlert2

export default function Login() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "admin") nav("/admin", { replace: true });
      else if (user.role === "volunteer") nav("/volunteer", { replace: true });
      else nav("/dashboard", { replace: true });
    }
  }, [user, nav]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);

      const token = await cred.user.getIdToken();
      localStorage.setItem("redsaver_token", token);

      await api.post("/users", {
        email: cred.user.email,
        name: cred.user.displayName || "",
        avatar: cred.user.photoURL || "",
      });

      const res = await api.get(`/users/${cred.user.email}`);
      const dbUser = res.data;

      if (dbUser?.role === "admin") nav("/admin", { replace: true });
      else if (dbUser?.role === "volunteer") nav("/volunteer", { replace: true });
      else nav("/dashboard", { replace: true });

    } catch (err) {
      console.error(err);

      // SweetAlert2 for login errors
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message || "Incorrect email or password",
        confirmButtonText: "Ok",
        timer: 3000,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
        <img
          src="https://img.freepik.com/premium-vector/blood-donation-illustration-concept-social-media-post_562076-1166.jpg"
          className="rounded-lg shadow-lg max-w-md"
        />

        <form
          onSubmit={handleLogin}
          className="card w-full max-w-md bg-base-100 shadow-xl p-6"
        >
          <h2 className="text-3xl font-bold text-center text-error mb-6">
            Login
          </h2>

          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full mb-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`btn btn-primary w-full ${loading && "loading"}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
