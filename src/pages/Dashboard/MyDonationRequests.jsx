import React, { useEffect, useState } from "react";
import { useAuth } from "../../provider/AuthProvider";
import { motion } from "framer-motion";
import {
  Droplet,
  MapPin,
  Hospital,
  Calendar,
  MessageCircle,
  Filter,
} from "lucide-react";

const STATUS_COLORS = {
  pending: "bg-yellow-500",
  inprogress: "bg-blue-500",
  done: "bg-green-500",
  canceled: "bg-red-500",
};

const MyDonationRequests = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    const fetchDonations = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("redsaver_token");

        const res = await fetch(
          `https://red-saver-server.vercel.app/donations?email=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch donations");

        const data = await res.json();
        setDonations(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch Donations Error:", err);
        setDonations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [user]);

  if (loading) {
    return (
      <p className="p-6 text-center text-lg font-semibold text-gray-400 animate-pulse">
        Loading donation requests...
      </p>
    );
  }

  if (!donations.length) {
    return (
      <p className="p-6 text-center text-lg font-semibold text-gray-400">
        No donation requests found.
      </p>
    );
  }

  const filteredDonations = statusFilter
    ? donations.filter((d) => d.status === statusFilter)
    : donations;

  const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);
  const paginatedDonations = filteredDonations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 text-center text-red-500"
      >
        My Donation Requests
      </motion.h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="text-red-400" size={18} />
          <select
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500"
            value={statusFilter}
            onChange={(e) => {
              setCurrentPage(1);
              setStatusFilter(e.target.value);
            }}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        <p className="text-gray-400">
          Total Requests: {filteredDonations.length}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedDonations.map((donation, index) => {
          const status = donation.status || "pending";

          return (
            <motion.div
              key={donation._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-5 hover:shadow-red-500/20 transition-all"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-lg text-red-400">
                    {donation.recipientName}
                  </h2>
                  <span
                    className={`text-white text-xs px-3 py-1 rounded-full ${STATUS_COLORS[status]}`}
                  >
                    {status.toUpperCase()}
                  </span>
                </div>

                <p className="text-sm text-gray-300 flex items-center gap-2">
                  <Droplet size={16} className="text-red-400" />
                  {donation.bloodGroup}
                </p>

                <p className="text-sm text-gray-300 flex items-center gap-2">
                  <MapPin size={16} />
                  {donation.district}, {donation.region}
                </p>

                <p className="text-sm text-gray-300 flex items-center gap-2">
                  <Hospital size={16} />
                  {donation.hospital}
                </p>

                <p className="text-sm text-gray-300 flex items-center gap-2">
                  <Calendar size={16} />
                  {donation.donationDate} at {donation.donationTime}
                </p>

                <p className="text-sm text-gray-400 flex items-start gap-2">
                  <MessageCircle size={16} />
                  {donation.message}
                </p>

                <p className="text-xs text-gray-500">
                  Requested on:{" "}
                  {donation.createdAt
                    ? new Date(donation.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentPage === i + 1
                  ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDonationRequests;
