import { useState } from "react"
import { LockKeyhole, Mail, ArrowRight } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"

export default function Login() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

    setError("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.email || !form.password) {
      setError("Please enter your email and password")
      return
    }

    navigate("/dashboard")
  }

  

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <div className="px-4 py-10 sm:px-6">

        <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-lg items-center">

          <div className="w-full">

            <div className="min-h-[570px] rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_12px_35px_rgba(22,32,51,0.07)] sm:p-9">

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  Welcome back
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Sign in to access your AI decision workspace.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-4 text-slate-400"
                    />

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-3 top-4 text-slate-400"
                    />

                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>

                {error && (
                  <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.99]"
                >
                  Sign In
                  <ArrowRight size={17} />
                </button>

              </form>

              <div className="mt-8 text-center">
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

        </div>

      </div>
      <Footer/>

    </div>
  )
}

