import React, { useEffect, useState } from "react";
import { useAuth } from "../provider/AuthProvider";

const FundingPage = () => {
  const { user } = useAuth();
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("redsaver_token");

    fetch("https://red-saver-server.vercel.app/funds", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch funds");
        return res.json();
      })
      .then((data) => setFunds(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, [user]);

  /* ---------- Not Logged In ---------- */
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <p className="text-slate-400 text-lg">
          Please login to view funding history.
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* ---------- Header ---------- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
            Funding History
          </h2>

          <a
            href="/give-fund"
            className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-red-600 to-red-500 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300"
          >
            Give Fund
          </a>
        </div>

        {/* ---------- Loading ---------- */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-red-500"></span>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-700/40 bg-slate-900/60 backdrop-blur-md shadow-xl">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-800/70 text-slate-300 uppercase text-sm">
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">Donor Name</th>
                  <th className="px-6 py-4">Amount (৳)</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>

              <tbody>
                {funds.length ? (
                  funds.map((fund, index) => (
                    <tr
                      key={fund._id}
                      className="border-t border-slate-700/40 hover:bg-slate-800/50 transition"
                    >
                      <td className="px-6 py-4 text-slate-400">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 font-medium text-white">
                        {fund.donorName}
                      </td>
                      <td className="px-6 py-4 font-semibold text-red-400">
                        ৳ {fund.amount}
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        {new Date(fund.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-10 text-slate-400"
                    >
                      No funds found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default FundingPage;
