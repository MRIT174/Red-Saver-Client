import React, { useState } from "react";
import { useAuth } from "../../provider/AuthProvider";

/* ================= DATA ================= */
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const divisionsData = {
  Dhaka: [
    "Dhaka",
    "Gazipur",
    "Narayanganj",
    "Tangail",
    "Manikganj",
    "Munshiganj",
    "Narsingdi",
    "Faridpur",
    "Gopalganj",
    "Madaripur",
    "Rajbari",
    "Shariatpur",
    "Kishoreganj",
  ],
  Chattogram: [
    "Chattogram",
    "Cox's Bazar",
    "Comilla",
    "Feni",
    "Noakhali",
    "Brahmanbaria",
    "Chandpur",
    "Lakshmipur",
    "Rangamati",
    "Bandarban",
    "Khagrachhari",
  ],
  Rajshahi: [
    "Rajshahi",
    "Bogura",
    "Pabna",
    "Sirajganj",
    "Naogaon",
    "Natore",
    "Joypurhat",
    "Chapainawabganj",
  ],
  Khulna: [
    "Khulna",
    "Jessore",
    "Satkhira",
    "Bagerhat",
    "Jhenaidah",
    "Magura",
    "Narail",
    "Kushtia",
    "Chuadanga",
    "Meherpur",
  ],
  Barishal: [
    "Barishal",
    "Bhola",
    "Patuakhali",
    "Pirojpur",
    "Jhalokathi",
    "Barguna",
  ],
  Sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
  Rangpur: [
    "Rangpur",
    "Dinajpur",
    "Kurigram",
    "Gaibandha",
    "Nilphamari",
    "Panchagarh",
    "Thakurgaon",
    "Lalmonirhat",
  ],
  Mymensingh: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
};

/* ================= COMPONENT ================= */
const CreateDonationRequest = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    recipientName: "",
    bloodGroup: "",
    division: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Division change হলে district reset
    if (name === "division") {
      setFormData({
        ...formData,
        division: value,
        district: "",
      });
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
        division: "",
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

        {/* Division */}
        <select
          name="division"
          value={formData.division}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Division</option>
          {Object.keys(divisionsData).map((div) => (
            <option key={div} value={div}>
              {div}
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
          disabled={!formData.division}
        >
          <option value="">Select District</option>
          {formData.division &&
            divisionsData[formData.division].map((dist) => (
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
