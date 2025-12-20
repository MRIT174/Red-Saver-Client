import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function PendingDonationRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllRequests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("redsaver_token");
      if (!token) throw new Error("Token not found");

      const res = await api.get("/donations", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const allDonations = Array.isArray(res.data) ? res.data : [];

      const pendingRequests = allDonations.filter(
        (d) => d.status === "pending"
      );

      setRequests(pendingRequests);
    } catch (err) {
      console.error("Failed to fetch donations:", err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRequests();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-red-500"></span>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No pending donation requests found
      </p>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-red-500">
        Pending Blood Donation Requests
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((req) => (
          <div
            key={req._id}
            className="card bg-base-100 shadow-md border hover:shadow-xl transition duration-300"
          >
            <div className="card-body space-y-2">
              <h3 className="text-xl font-bold text-red-500">
                {req.title || req.recipientName || "No Title"}
              </h3>

              <div className="flex flex-wrap gap-2 text-sm">
                <span className="badge badge-error badge-outline">
                  {req.bloodGroup || "N/A"}
                </span>
                <span className="badge badge-success badge-outline">
                  {req.region || "N/A"}
                </span>
                <span className="badge badge-success badge-outline">
                  {req.district || "N/A"}
                </span>
              </div>

              {req.email && (
                <p className="text-sm text-gray-700">
                  <strong>Email:</strong> {req.email || req.requesterEmail}
                </p>
              )}

              <p className="text-sm text-gray-700">
                <strong>Status:</strong>{" "}
                <span className="badge badge-warning capitalize">
                  {req.status || "pending"}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
