import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../provider/AuthProvider";
import axios from "axios";
import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

/* ✅ axios baseURL */
axios.defaults.baseURL = "https://red-saver-server.vercel.app";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useAuth();
  const [dbUser, setDbUser] = useState(null);

  /* 🔹 Fetch user from DB */
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

  /* 🔹 Logout */
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

  /* 🔹 Determine dashboard path based on role */
  const dashboardPath =
    dbUser?.role === "admin"
      ? "/admin"
      : dbUser?.role === "volunteer"
      ? "/volunteer"
      : "/dashboard";

  /* 🔹 Avatar logic */
  const avatarUrl =
    dbUser?.avatar ||
    user?.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      dbUser?.name || user?.displayName || "User"
    )}&background=dc2626&color=fff`;

  /* 🔹 Loader if dbUser is not yet fetched */
  if (user && !dbUser) {
    return (
      <nav className="bg-white shadow-md sticky top-0 z-50 p-4">
        <p>Loading user...</p>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* LOGO */}
          <Link to="/" className="text-2xl font-bold text-red-600">
            RedSaver
          </Link>

          {/* DESKTOP MENU */}
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
              Funding
            </NavLink>
          </div>

          {/* USER AREA */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <Link to="/login" className="px-4 py-2 border rounded">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
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
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to={`${dashboardPath}/profile`}
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2">
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <div className="flex flex-col px-4 py-3 space-y-2">
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className="block w-full px-3 py-2 rounded hover:bg-gray-100"
            >
              Home
            </NavLink>
            <NavLink
              to="/search-donors"
              onClick={() => setOpen(false)}
              className="block w-full px-3 py-2 rounded hover:bg-gray-100"
            >
              Search Donors
            </NavLink>
            <NavLink
              to="/donation-requests"
              onClick={() => setOpen(false)}
              className="block w-full px-3 py-2 rounded hover:bg-gray-100"
            >
              Donation Requests
            </NavLink>
            <NavLink
              to="/funding"
              onClick={() => setOpen(false)}
              className="block w-full px-3 py-2 rounded hover:bg-gray-100"
            >
              Funding
            </NavLink>

            <hr />

            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded bg-red-600 text-white text-center"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={dashboardPath}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <Link
                  to={`${dashboardPath}/profile`}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left px-3 py-2 rounded hover:bg-gray-100"
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
