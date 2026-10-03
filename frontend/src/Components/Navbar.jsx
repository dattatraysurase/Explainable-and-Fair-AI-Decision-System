import { Link } from "react-router-dom"
import { BrainCircuit } from "lucide-react"

const PublicNavbar = () => {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

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

        <div className="flex items-center gap-2 sm:gap-3">

          <Link
            to="/login"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-600 sm:px-4"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Register
          </Link>

        </div>

      </div>
    </nav>
  )
}

export default PublicNavbar