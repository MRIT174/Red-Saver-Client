import React, { useState, useEffect } from "react";
import { useAuth } from "../../provider/AuthProvider";

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

  // Load geo data from serviceCenters.json
  useEffect(() => {
    fetch("/serviceCenters.json")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Failed to load geo data", err));
  }, []);

  // Update districts whenever region changes
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

    // Reset district if region changes
    if (name === "region") {
      setFormData({ ...formData, region: value, district: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user?.email) {
      setError("User not logged in");
      return;
    }

    const token = localStorage.getItem("redsaver_token");
    if (!token) {
      setError("Token not found. Please login again.");
      return;
    }

    const donationData = {
      ...formData,
      requesterEmail: user.email,
      status: "pending",
      createdAt: new Date(),
    };

    try {
      setLoading(true);

      const res = await fetch(
        "https://red-saver-server.vercel.app/donations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(donationData),
        }
      );

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
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-4">
        Create Donation Request
      </h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}
      {success && <p className="text-green-500 mb-3">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="recipientName"
          placeholder="Recipient Name"
          value={formData.recipientName}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        {/* Blood Group */}
        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Blood Group</option>
          {bloodGroups.map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        {/* Region */}
        <select
          name="region"
          value={formData.region}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Region</option>
          {[...new Set(geoData.map((g) => g.region))].map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>

        {/* District */}
        <select
          name="district"
          value={formData.district}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
          disabled={!districts.length}
        >
          <option value="">Select District</option>
          {districts.map((dist) => (
            <option key={dist} value={dist}>
              {dist}
            </option>
          ))}
        </select>

        <input
          name="hospital"
          placeholder="Hospital Name"
          value={formData.hospital}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          type="date"
          name="donationDate"
          value={formData.donationDate}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          type="time"
          name="donationTime"
          value={formData.donationTime}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <textarea
          name="message"
          placeholder="Message (optional)"
          value={formData.message}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="btn btn-error w-full text-white"
        >
          {loading ? "Submitting..." : "Create Request"}
        </button>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
