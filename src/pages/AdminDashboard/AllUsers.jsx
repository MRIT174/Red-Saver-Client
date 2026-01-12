import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { FiMoreVertical } from "react-icons/fi";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("AxiosError", err.response?.status, err.response?.data);
      showAlert("Failed to fetch users", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showAlert = (message, type = "success") => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
  };

  const toggleBlock = async (user) => {
    try {
      const endpoint =
        user.status === "active"
          ? `/users/block/${encodeURIComponent(user.email)}`
          : `/users/unblock/${encodeURIComponent(user.email)}`;
      await api.patch(endpoint);
      fetchUsers();
      showAlert(
        `User "${user.name}" is now ${
          user.status === "active" ? "blocked" : "active"
        }`
      );
    } catch (err) {
      console.error(err);
      showAlert("Action failed", "error");
    }
  };

  const changeRole = async (user, role) => {
    try {
      await api.patch(`/users/role/${encodeURIComponent(user.email)}`, { role });
      fetchUsers();
      showAlert(`User "${user.name}" is now ${role}`);
    } catch (err) {
      console.error(err);
      showAlert("Action failed", "error");
    }
  };

  const deleteUser = async (user) => {
    if (!window.confirm(`Are you sure you want to delete "${user.name}"?`))
      return;

    try {
      await api.delete(`/users/${encodeURIComponent(user.email)}`);
      fetchUsers();
      showAlert(`User "${user.name}" has been deleted`);
    } catch (err) {
      console.error("Delete error:", err.response?.status, err.response?.data);
      showAlert("Delete failed", "error");
    }
  };

  const filteredUsers = users.filter((u) =>
    filter === "all" ? true : u.status === filter
  );

  if (loading)
    return (
<<<<<<< HEAD
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <span className="loading loading-spinner loading-lg text-red-500"></span>
      </div>
    );

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
          All Users
        </h2>

        {/* Alert */}
        {alert.show && (
          <div
            className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium border ${
              alert.type === "success"
                ? "bg-green-500/10 text-green-400 border-green-500/30"
                : "bg-red-500/10 text-red-400 border-red-500/30"
            }`}
          >
            {alert.message}
          </div>
        )}

        {/* Filter */}
        <div className="flex items-center gap-4 mb-6 justify-center">
          <span className="text-slate-300 font-medium">Filter by status:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-900/60 backdrop-blur-md shadow-xl">
          <table className="min-w-full text-sm text-slate-300">
            <thead className="bg-slate-800 text-slate-200">
              <tr>
                <th className="px-4 py-3">Avatar</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {filteredUsers.map((u) => (
                <tr
                  key={u.email}
                  className="hover:bg-slate-800/60 transition"
                >
                  <td className="px-4 py-3">
                    <img
                      src={u.avatar || "/default-avatar.png"}
                      alt={u.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-600"
                    />
                  </td>

                  <td className="px-4 py-3 font-medium">{u.email}</td>
                  <td className="px-4 py-3">{u.name}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        u.role === "admin"
                          ? "bg-red-500/20 text-red-400"
                          : u.role === "volunteer"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-slate-700 text-slate-300"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        u.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 relative text-center">
                    <button
                      onClick={() =>
                        setDropdownOpen(
                          dropdownOpen === u.email ? null : u.email
                        )
                      }
                      className="p-2 rounded-lg hover:bg-slate-700 transition"
                    >
                      <FiMoreVertical size={18} />
                    </button>

                    {dropdownOpen === u.email && (
                      <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-20 overflow-hidden">
                        <button
                          onClick={() => toggleBlock(u)}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-700"
                        >
                          {u.status === "active" ? "Block User" : "Unblock User"}
                        </button>

                        {u.role !== "volunteer" && (
                          <button
                            onClick={() => changeRole(u, "volunteer")}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-700"
                          >
                            Make Volunteer
                          </button>
                        )}

                        {u.role !== "admin" && (
                          <button
                            onClick={() => changeRole(u, "admin")}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-700"
                          >
                            Make Admin
                          </button>
                        )}

                        <button
                          onClick={() => deleteUser(u)}
                          className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                        >
                          Delete User
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
=======
      <div className="p-4 text-center text-gray-500">Loading users...</div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Users</h2>

      {alert.show && (
        <div
          className={`mb-4 px-4 py-2 rounded ${
            alert.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {alert.message}
        </div>
      )}

      <div className="flex items-center gap-4 mb-6">
        <span className="font-medium text-gray-700">Filter by status:</span>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-md px-3 py-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-indigo-100 text-left">
            <tr>
              <th className="px-4 py-2">Avatar</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((u) => (
              <tr key={u.email} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  <img
                    src={u.avatar || "/default-avatar.png"}
                    alt={u.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-2 font-medium text-gray-700">{u.email}</td>
                <td className="px-4 py-2 text-gray-600">{u.name}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      u.role === "admin"
                        ? "bg-red-100 text-red-800"
                        : u.role === "volunteer"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      u.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-2 relative">
                  <button
                    onClick={() =>
                      setDropdownOpen(dropdownOpen === u.email ? null : u.email)
                    }
                    className="p-2 rounded hover:bg-gray-100"
                  >
                    <FiMoreVertical size={20} />
                  </button>

                  {dropdownOpen === u.email && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-lg z-10">
                      {u.status === "active" ? (
                        <button
                          onClick={() => toggleBlock(u)}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Block User
                        </button>
                      ) : (
                        <button
                          onClick={() => toggleBlock(u)}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Unblock User
                        </button>
                      )}

                      {u.role !== "volunteer" && (
                        <button
                          onClick={() => changeRole(u, "volunteer")}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Make Volunteer
                        </button>
                      )}

                      {u.role !== "admin" && (
                        <button
                          onClick={() => changeRole(u, "admin")}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Make Admin
                        </button>
                      )}

                      <button
                        onClick={() => deleteUser(u)}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Delete User
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
  );
};

export default AllUsers;
