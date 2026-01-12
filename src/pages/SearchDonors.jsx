import React, { useEffect, useState } from "react";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const SearchDonors = () => {
  const [formData, setFormData] = useState({
    bloodGroup: "",
    region: "",
    district: "",
  });

  const [geoData, setGeoData] = useState([]);
  const [regionsData, setRegionsData] = useState([]);
  const [districtsData, setDistrictsData] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);

<<<<<<< HEAD
  // Load geo data (regions/districts)
=======
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
  useEffect(() => {
    fetch("/serviceCenters.json")
      .then((res) => res.json())
      .then((data) => {
        setGeoData(data);

        const regions = [...new Set(data.map((item) => item.region))];
        setRegionsData(regions);

        const districts = data.map((item) => ({
          name: item.district,
          region: item.region,
        }));
        setDistrictsData(districts);
      })
      .catch((err) => console.error("Failed to load geo data", err));
  }, []);

<<<<<<< HEAD
  // Filter districts by selected region
=======
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
  useEffect(() => {
    if (!formData.region) {
      setFilteredDistricts([]);
      setFormData((prev) => ({ ...prev, district: "" }));
      return;
    }
<<<<<<< HEAD
    const filtered = districtsData.filter((d) => d.region === formData.region);
=======
    const filtered = districtsData.filter(
      (d) => d.region === formData.region
    );
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
    setFilteredDistricts(filtered);
    setFormData((prev) => ({ ...prev, district: "" }));
  }, [formData.region, districtsData]);

<<<<<<< HEAD
  // Handle search form submit
=======
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("redsaver_token");
      if (!token) {
        alert("You are not logged in. Please login first.");
        setLoading(false);
        return;
      }

      const queryObj = {};
      if (formData.bloodGroup) queryObj.bloodGroup = formData.bloodGroup;
      if (formData.region) queryObj.region = formData.region;
      if (formData.district) queryObj.district = formData.district;

      const query = new URLSearchParams(queryObj).toString();
<<<<<<< HEAD

      // Safe base URL (fallback to live server)
      const baseUrl =
        import.meta.env.VITE_API_BASE_URL || "https://red-saver-server.vercel.app";

      const url = `${baseUrl.replace(/\/$/, "")}/donations?${query}`;
=======
      const url = `${import.meta.env.VITE_API_BASE_URL.replace(
        /\/$/,
        ""
      )}/donations?${query}`;
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch donors");

      const data = await res.json();

<<<<<<< HEAD
      // Filter the results locally for extra safety
=======
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
      const filtered = data.filter((d) => {
        return (
          (!formData.bloodGroup ||
            (d.bloodGroup || "").toLowerCase() ===
              formData.bloodGroup.toLowerCase()) &&
          (!formData.region ||
            (d.region || "").toLowerCase() === formData.region.toLowerCase()) &&
          (!formData.district ||
            (d.district || "").toLowerCase() ===
              formData.district.toLowerCase())
        );
      });

      setDonors(filtered);
    } catch (err) {
      console.error(err);
      alert(err.message);
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="container mx-auto px-4 py-12 max-w-7xl mx-auto">
=======
    <div className="container mx-auto px-4 py-12">
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
      <h1 className="text-3xl font-bold text-center mb-8 text-red-500">
        Search Donors
      </h1>

      <form
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        onSubmit={handleSearch}
      >
<<<<<<< HEAD
        {/* Blood Group */}
=======

>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
        <select
          className="select select-bordered w-full"
          value={formData.bloodGroup}
          onChange={(e) =>
            setFormData({ ...formData, bloodGroup: e.target.value })
          }
        >
          <option value="">Select Blood Group</option>
          {BLOOD_GROUPS.map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

<<<<<<< HEAD
        {/* Region */}
        <select
          className="select select-bordered w-full"
          value={formData.region}
          onChange={(e) => setFormData({ ...formData, region: e.target.value })}
=======
        <select
          className="select select-bordered w-full"
          value={formData.region}
          onChange={(e) =>
            setFormData({ ...formData, region: e.target.value })
          }
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
        >
          <option value="">Select Region</option>
          {regionsData.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

<<<<<<< HEAD
        {/* District */}
        <select
          className="select select-bordered w-full"
          value={formData.district}
          onChange={(e) => setFormData({ ...formData, district: e.target.value })}
=======

        <select
          className="select select-bordered w-full"
          value={formData.district}
          onChange={(e) =>
            setFormData({ ...formData, district: e.target.value })
          }
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
          disabled={!filteredDistricts.length}
        >
          <option value="">Select District</option>
          {filteredDistricts.map((d) => (
            <option key={d.name} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="btn btn-primary col-span-1 md:col-span-3"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

<<<<<<< HEAD
      {/* Donors List */}
=======
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
      {loading ? (
        <p className="text-center text-gray-500 mt-8">Loading...</p>
      ) : donors.length ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {donors.map((donor) => (
            <div
              key={donor._id}
              className="card bg-base-100 shadow-md border hover:shadow-xl transition duration-300"
            >
              <div className="card-body space-y-2">
                <h3 className="text-xl font-bold text-red-500">
                  {donor.recipientName || "N/A"}
                </h3>
                <span className="badge badge-error badge-outline w-fit">
                  {donor.bloodGroup || "N/A"}
                </span>
                <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                  <span className="badge badge-success badge-outline">
                    {donor.region || "N/A"}
                  </span>
                  <span className="badge badge-success badge-outline">
                    {donor.district || "N/A"}
                  </span>
                </div>
                <p className="text-sm text-gray-700">
                  <strong>Hospital:</strong> {donor.hospital || "N/A"}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Donation Time:</strong> {donor.donationTime || "N/A"} |{" "}
                  {donor.donationDate
                    ? new Date(donor.donationDate).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Address:</strong> {donor.address || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
<<<<<<< HEAD
        <p className="text-center text-slate-950 mt-8">No donors found.</p>
=======
        <p className="text-center text-gray-500 mt-8">
          No donors found.
        </p>
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
      )}
    </div>
  );
};

export default SearchDonors;
