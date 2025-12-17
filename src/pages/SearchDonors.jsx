import React, { useEffect, useState } from "react";
import divisionsJSON from "../../public/data/divisions.json";
import districtsJSON from "../../public/data/districts.json";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const divisionsData = divisionsJSON.find((j) => j.type === "table")?.data || [];
const districtsData = districtsJSON.find((j) => j.type === "table")?.data || [];

const SearchDonors = () => {
  const [formData, setFormData] = useState({
    bloodGroup: "",
    divisionId: "",
    districtId: "",
  });

  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [donors, setDonors] = useState([]);

  // Filter districts based on selected division
  useEffect(() => {
    if (!formData.divisionId) {
      setFilteredDistricts([]);
      setFormData((prev) => ({ ...prev, districtId: "" }));
      return;
    }
    const filtered = districtsData.filter(
      (d) => String(d.division_id) === String(formData.divisionId)
    );
    setFilteredDistricts(filtered);
    setFormData((prev) => ({ ...prev, districtId: "" }));
  }, [formData.divisionId]);

  const handleSearch = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("redsaver_token");
    if (!token) return alert("You are not logged in. Please login first.");

    // Get actual division & district names from selected ids
    const divisionName =
      divisionsData.find((d) => String(d.id) === String(formData.divisionId))
        ?.name || "";
    const districtName =
      districtsData.find((d) => String(d.id) === String(formData.districtId))
        ?.name || "";

    try {
      // Build query only with selected filters
      const queryObj = {};
      if (formData.bloodGroup) queryObj.bloodGroup = formData.bloodGroup;
      if (divisionName) queryObj.division = divisionName;
      if (districtName) queryObj.district = districtName;

      const query = new URLSearchParams(queryObj).toString();
      const url = `${import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "")}/donations?${query}`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch donors");

      const data = await res.json();
      setDonors(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      alert(err.message);
      setDonors([]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-red-500">
        Search Donors
      </h1>

      <form className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" onSubmit={handleSearch}>
        {/* Blood Group */}
        <select
          className="select select-bordered w-full"
          value={formData.bloodGroup}
          onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
        >
          <option value="">Select Blood Group</option>
          {BLOOD_GROUPS.map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        {/* Division */}
        <select
          className="select select-bordered w-full"
          value={formData.divisionId}
          onChange={(e) => setFormData({ ...formData, divisionId: e.target.value })}
        >
          <option value="">Select Division</option>
          {divisionsData.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        {/* District */}
        <select
          className="select select-bordered w-full"
          value={formData.districtId}
          onChange={(e) => setFormData({ ...formData, districtId: e.target.value })}
          disabled={!filteredDistricts.length}
        >
          <option value="">Select District</option>
          {filteredDistricts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary col-span-1 md:col-span-3">
          Search
        </button>
      </form>

      {donors.length ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {donors.map((donor) => {
            const {
              _id,
              recipientName,
              bloodGroup,
              division,
              district,
              hospital,
              donationTime,
              donationDate,
              address,
            } = donor;

            return (
              <div
                key={_id}
                className="card bg-base-100 shadow-md border hover:shadow-xl transition duration-300"
              >
                <div className="card-body space-y-2">
                  <h3 className="text-xl font-bold text-red-500">
                    {recipientName || "N/A"}
                  </h3>

                  <span className="badge badge-error badge-outline w-fit">
                    {bloodGroup || "N/A"}
                  </span>

                  <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                    <span className="badge badge-success badge-outline">
                      {division || "N/A"}
                    </span>
                    <span className="badge badge-success badge-outline">
                      {district || "N/A"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700">
                    <strong>Hospital:</strong> {hospital || "N/A"}
                  </p>

                  <p className="text-sm text-gray-700">
                    <strong>Donation Time:</strong> {donationTime || "N/A"} |{" "}
                    {donationDate ? new Date(donationDate).toLocaleDateString() : "N/A"}
                  </p>

                  <p className="text-sm text-gray-700">
                    <strong>Address:</strong> {address || "N/A"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">No donors found.</p>
      )}
    </div>
  );
};

export default SearchDonors;
