import React, { useEffect, useState } from "react";
import { useAuth } from "../../provider/AuthProvider";
<<<<<<< HEAD
import { motion } from "framer-motion";
import {
  Droplet,
  MapPin,
  Hospital,
  Calendar,
  MessageCircle,
  Filter,
} from "lucide-react";
=======
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e

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
<<<<<<< HEAD
          `https://red-saver-server.vercel.app/donations?email=${user.email}`,
=======
          `https://red-saver-server.vercel.app/donations?email=${user.email}`, // fixed URL
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
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
<<<<<<< HEAD
      <p className="p-6 text-center text-lg font-semibold text-gray-400 animate-pulse">
=======
      <p className="p-6 text-center text-lg font-semibold">
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
        Loading donation requests...
      </p>
    );
  }

  if (!donations.length) {
    return (
<<<<<<< HEAD
      <p className="p-6 text-center text-lg font-semibold text-gray-400">
=======
      <p className="p-6 text-center text-lg font-semibold">
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
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
<<<<<<< HEAD
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
=======
      <h1 className="text-3xl font-bold mb-6 text-center">
        My Donation Requests
      </h1>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label className="font-medium">Status:</label>
          <select
            className="select select-bordered w-48"
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
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

<<<<<<< HEAD
        <p className="text-gray-400">
=======
        <p className="text-gray-500">
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
          Total Requests: {filteredDonations.length}
        </p>
      </div>

<<<<<<< HEAD
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
=======
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedDonations.map((donation) => {
          const status = donation.status || "pending";

          return (
            <div
              key={donation._id}
              className="card bg-base-100 shadow-md border hover:shadow-xl transition"
            >
              <div className="card-body space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-lg text-red-500">
                    {donation.recipientName}
                  </h2>
                  <span
                    className={`text-white text-sm px-3 py-1 rounded-full ${
                      STATUS_COLORS[status]
                    }`}
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
                  >
                    {status.toUpperCase()}
                  </span>
                </div>

<<<<<<< HEAD
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
=======
                <p className="text-sm text-gray-600">
                  <strong>Blood Group:</strong> {donation.bloodGroup}
                </p>

                <p className="text-sm text-gray-600">
                  <strong>Location:</strong> {donation.district},{" "}
                  {donation.region}
                </p>

                <p className="text-sm text-gray-600">
                  <strong>Hospital:</strong> {donation.hospital}
                </p>

                <p className="text-sm text-gray-600">
                  <strong>Address:</strong> {donation.address}
                </p>

                <p className="text-sm text-gray-600">
                  <strong>Date & Time:</strong> {donation.donationDate} at{" "}
                  {donation.donationTime}
                </p>

                <p className="text-sm text-gray-600">
                  <strong>Message:</strong> {donation.message}
                </p>

                <p className="text-xs text-gray-400">
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
                  Requested on:{" "}
                  {donation.createdAt
                    ? new Date(donation.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
<<<<<<< HEAD
            </motion.div>
=======
            </div>
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
          );
        })}
      </div>

<<<<<<< HEAD
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
=======
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`btn btn-sm ${
                currentPage === i + 1 ? "btn-error text-white" : ""
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
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
