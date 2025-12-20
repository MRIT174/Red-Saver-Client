import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const AllBloodDonationRequestPage = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Fetch all donation requests
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

  // 🔹 Filter by status
  const filteredRequests =
    filter === "all"
      ? requests
      : requests.filter((r) => r.status === filter);

  // 🔹 Update donation status
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

  // 🔹 Loading
  if (loading) {
    return (
      <p className="p-6 text-center text-gray-500">
        Loading donation requests...
      </p>
    );
  }

  // 🔹 Error
  if (error) {
    return (
      <p className="p-6 text-center text-red-500">
        {error}
      </p>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        All Blood Donation Requests
      </h1>

      {/* 🔹 Filter */}
      <div className="mb-4">
        <select
          className="select select-bordered w-52"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Requests</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* 🔹 Table */}
      {filteredRequests.length === 0 ? (
        <p className="text-gray-500 text-center">
          No donation requests found
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
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
                <tr key={req._id}>
                  {/* 🔹 TITLE */}
                  <td>
                    <div className="font-semibold">
                      {req.recipientName}
                    </div>
                    <div className="text-xs text-gray-500">
                      🏥 {req.hospital}
                    </div>
                    <div className="text-xs text-gray-400">
                      📍 {req.district}, {req.region}
                    </div>
                  </td>

                  {/* 🔹 BLOOD GROUP */}
                  <td>
                    <span className="badge badge-outline">
                      {req.bloodGroup}
                    </span>
                  </td>

                  {/* 🔹 DESCRIPTION */}
                  <td>
                    <p className="text-sm">
                      {req.message || "No message provided"}
                    </p>
                    <p className="text-xs text-gray-400">
                      Address: {req.address}
                    </p>
                    <p className="text-xs text-gray-400">
                      Date: {req.donationDate} | Time:{" "}
                      {req.donationTime}
                    </p>
                  </td>

                  {/* 🔹 STATUS */}
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

                  {/* 🔹 ACTION */}
                  <td>
                    {req.status !== "completed" && (
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
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllBloodDonationRequestPage;
