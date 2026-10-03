import { useState } from "react";
import { LockKeyhole, Mail, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Save user information
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Login successful
      alert("Login successful");

      // Redirect to Home
      navigate("/");

    } catch (error) {
      console.error("Login error:", error);

      setError(
        "Unable to connect to server. Please make sure backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">

      <Navbar />

      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">

        <div className="w-full max-w-md">

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_35px_rgba(22,32,51,0.07)] sm:p-8">

            {/* Heading */}
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Welcome back
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Sign in to access your AI decision workspace.
              </p>
            </div>

            {/* Login Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
            >

              {/* Email */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-3 top-3.5 text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />

                </div>

              </div>

              {/* Password */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </label>

                <div className="relative">

                  <LockKeyhole
                    size={18}
                    className="absolute left-3 top-3.5 text-slate-400"
                  />

                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />

                </div>

              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </div>
              )}

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  "Signing in..."
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={17} />
                  </>
                )}

              </button>

            </form>

            {/* Register */}
            <div className="mt-6 text-center">

              <p className="text-sm text-slate-500">

                Don't have an account?{" "}

                <Link
                  to="/register"
                  className="font-bold text-blue-600 transition hover:text-blue-700"
                >
                  Create account
                </Link>

              </p>

            </div>

          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Explainable • Fair • Responsible AI
          </p>

        </div>

      </main>

      <Footer />

    </div>
  );
}