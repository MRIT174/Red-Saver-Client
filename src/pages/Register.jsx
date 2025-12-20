import React, { useEffect, useState, useMemo } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate, useLoaderData } from "react-router";
import api from "../api/apiClient";

export default function Register() {
  const navigate = useNavigate();

  // Load service centers from loader
  const serviceCenters = useLoaderData();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    bloodGroup: "A+",
    division: "",
    district: "",
    avatar: "",
  });

  const [filteredDistricts, setFilteredDistricts] = useState([]);

  // Get unique divisions (regions)
  const divisions = useMemo(() => {
    return [...new Set(serviceCenters.map((s) => s.region))];
  }, [serviceCenters]);

  // Update filtered districts when division changes
  useEffect(() => {
    if (!form.division) {
      setFilteredDistricts([]);
      setForm((prev) => ({ ...prev, district: "" }));
      return;
    }

    const districts = serviceCenters
      .filter((s) => s.region === form.division)
      .map((s) => s.district);

    setFilteredDistricts([...new Set(districts)]);
    setForm((prev) => ({ ...prev, district: "" }));
  }, [form.division, serviceCenters]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { name, email, password, bloodGroup, division, district, avatar } =
        form;

      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, {
        displayName: name,
        photoURL: avatar || "",
      });

      const token = await cred.user.getIdToken();
      localStorage.setItem("redsaver_token", token);

      // Save to backend
      await api.post("/users", {
        name,
        email,
        bloodGroup,
        division,
        district,
        avatar,
      });

      alert("Registration successful");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow p-6"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        <input
          className="input input-bordered w-full mb-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          className="input input-bordered w-full mb-2"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          className="input input-bordered w-full mb-2"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <select
          className="select select-bordered w-full mb-2"
          value={form.bloodGroup}
          onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}
        >
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        {/* Divisions */}
        <select
          className="select select-bordered w-full mb-2"
          value={form.division}
          onChange={(e) => setForm({ ...form, division: e.target.value })}
          required
        >
          <option value="">Select Division</option>
          {divisions.map((d, idx) => (
            <option key={d + idx} value={d}>
              {d}
            </option>
          ))}
        </select>

        {/* Districts */}
        <select
          className="select select-bordered w-full mb-2"
          value={form.district}
          disabled={!filteredDistricts.length}
          onChange={(e) => setForm({ ...form, district: e.target.value })}
          required
        >
          <option value="">Select District</option>
          {filteredDistricts.map((d, idx) => (
            <option key={d + idx} value={d}>
              {d}
            </option>
          ))}
        </select>

        <input
          className="input input-bordered w-full mb-3"
          placeholder="Avatar URL (optional)"
          value={form.avatar}
          onChange={(e) => setForm({ ...form, avatar: e.target.value })}
        />

        <button className="btn btn-primary w-full">Register</button>
      </form>
    </div>
  );
}
