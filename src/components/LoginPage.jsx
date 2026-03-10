import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  function onAuthSuccess(user, token) {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  }

  // 🟢 Email / Password Login & Register
  const handleEmailAuth = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const payload = { email, password };

      const res = await axios.post(
        `https://exam-pressure.onrender.com/auth/${mode.toLowerCase()}`,
        payload,
        { withCredentials: true },
      );

      if (res.data?.token) {
        onAuthSuccess(payload, res.data.access_token);
      }
      console.log(`User ${mode} successfully`);
      navigate("/main");
      console.log(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-extrabold text-center mb-8">
          <span className="text-white">Exam</span>
          <span className="text-violet-400">-Pressure</span>
        </h1>

        {/* Tabs */}
        <div className="flex mb-6 bg-white/5 rounded-full p-1">
          {["login", "register"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setMode(tab);
              }}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${
                mode === tab ? "bg-violet-500/30 text-white" : "text-gray-400"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleEmailAuth} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 border border-white/20 backdrop-blur-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-500/20"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 border border-white/20 backdrop-blur-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-500/20"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-violet-500/30 text-white font-semibold hover:scale-105 transition"
            onClick={handleEmailAuth}
          >
            {loading ? "Please wait..." : mode.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}
