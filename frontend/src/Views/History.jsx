import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  XCircle,
  Search
} from "lucide-react"
import { Link } from "react-router-dom"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"

const History = () => {
  const predictions = [
    {
      id: "#1042",
      date: "Today, 10:42 AM",
      loanAmount: "₹5,00,000",
      confidence: "92%",
      status: "Approved"
    },
    {
      id: "#1041",
      date: "Yesterday, 04:18 PM",
      loanAmount: "₹8,00,000",
      confidence: "87%",
      status: "Rejected"
    },
    {
      id: "#1040",
      date: "Yesterday, 01:35 PM",
      loanAmount: "₹3,50,000",
      confidence: "94%",
      status: "Approved"
    },
    {
      id: "#1039",
      date: "28 Sep 2026, 11:20 AM",
      loanAmount: "₹6,00,000",
      confidence: "89%",
      status: "Approved"
    },
    {
      id: "#1038",
      date: "27 Sep 2026, 03:45 PM",
      loanAmount: "₹10,00,000",
      confidence: "81%",
      status: "Rejected"
    },
    {
      id: "#1037",
      date: "26 Sep 2026, 12:15 PM",
      loanAmount: "₹4,50,000",
      confidence: "91%",
      status: "Approved"
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-7">

          <Link
            to="/dashboard"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            ← Back to Dashboard
          </Link>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Prediction History
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
                Review your previous loan approval predictions and results.
              </p>
            </div>

            <Link
              to="/loan-prediction"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              New Prediction
              <ArrowRight size={17} />
            </Link>

          </div>

        </div>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-5">

            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <BarChart3 size={20} />
              </div>

              <span className="text-xs font-semibold text-slate-400">
                Total
              </span>
            </div>

            <p className="mt-5 text-sm text-slate-500">
              Total Predictions
            </p>

            <p className="mt-1 text-3xl font-bold text-slate-950">
              128
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">

            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={20} />
              </div>

              <span className="text-xs font-semibold text-emerald-600">
                Approved
              </span>
            </div>

            <p className="mt-5 text-sm text-slate-500">
              Approved Loans
            </p>

            <p className="mt-1 text-3xl font-bold text-slate-950">
              86
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">

            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <XCircle size={20} />
              </div>

              <span className="text-xs font-semibold text-red-600">
                Rejected
              </span>
            </div>

            <p className="mt-5 text-sm text-slate-500">
              Rejected Loans
            </p>

            <p className="mt-1 text-3xl font-bold text-slate-950">
              42
            </p>

          </div>

        </section>

        {/* History Table */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">

          {/* Table Header */}
          <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

            <div>
              <h2 className="text-lg font-bold text-slate-950">
                Recent Predictions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your latest loan decision records.
              </p>
            </div>

            <div className="relative w-full sm:w-64">

              <Search
                size={17}
                className="absolute left-3 top-3 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search prediction..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />

            </div>

          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">

            <table className="w-full">

              <thead className="bg-slate-50">

                <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">

                  <th className="px-6 py-4">
                    Prediction
                  </th>

                  <th className="px-6 py-4">
                    Date & Time
                  </th>

                  <th className="px-6 py-4">
                    Loan Amount
                  </th>

                  <th className="px-6 py-4">
                    Confidence
                  </th>

                  <th className="px-6 py-4">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {predictions.map((prediction) => (

                  <tr
                    key={prediction.id}
                    className="border-t border-slate-100 transition hover:bg-slate-50/70"
                  >

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <BarChart3 size={18} />
                        </div>

                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            Loan Approval
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {prediction.id}
                          </p>
                        </div>

                      </div>

                    </td>

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock3 size={14} />
                        {prediction.date}
                      </div>

                    </td>

                    <td className="px-6 py-5 text-sm font-semibold text-slate-800">
                      {prediction.loanAmount}
                    </td>

                    <td className="px-6 py-5">

                      <span className="text-sm font-bold text-slate-800">
                        {prediction.confidence}
                      </span>

                    </td>

                    <td className="px-6 py-5">

                      {prediction.status === "Approved" ? (

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                          <CheckCircle2 size={13} />
                          Approved
                        </span>

                      ) : (

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
                          <XCircle size={13} />
                          Rejected
                        </span>

                      )}

                    </td>

                    <td className="px-6 py-5 text-right">

                      <Link
                        to="/prediction-result"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                      >
                        View
                        <ArrowRight size={15} />
                      </Link>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* Mobile Cards */}
          <div className="divide-y divide-slate-100 md:hidden">

            {predictions.map((prediction) => (

              <div
                key={prediction.id}
                className="p-5"
              >

                <div className="flex items-start justify-between gap-3">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <BarChart3 size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Loan Approval
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {prediction.id}
                      </p>
                    </div>

                  </div>

                  {prediction.status === "Approved" ? (

                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                      Approved
                    </span>

                  ) : (

                    <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
                      Rejected
                    </span>

                  )}

                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">

                  <div>
                    <p className="text-xs text-slate-400">
                      Date
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {prediction.date}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Loan Amount
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {prediction.loanAmount}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Confidence
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {prediction.confidence}
                    </p>
                  </div>

                </div>

                <Link
                  to="/prediction-result"
                  className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-slate-50 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50"
                >
                  View Prediction
                  <ArrowRight size={16} />
                </Link>

              </div>

            ))}

          </div>

        </section>

      </main>

      <Footer />

    </div>
  )
}

export default History