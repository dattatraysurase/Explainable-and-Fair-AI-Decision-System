import { BrainCircuit } from "lucide-react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">

          <div>
            <Link to="/" className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                <BrainCircuit size={21} />
              </div>

              <div>
                <h2 className="text-lg font-bold">
                  ExplainAI
                </h2>

                <p className="text-xs text-slate-400">
                  Explainable & Fair AI
                </p>
              </div>

            </Link>

            <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
              An AI-based loan decision system that provides transparent
              predictions, understandable explanations and fairness analysis.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Workspace
            </h3>

            <div className="mt-6 space-y-4">

              <Link
                to="/dashboard"
                className="block text-sm text-slate-400 transition hover:text-blue-400"
              >
                Dashboard
              </Link>

              <Link
                to="/loan-prediction"
                className="block text-sm text-slate-400 transition hover:text-blue-400"
              >
                Loan Prediction
              </Link>

              <Link
                to="/history"
                className="block text-sm text-slate-400 transition hover:text-blue-400"
              >
                Prediction History
              </Link>

            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Account
            </h3>

            <div className="mt-6 space-y-4">

              <Link
                to="/login"
                className="block text-sm text-slate-400 transition hover:text-blue-400"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="block text-sm text-slate-400 transition hover:text-blue-400"
              >
                Register
              </Link>

              <Link
                to="/profile"
                className="block text-sm text-slate-400 transition hover:text-blue-400"
              >
                Profile
              </Link>

            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-slate-700 pt-6">

          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row">

            <p className="text-xs text-slate-500">
              © 2026 ExplainAI. All rights reserved.
            </p>

            <p className="text-xs text-slate-500">
              Explainable • Fair • Responsible AI
            </p>

          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footer