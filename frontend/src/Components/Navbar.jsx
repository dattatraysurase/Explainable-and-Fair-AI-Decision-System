import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BrainCircuit, User, Mail, LogOut } from "lucide-react"

const PublicNavbar = () => {

  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {

    const loadUser = () => {
      const storedUser = localStorage.getItem("user")

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (error) {
          console.error("Invalid user data:", error)
          setUser(null)
        }
      } else {
        setUser(null)
      }
    }

    loadUser()

    window.addEventListener("authChanged", loadUser)

    return () => {
      window.removeEventListener("authChanged", loadUser)
    }

  }, [])

  const handleLogout = () => {

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    setUser(null)
    setShowProfile(false)

    window.dispatchEvent(new Event("authChanged"))

    navigate("/")
  }

  return (
    <nav className="border-b border-slate-200 bg-white">

      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">

        {/* ================= LOGO ================= */}

        <div className="flex flex-1 justify-start">

          <Link
            to="/"
            className="flex items-center gap-3"
          >

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <BrainCircuit size={21} />
            </div>

            <div>

              <h1 className="text-base font-bold text-slate-900">
                ExplainAI
              </h1>

              <p className="text-[10px] text-slate-400">
                Loan Approval AI
              </p>

            </div>

          </Link>

        </div>


        {/* ================= MIDDLE NAVIGATION ================= */}

        {user && (

          <div className="flex items-center justify-center gap-1">

            {/* Home */}

            <Link
              to="/"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
            >
              Home
            </Link>


            {/* Dashboard */}

            <Link
              to="/dashboard"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
            >
              Dashboard
            </Link>


            {/* Prediction */}

            <Link
              to="/loan-prediction"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
            >
              Prediction
            </Link>


            {/* Prediction Result */}

            <Link
              to="/prediction-result"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
            >
              Prediction Result
            </Link>


            {/* History */}

            <Link
              to="/history"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
            >
              History
            </Link>

          </div>

        )}


        {/* ================= RIGHT SIDE ================= */}

        <div className="flex flex-1 items-center justify-end gap-3">

          {!user ? (

            <>
              {/* Login */}

              <Link
                to="/login"
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-600 sm:px-4"
              >
                Login
              </Link>


              {/* Register */}

              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Register
              </Link>
            </>

          ) : (

            /* ================= PROFILE ================= */

            <div className="relative flex items-center gap-2">

              {/* User Name */}

              <span className="text-sm font-semibold text-slate-700">
                {user.name}
              </span>


              {/* Avatar */}

              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                {user.name?.charAt(0).toUpperCase()}
              </button>


              {/* ================= PROFILE CARD ================= */}

              {showProfile && (

                <div className="absolute right-0 top-12 z-50 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_35px_rgba(22,32,51,0.15)]">

                  {/* Profile Header */}

                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">

                      <p className="truncate text-sm font-bold text-slate-900">
                        {user.name}
                      </p>

                      <p className="truncate text-xs text-slate-500">
                        {user.email}
                      </p>

                    </div>

                  </div>


                  {/* Profile Information */}

                  <div className="mt-4 space-y-3">

                    {/* Name */}

                    <div className="flex items-center gap-3">

                      <User
                        size={17}
                        className="text-slate-400"
                      />

                      <div>

                        <p className="text-[11px] text-slate-400">
                          Name
                        </p>

                        <p className="text-sm font-medium text-slate-700">
                          {user.name}
                        </p>

                      </div>

                    </div>


                    {/* Email */}

                    <div className="flex items-center gap-3">

                      <Mail
                        size={17}
                        className="text-slate-400"
                      />

                      <div>

                        <p className="text-[11px] text-slate-400">
                          Email
                        </p>

                        <p className="text-sm font-medium text-slate-700">
                          {user.email}
                        </p>

                      </div>

                    </div>

                  </div>


                  {/* Logout */}

                  <div className="mt-4 border-t border-slate-100 pt-3">

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >

                      <LogOut size={17} />

                      Logout

                    </button>

                  </div>

                </div>

              )}

            </div>

          )}

        </div>

      </div>

    </nav>
  )
}

export default PublicNavbar