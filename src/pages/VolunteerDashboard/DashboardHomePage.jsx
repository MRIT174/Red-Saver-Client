import React, { useEffect, useState } from "react";
import { FaUsers, FaTint } from "react-icons/fa";

const DashboardHomePage = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);

  useEffect(() => {
    const cachedStats = localStorage.getItem("dashboard_stats");

    if (cachedStats) {
      const stats = JSON.parse(cachedStats);
      setTotalUsers(stats.totalUsers || 0);
      setTotalRequests(stats.totalDonations || 0);
    }
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Welcome Back, <span className="text-red-500">Volunteer</span> 
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-xl p-5 flex items-center gap-4">
          <div className="p-4 rounded-full bg-red-100 text-red-500 text-2xl">
            <FaUsers />
          </div>
          <div>
            <h2 className="text-sm text-gray-500">Total Users</h2>
            <p className="text-3xl font-bold">{totalUsers}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl p-5 flex items-center gap-4">
          <div className="p-4 rounded-full bg-blue-100 text-blue-500 text-2xl">
            <FaTint />
          </div>
          <div>
            <h2 className="text-sm text-gray-500">
              Blood Donation Requests
            </h2>
            <p className="text-3xl font-bold">{totalRequests}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHomePage;
