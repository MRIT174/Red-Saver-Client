import React, { useEffect, useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { useLoaderData } from "react-router";
import { User, MapPin, Map, Droplet, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

const Profile = () => {
  const { user, setUser } = useAuth();
  const serviceCenters = useLoaderData();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    region: "",
    district: "",
    covered_area: "",
    bloodGroup: "",
  });

  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [coveredAreas, setCoveredAreas] = useState([]);

  // Fetch user data from server
  useEffect(() => {
    if (!user?.email) return;
    const fetchUser = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("redsaver_token");
        const res = await fetch(
          `https://red-saver-server.vercel.app/users/${user.email}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUserData(data);
        setFormData({
          name: data.name || "",
          avatar: data.avatar || "",
          region: data.region || "",
          district: data.district || "",
          covered_area: data.covered_area || "",
          bloodGroup: data.bloodGroup || "",
        });
        if (setUser) setUser((prev) => ({ ...prev, ...data }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [user?.email, setUser]);

  // Update filtered districts based on region
  useEffect(() => {
    if (!formData.region) {
      setFilteredDistricts([]);
      setCoveredAreas([]);
      setFormData((prev) => ({ ...prev, district: "", covered_area: "" }));
      return;
    }
    const districts = serviceCenters
      .filter((s) => s.region === formData.region)
      .map((s) => s.district);
    setFilteredDistricts([...new Set(districts)]);
  }, [formData.region, serviceCenters]);

  // Update covered areas based on district
  useEffect(() => {
    if (!formData.district) {
      setCoveredAreas([]);
      setFormData((prev) => ({ ...prev, covered_area: "" }));
      return;
    }
    const districtData = serviceCenters.find(
      (s) => s.region === formData.region && s.district === formData.district
    );
    setCoveredAreas(districtData?.covered_area || []);
    setFormData((prev) => ({
      ...prev,
      covered_area: prev.covered_area || districtData?.covered_area?.[0] || "",
    }));
  }, [formData.district, formData.region, serviceCenters]);

  if (!user || loading)
    return (
      <p className="text-center mt-20 text-gray-400 text-lg animate-pulse">
        Loading profile...
      </p>
    );

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const token = localStorage.getItem("redsaver_token");
      const res = await fetch(
        `https://red-saver-server.vercel.app/users/${user.email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) throw new Error("Failed to update profile");
      const result = await res.json();
      setUserData(formData);
      if (setUser) {
        setUser((prev) => ({ ...prev, ...formData }));
        localStorage.setItem("redsaver_user", JSON.stringify({ ...user, ...formData }));
      }
      setIsEditing(false);
      alert(result.message || "Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Update failed: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gray-900 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-md bg-gray-800 rounded-3xl shadow-2xl p-8 text-gray-200"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-red-500 mb-4">
            <img
              src={
                userData?.avatar ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold text-red-500">{userData?.name}</h1>
          <p className="text-gray-400 flex items-center gap-1">
            <UserCheck size={16} /> {user.email}
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="font-semibold flex items-center gap-1 text-gray-400">
              <Map size={16} /> Region
            </span>
            <span className="text-gray-200">{userData?.region}</span>
          </div>
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="font-semibold flex items-center gap-1 text-gray-400">
              <MapPin size={16} /> District
            </span>
            <span className="text-gray-200">{userData?.district}</span>
          </div>
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="font-semibold flex items-center gap-1 text-gray-400">
              <Droplet size={16} /> Covered Area
            </span>
            <span className="text-gray-200">{userData?.covered_area}</span>
          </div>
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="font-semibold flex items-center gap-1 text-gray-400">
              <User size={16} /> Blood Group
            </span>
            <span className="text-gray-200">{userData?.bloodGroup}</span>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="btn btn-error w-full text-white hover:scale-105 transition-transform duration-300"
        >
          Edit Profile
        </button>

        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <motion.div
              className="bg-gray-800 rounded-3xl w-full max-w-md p-6 shadow-2xl text-gray-200"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-red-500 text-center">
                Update Profile
              </h2>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-3 text-red-500" size={18} />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="input input-bordered w-full pl-10 bg-gray-700 text-gray-200 border-gray-600"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Avatar URL"
                  className="input input-bordered w-full bg-gray-700 text-gray-200 border-gray-600"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                />
                <select
                  className="select select-bordered w-full bg-gray-700 text-gray-200 border-gray-600"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                >
                  <option value="">Select Region</option>
                  {[...new Set(serviceCenters.map((s) => s.region))].map((r, i) => (
                    <option key={r + i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <select
                  className="select select-bordered w-full bg-gray-700 text-gray-200 border-gray-600"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  disabled={!filteredDistricts.length}
                >
                  <option value="">Select District</option>
                  {filteredDistricts.map((d, i) => (
                    <option key={d + i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <select
                  className="select select-bordered w-full bg-gray-700 text-gray-200 border-gray-600"
                  value={formData.covered_area}
                  onChange={(e) => setFormData({ ...formData, covered_area: e.target.value })}
                  disabled={!coveredAreas.length}
                >
                  <option value="">Select Covered Area</option>
                  {coveredAreas.map((a, i) => (
                    <option key={a + i} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Blood Group"
                  className="input input-bordered w-full bg-gray-700 text-gray-200 border-gray-600"
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                />
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn btn-outline w-1/2 border-gray-500 text-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="btn btn-error w-1/2 text-white"
                  >
                    {updating ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Profile;
