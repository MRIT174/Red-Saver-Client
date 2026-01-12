import React, { useState, useEffect } from "react";
import { useAuth } from "../../provider/AuthProvider";
import { User, Droplet, Hospital, MapPin, Calendar, Clock, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const CreateDonationRequest = () => {
  const { user } = useAuth();
  const [geoData, setGeoData] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [formData, setFormData] = useState({
    recipientName: "",
    bloodGroup: "",
    region: "",
    district: "",
    hospital: "",
    address: "",
    donationDate: "",
    donationTime: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch("/serviceCenters.json")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Failed to load geo data", err));
  }, []);

  useEffect(() => {
    if (!formData.region) {
      setDistricts([]);
      setFormData((prev) => ({ ...prev, district: "" }));
      return;
    }
    const filteredDistricts = geoData
      .filter((g) => g.region === formData.region)
      .map((g) => g.district);
    setDistricts(filteredDistricts);
    setFormData((prev) => ({ ...prev, district: "" }));
  }, [formData.region, geoData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) =>
      name === "region" ? { ...prev, region: value, district: "" } : { ...prev, [name]: value }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!user?.email) return setError("User not logged in");
    const token = localStorage.getItem("redsaver_token");
    if (!token) return setError("Token not found. Please login again.");

    const donationData = { ...formData, requesterEmail: user.email, status: "pending", createdAt: new Date() };

    try {
      setLoading(true);
      const res = await fetch("https://red-saver-server.vercel.app/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(donationData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create request");

      setSuccess("Donation request created successfully ✅");
      setFormData({
        recipientName: "",
        bloodGroup: "",
        region: "",
        district: "",
        hospital: "",
        address: "",
        donationDate: "",
        donationTime: "",
        message: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto p-6 bg-gray-800 text-gray-100 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-red-500">Create Donation Request</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}
      {success && <p className="text-green-500 mb-3">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-3 text-red-500" size={18} />
          <input
            name="recipientName"
            placeholder="Recipient Name"
            value={formData.recipientName}
            onChange={handleChange}
            className="input input-bordered w-full pl-10 bg-gray-700 text-white border-gray-600 focus:border-red-500 focus:ring focus:ring-red-400"
            required
          />
        </div>

        <div className="relative">
          <Droplet className="absolute left-3 top-3 text-red-500" size={18} />
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="select select-bordered w-full pl-10 bg-gray-700 text-white border-gray-600 focus:border-red-500 focus:ring focus:ring-red-400"
            required
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-3 text-red-500" size={18} />
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="select select-bordered w-full pl-10 bg-gray-700 text-white border-gray-600 focus:border-red-500 focus:ring focus:ring-red-400"
              required
            >
              <option value="">Select Region</option>
              {[...new Set(geoData.map((g) => g.region))].map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-3 text-red-500" size={18} />
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="select select-bordered w-full pl-10 bg-gray-700 text-white border-gray-600 focus:border-red-500 focus:ring focus:ring-red-400"
              required
              disabled={!districts.length}
            >
              <option value="">Select District</option>
              {districts.map((dist) => <option key={dist} value={dist}>{dist}</option>)}
            </select>
          </div>
        </div>

        <div className="relative">
          <Hospital className="absolute left-3 top-3 text-red-500" size={18} />
          <input
            name="hospital"
            placeholder="Hospital Name"
            value={formData.hospital}
            onChange={handleChange}
            className="input input-bordered w-full pl-10 bg-gray-700 text-white border-gray-600 focus:border-red-500 focus:ring focus:ring-red-400"
            required
          />
        </div>

        <div className="relative">
          <MapPin className="absolute left-3 top-3 text-red-500" size={18} />
          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="input input-bordered w-full pl-10 bg-gray-700 text-white border-gray-600 focus:border-red-500 focus:ring focus:ring-red-400"
            required
          />
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Calendar className="absolute left-3 top-3 text-red-500" size={18} />
            <input
              type="date"
              name="donationDate"
              value={formData.donationDate}
              onChange={handleChange}
              className="input input-bordered w-full pl-10 bg-gray-700 text-white border-gray-600 focus:border-red-500 focus:ring focus:ring-red-400"
              required
            />
          </div>
          <div className="relative flex-1">
            <Clock className="absolute left-3 top-3 text-red-500" size={18} />
            <input
              type="time"
              name="donationTime"
              value={formData.donationTime}
              onChange={handleChange}
              className="input input-bordered w-full pl-10 bg-gray-700 text-white border-gray-600 focus:border-red-500 focus:ring focus:ring-red-400"
              required
            />
          </div>
        </div>

        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 text-red-500" size={18} />
          <textarea
            name="message"
            placeholder="Message (optional)"
            value={formData.message}
            onChange={handleChange}
            className="textarea textarea-bordered w-full pl-10 bg-gray-700 text-white border-gray-600 focus:border-red-500 focus:ring focus:ring-red-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-error w-full text-white hover:scale-105 transition-transform duration-300"
        >
          {loading ? "Submitting..." : "Create Request"}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateDonationRequest;
