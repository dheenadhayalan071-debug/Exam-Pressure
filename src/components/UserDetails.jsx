import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";

// Inner component that safely uses useNavigate
const UserDetails = () => {
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);
  const dropdownRef = useRef(null);

  // 🔐 Mock user data (replace with real auth data later)
  const user = {
    username: "Saurabh Singh",
    email: "saurabh@example.com",
    joined: "12 Jan 2025",
    supportEmail: "support@exam-pressure.com",
  };

  // 🚪 Logout logic
  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Clear cookies
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // Redirect to login
    navigate("/login");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="w-full px-8 py-6 flex items-center justify-between border-b border-white/10 backdrop-blur-md bg-white/5">
        <h2 className="text-3xl font-bold text-white tracking-wide">
          Exam<span className="text-indigo-400">-Pressure</span>
        </h2>

        {/* User Icon */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpenProfile((prev) => !prev)}
            className="w-10 h-10 rounded-full bg-indigo-500/30 border border-white/20 flex items-center justify-center text-white font-semibold hover:bg-indigo-500/40 transition"
          >
            SS
          </button>

          {/* User Dropdown */}
          {openProfile && (
            <div className="absolute right-0 mt-3 w-72 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl p-4 text-sm">
              <p className="text-white font-semibold">{user.username}</p>
              <p className="text-gray-400 mt-1">{user.email}</p>

              <div className="mt-3 border-t border-white/10 pt-3 space-y-1">
                <p className="text-gray-400">
                  Joined: <span className="text-gray-300">{user.joined}</span>
                </p>
                <p className="text-gray-400">
                  Support:{" "}
                  <span className="text-indigo-400">{user.supportEmail}</span>
                </p>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="mt-4 w-full py-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 font-medium transition-all duration-300 hover:bg-red-500/30 hover:text-white"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default UserDetails;
