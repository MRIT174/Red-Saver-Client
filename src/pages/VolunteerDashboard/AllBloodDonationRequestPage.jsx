import React, { useEffect, useState } from "react";
import api from "../../api/axios";
<<<<<<< HEAD
import { User, Droplet, MapPin, ClipboardCheck } from "lucide-react";
import { motion } from "framer-motion";
=======
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e

const AllBloodDonationRequestPage = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get("/donations");
        setRequests(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch requests:", err);
        setError("Failed to load donation requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const filteredRequests =
    filter === "all"
      ? requests
      : requests.filter((r) => r.status === filter);

  const updateStatus = async (id, newStatus) => {
    try {
      await api.patch(`/donations/${id}`, { status: newStatus });

      setRequests((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, status: newStatus } : r
        )
      );

      alert("Donation status updated successfully!");
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update status");
    }
  };

  if (loading) {
    return (
<<<<<<< HEAD
      <p className="p-6 text-center text-gray-400 animate-pulse">
=======
      <p className="p-6 text-center text-gray-500">
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
        Loading donation requests...
      </p>
    );
  }

  if (error) {
    return (
<<<<<<< HEAD
      <p className="p-6 text-center text-red-500">{error}</p>
=======
      <p className="p-6 text-center text-red-500">
        {error}
      </p>
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
    );
  }

  return (
<<<<<<< HEAD
    <motion.div
      className="p-6 max-w-7xl mx-auto bg-gray-900 min-h-screen text-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-2xl font-bold mb-6 text-red-500 flex items-center gap-2"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ClipboardCheck size={24} /> All Blood Donation Requests
      </motion.h1>

      <div className="mb-6 flex items-center gap-2">
        <Droplet size={20} className="text-red-500" />
        <select
          className="select select-bordered w-52 bg-gray-700 text-gray-200 border-gray-600"
=======
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        All Blood Donation Requests
      </h1>

      <div className="mb-4">
        <select
          className="select select-bordered w-52"
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Requests</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {filteredRequests.length === 0 ? (
<<<<<<< HEAD
        <motion.p
          className="text-gray-400 text-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No donation requests found
        </motion.p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra text-gray-200 border-gray-700">
            <thead className="bg-gray-800 text-gray-400">
=======
        <p className="text-gray-500 text-center">
          No donation requests found
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
              <tr>
                <th>Title</th>
                <th>Blood Group</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredRequests.map((req) => (
<<<<<<< HEAD
                <motion.tr
                  key={req._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-700 transition-colors duration-200"
                >
                  <td>
                    <div className="font-semibold flex items-center gap-1">
                      <User size={16} className="text-red-500" />
                      {req.recipientName}
                    </div>
                    <div className="text-xs text-gray-400">{req.hospital}</div>
                    <div className="text-xs text-gray-500">
                      <MapPin size={12} /> {req.district}, {req.region}
                    </div>
                  </td>

                  <td>
                    <span className="badge badge-outline border-gray-500 text-gray-200">
=======
                <tr key={req._id}>
                  <td>
                    <div className="font-semibold">
                      {req.recipientName}
                    </div>
                    <div className="text-xs text-gray-500">
                       {req.hospital}
                    </div>
                    <div className="text-xs text-gray-400">
                       {req.district}, {req.region}
                    </div>
                  </td>


                  <td>
                    <span className="badge badge-outline">
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
                      {req.bloodGroup}
                    </span>
                  </td>

                  <td>
<<<<<<< HEAD
                    <p className="text-sm">{req.message || "No message provided"}</p>
                    <p className="text-xs text-gray-500">Address: {req.address}</p>
                    <p className="text-xs text-gray-500">
                      Date: {req.donationDate} | Time: {req.donationTime}
=======
                    <p className="text-sm">
                      {req.message || "No message provided"}
                    </p>
                    <p className="text-xs text-gray-400">
                      Address: {req.address}
                    </p>
                    <p className="text-xs text-gray-400">
                      Date: {req.donationDate} | Time:{" "}
                      {req.donationTime}
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
                    </p>
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        req.status === "completed"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>

                  <td>
                    {req.status !== "completed" && (
<<<<<<< HEAD
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-xs btn-success"
                        onClick={() => updateStatus(req._id, "completed")}
                      >
                        Mark Completed
                      </motion.button>
                    )}
                  </td>
                </motion.tr>
=======
                      <button
                        className="btn btn-xs btn-success"
                        onClick={() =>
                          updateStatus(req._id, "completed")
                        }
                      >
                        Mark Completed
                      </button>
                    )}
                  </td>
                </tr>
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
              ))}
            </tbody>
          </table>
        </div>
      )}
<<<<<<< HEAD
    </motion.div>
=======
    </div>
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
  );
};

export default AllBloodDonationRequestPage;
