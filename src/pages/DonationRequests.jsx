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

  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-slate-950">
        <span className="loading loading-spinner loading-lg text-red-500"></span>
      </div>
    );
  }

  /* ---------- Empty ---------- */
  if (requests.length === 0) {
    return (
      <div className="text-center mt-20">
        <p className="text-slate-400 text-lg">
          No pending donation requests found
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-14 ">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* ---------- Title ---------- */}
        <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
          Pending Blood Donation Requests
        </h1>

        {/* ---------- Cards ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {requests.map((req) => (
            <div
              key={req._id}
              className="group relative bg-slate-900/60 backdrop-blur-md border border-slate-700/40 rounded-2xl p-6 hover:border-red-500/40 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300"
            >
              {/* Blood Group Badge */}
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-red-600 to-red-500 text-white">
                  {req.bloodGroup || "N/A"}
                </span>

                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-400 capitalize">
                  {req.status || "pending"}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition">
                {req.title || req.recipientName || "No Title"}
              </h3>

              {/* Location */}
              <div className="flex flex-wrap gap-2 text-sm mb-4">
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300">
                  {req.region || "N/A"}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300">
                  {req.district || "N/A"}
                </span>
              </div>

              {/* Email */}
              {req.email && (
                <p className="text-sm text-slate-400 break-all">
                  <span className="font-semibold text-slate-300">
                    Email:
                  </span>{" "}
                  {req.email || req.requesterEmail}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
