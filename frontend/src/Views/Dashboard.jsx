import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Clock3,
  ChevronRight,
  TrendingUp,
  Plus
} from "lucide-react"
import { Link } from "react-router-dom"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"

const Dashboard = () => {
  const stats = [
    {
      title: "Total Loan Predictions",
      value: "128",
      icon: BarChart3,
      iconClass: "bg-blue-50 text-blue-600",
      label: "+12%",
      labelClass: "text-emerald-600"
    },
    {
      title: "Approved Loan Decisions",
      value: "86",
      icon: CheckCircle2,
      iconClass: "bg-emerald-50 text-emerald-600",
      label: "Result",
      labelClass: "text-slate-400"
    },
    {
      title: "Explained Loan Decisions",
      value: "121",
      icon: Sparkles,
      iconClass: "bg-violet-50 text-violet-600",
      label: "AI",
      labelClass: "text-slate-400"
    },
    {
      title: "Fairness Checks",
      value: "118",
      icon: ShieldCheck,
      iconClass: "bg-orange-50 text-orange-600",
      label: "Stable",
      labelClass: "text-emerald-600"
    }
  ]

  const predictions = [
    {
      id: "#1042",
      title: "Loan Approval",
      time: "Today, 10:42 AM",
      confidence: "92%",
      status: "Approved",
      statusClass: "bg-emerald-50 text-emerald-600"
    },
    {
      id: "#1041",
      title: "Loan Approval",
      time: "Yesterday, 04:18 PM",
      confidence: "87%",
      status: "Rejected",
      statusClass: "bg-red-50 text-red-600"
    },
    {
      id: "#1040",
      title: "Loan Approval",
      time: "Yesterday, 01:35 PM",
      confidence: "94%",
      status: "Approved",
      statusClass: "bg-emerald-50 text-emerald-600"
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <section className="flex flex-col gap-4 border-b border-slate-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
              AI Decision System
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Monitor your loan approval decisions, explanations and fairness analysis.
            </p>
          </div>
        </section>

        <section className="mt-7 overflow-hidden rounded-3xl bg-slate-950 p-6 shadow-xl shadow-slate-900/10 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div className="max-w-2xl">

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
                <Sparkles size={23} />
              </div>

              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Welcome back
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                Generate loan approval predictions, understand why decisions
                were made and review fairness insights from previous decisions.
              </p>

            </div>

            <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400">
                <Sparkles size={19} />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  System status
                </p>

                <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Active
                </p>
              </div>
            </div>

          </div>
        </section>

        <section className="mt-6 flex flex-col gap-5 rounded-2xl border border-blue-100 bg-blue-50/60 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

          <div>
            <h3 className="text-base font-bold text-slate-900">
              Ready to make a loan decision?
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Submit applicant details and generate an explainable loan approval prediction.
            </p>
          </div>

          <Link
            to="/loan-prediction"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            <Plus size={18} />
            New Loan Prediction
            <ArrowRight size={17} />
          </Link>

        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {stats.map((stat) => {
            const Icon = stat.icon

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5"
              >

                <div className="flex items-start justify-between">

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconClass}`}
                  >
                    <Icon size={20} />
                  </div>

                  <span
                    className={`text-xs font-semibold ${stat.labelClass}`}
                  >
                    {stat.label}
                  </span>

                </div>

                <p className="mt-6 text-sm text-slate-500">
                  {stat.title}
                </p>

                <p className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
                  {stat.value}
                </p>

              </div>
            )
          })}

        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.7fr_1fr]">

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">

              <div>
                <h3 className="text-lg font-bold text-slate-950">
                  Recent Loan Predictions
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Review your latest loan approval decisions.
                </p>
              </div>

              <Link
                to="/history"
                className="hidden items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 sm:flex"
              >
                View History
                <ArrowRight size={16} />
              </Link>

            </div>

            <div>
              {predictions.map((prediction) => (
                <div
                  key={prediction.id}
                  className="flex items-center gap-4 border-b border-slate-100 px-5 py-5 last:border-b-0 sm:px-6"
                >

                  <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 sm:flex">
                    <Sparkles size={19} />
                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">
                        {prediction.title}
                      </h4>

                      <span className="text-xs text-slate-400">
                        {prediction.id}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">

                      <span className="flex items-center gap-1">
                        <Clock3 size={13} />
                        {prediction.time}
                      </span>

                      <span>
                        Confidence {prediction.confidence}
                      </span>

                    </div>

                  </div>

                  <div className="flex items-center gap-3">

                    <div className="hidden text-right sm:block">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${prediction.statusClass}`}
                      >
                        {prediction.status}
                      </span>

                      <p className="mt-2 text-[11px] text-slate-400">
                        Analyzed
                      </p>
                    </div>

                    <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:border-blue-200 hover:text-blue-600">
                      <ChevronRight size={17} />
                    </button>

                  </div>

                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 p-4 sm:hidden">
              <Link
                to="/history"
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-50 py-3 text-sm font-semibold text-blue-600"
              >
                View History
                <ArrowRight size={16} />
              </Link>
            </div>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">

            <div>
              <h3 className="text-lg font-bold text-slate-950">
                Loan Analysis Overview
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Current loan decision quality indicators.
              </p>
            </div>

            <div className="mt-7">

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Average Confidence
                  </p>

                  <p className="mt-1 text-3xl font-bold text-slate-950">
                    91.4%
                  </p>
                </div>

                <TrendingUp
                  className="text-emerald-500"
                  size={22}
                />
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[91.4%] rounded-full bg-blue-600" />
              </div>

            </div>

            <div className="mt-7 space-y-4">

              <div className="rounded-xl bg-slate-50 p-4">

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    Explanations
                  </span>

                  <span className="text-sm font-bold text-slate-900">
                    94%
                  </span>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-[94%] rounded-full bg-blue-600" />
                </div>

              </div>

              <div className="rounded-xl bg-slate-50 p-4">

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    Fairness Analysis
                  </span>

                  <span className="text-sm font-bold text-slate-900">
                    92%
                  </span>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-[92%] rounded-full bg-emerald-500" />
                </div>

              </div>

              <div className="rounded-xl bg-slate-50 p-4">

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    Model Reliability
                  </span>

                  <span className="text-sm font-bold text-slate-900">
                    89%
                  </span>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-[89%] rounded-full bg-violet-500" />
                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </div>
  )
}

export default Dashboard