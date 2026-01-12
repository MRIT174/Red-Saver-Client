import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../provider/AuthProvider";
import axios from "axios";
import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
<<<<<<< HEAD
import { Heart } from "lucide-react";
=======
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e

axios.defaults.baseURL = "https://red-saver-server.vercel.app";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useAuth();
  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user?.email) return;
      try {
        const token = localStorage.getItem("redsaver_token");
        const res = await axios.get(`/users/${user.email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDbUser(res.data);
      } catch (err) {
        console.error("Navbar user fetch failed:", err);
      }
    };
    fetchUser();
  }, [user]);

<<<<<<< HEAD
=======

>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
  const handleLogout = async () => {
    try {
      await firebaseSignOut(auth);
      localStorage.removeItem("redsaver_token");
      setDbUser(null);
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const dashboardPath =
    dbUser?.role === "admin"
      ? "/admin"
      : dbUser?.role === "volunteer"
      ? "/volunteer"
      : "/dashboard";

  const avatarUrl =
    dbUser?.avatar ||
    user?.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      dbUser?.name || user?.displayName || "User"
<<<<<<< HEAD
    )}&background=0f172a&color=fff`;

  if (user && !dbUser) {
    return (
      <nav className="bg-slate-950 text-white p-4">
=======
    )}&background=dc2626&color=fff`;

  if (user && !dbUser) {
    return (
      <nav className="bg-white shadow-md sticky top-0 z-50 p-4">
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
        <p>Loading user...</p>
      </nav>
    );
  }

<<<<<<< HEAD
  const navLinkClass = ({ isActive }) =>
    `px-2 py-1 transition text-white hover:text-red-400 ${
      isActive ? "text-red-500 font-semibold" : ""
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-red-600 rounded-lg p-2">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
            </div>
            <Link to="/" className="text-2xl font-bold text-red-500">
              RedSaver
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/search-donors" className={navLinkClass}>
              Search Donors
            </NavLink>
            <NavLink to="/donation-requests" className={navLinkClass}>
              Donation Requests
            </NavLink>
            <NavLink to="/funding" className={navLinkClass}>
=======
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold text-red-600">
            RedSaver
          </Link>

          <div className="hidden md:flex gap-6 items-center">
            <NavLink
              className={({ isActive }) =>
                `px-2 py-1 hover:text-red-600 ${isActive ? "text-red-600 font-semibold" : ""}`
              }
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-2 py-1 hover:text-red-600 ${isActive ? "text-red-600 font-semibold" : ""}`
              }
              to="/search-donors"
            >
              Search Donors
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-2 py-1 hover:text-red-600 ${isActive ? "text-red-600 font-semibold" : ""}`
              }
              to="/donation-requests"
            >
              Donation Requests
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-2 py-1 hover:text-red-600 ${isActive ? "text-red-600 font-semibold" : ""}`
              }
              to="/funding"
            >
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
              Funding
            </NavLink>
          </div>

<<<<<<< HEAD
          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-slate-950 text-white rounded shadow-md hover:shadow-lg"
                >
=======
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <Link to="/login" className="px-4 py-2 border rounded">
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
                  Login
                </Link>
                <Link
                  to="/register"
<<<<<<< HEAD
                  className="px-4 py-2 bg-red-600 text-white rounded shadow-md hover:shadow-lg"
=======
                  className="px-4 py-2 bg-red-600 text-white rounded"
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
<<<<<<< HEAD
                  className="flex items-center gap-2 text-white"
                >
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full border border-slate-700 object-cover"
                  />
                  <span>{dbUser?.name || "User"}</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-slate-900 text-white border border-slate-700 rounded shadow-lg">
                    <Link
                      to={dashboardPath}
                      className="block px-4 py-2 hover:bg-slate-800"
=======
                  className="flex items-center gap-2"
                >
                  <img
                    src={avatarUrl}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://ui-avatars.com/api/?name=User&background=dc2626&color=fff";
                    }}
                  />
                  <span className="font-medium">
                    {dbUser?.name || user?.displayName || "User"}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow">
                    <Link
                      to={dashboardPath}
                      className="block px-4 py-2 hover:bg-gray-100"
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to={`${dashboardPath}/profile`}
<<<<<<< HEAD
                      className="block px-4 py-2 hover:bg-slate-800"
=======
                      className="block px-4 py-2 hover:bg-gray-100"
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
<<<<<<< HEAD
                      className="w-full text-left px-4 py-2 hover:bg-slate-800"
=======
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

<<<<<<< HEAD
          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white text-2xl"
          >
=======
          <button onClick={() => setOpen(!open)} className="md:hidden p-2">
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
            ☰
          </button>
        </div>
      </div>

<<<<<<< HEAD
      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-slate-950 text-white border-t border-slate-800">
=======
      {open && (
        <div className="md:hidden bg-white border-t shadow-sm">
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
          <div className="flex flex-col px-4 py-3 space-y-2">
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
<<<<<<< HEAD
              className="px-3 py-2 hover:bg-slate-800 rounded"
=======
              className="block w-full px-3 py-2 rounded hover:bg-gray-100"
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
            >
              Home
            </NavLink>
            <NavLink
              to="/search-donors"
              onClick={() => setOpen(false)}
<<<<<<< HEAD
              className="px-3 py-2 hover:bg-slate-800 rounded"
=======
              className="block w-full px-3 py-2 rounded hover:bg-gray-100"
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
            >
              Search Donors
            </NavLink>
            <NavLink
              to="/donation-requests"
              onClick={() => setOpen(false)}
<<<<<<< HEAD
              className="px-3 py-2 hover:bg-slate-800 rounded"
=======
              className="block w-full px-3 py-2 rounded hover:bg-gray-100"
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
            >
              Donation Requests
            </NavLink>
            <NavLink
              to="/funding"
              onClick={() => setOpen(false)}
<<<<<<< HEAD
              className="px-3 py-2 hover:bg-slate-800 rounded"
=======
              className="block w-full px-3 py-2 rounded hover:bg-gray-100"
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
            >
              Funding
            </NavLink>

<<<<<<< HEAD
            <hr className="border-slate-700" />
=======
            <hr />
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e

            {!user ? (
              <>
                <Link
                  to="/login"
<<<<<<< HEAD
                  className="px-3 py-2 hover:bg-slate-800 rounded"
=======
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded hover:bg-gray-100"
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
                >
                  Login
                </Link>
                <Link
                  to="/register"
<<<<<<< HEAD
                  className="px-3 py-2 bg-red-600 rounded text-center shadow-md"
=======
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded bg-red-600 text-white text-center"
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={dashboardPath}
<<<<<<< HEAD
                  className="px-3 py-2 hover:bg-slate-800 rounded"
=======
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded hover:bg-gray-100"
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
                >
                  Dashboard
                </Link>
                <Link
                  to={`${dashboardPath}/profile`}
<<<<<<< HEAD
                  className="px-3 py-2 hover:bg-slate-800 rounded"
=======
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded hover:bg-gray-100"
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
<<<<<<< HEAD
                  className="text-left px-3 py-2 hover:bg-slate-800 rounded"
=======
                  className="text-left px-3 py-2 rounded hover:bg-gray-100"
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
