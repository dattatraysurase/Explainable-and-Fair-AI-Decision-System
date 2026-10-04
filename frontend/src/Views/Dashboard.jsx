import { useEffect, useState } from "react"
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
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import { getPredictions } from "../api/predictionApi"

const Dashboard = () => {
  const navigate = useNavigate()

  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token")

        if (!token) {
          navigate("/Login")
          return
        }

        const result = await getPredictions(token)

        setPredictions(result.predictions || [])
      } catch (error) {
        console.error("Dashboard fetch error:", error)
        setError(error.message || "Failed to load dashboard data")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [navigate])

  // -----------------------------
  // Dashboard Statistics
  // -----------------------------

  const totalPredictions = predictions.length

  const approvedPredictions = predictions.filter(
    (prediction) =>
      prediction.prediction === "Approved"
  ).length

  const explainedPredictions = predictions.filter(
    (prediction) =>
      Array.isArray(prediction.explanation) &&
      prediction.explanation.length > 0
  ).length

  const fairnessChecks = predictions.filter(
    (prediction) =>
      prediction.fairness &&
      typeof prediction.fairness.fairnessScore === "number"
  ).length

  // -----------------------------
  // Average Confidence
  // -----------------------------

  const averageConfidence =
    totalPredictions > 0
      ? predictions.reduce((total, prediction) => {
          const approved =
            Number(prediction.approvedProbability) || 0

          const rejected =
            Number(prediction.rejectedProbability) || 0

          const confidence =
            Math.max(approved, rejected)

          return total + confidence
        }, 0) / totalPredictions
      : 0

  // -----------------------------
  // Average Explanation %
  // -----------------------------

  const explanationPercentage =
    totalPredictions > 0
      ? (explainedPredictions / totalPredictions) * 100
      : 0

  // -----------------------------
  // Average Fairness Score
  // -----------------------------

  const fairnessScores = predictions
    .filter(
      (prediction) =>
        prediction.fairness &&
        typeof prediction.fairness.fairnessScore === "number"
    )
    .map(
      (prediction) =>
        prediction.fairness.fairnessScore
    )

  const averageFairness =
    fairnessScores.length > 0
      ? fairnessScores.reduce(
          (total, score) => total + score,
          0
        ) / fairnessScores.length
      : 0

  // -----------------------------
  // Stats Cards
  // -----------------------------

  const stats = [
    {
      title: "Total Loan Predictions",
      value: totalPredictions,
      icon: BarChart3,
      iconClass: "bg-blue-50 text-blue-600",
      label: "Total",
      labelClass: "text-slate-400"
    },
    {
      title: "Approved Loan Decisions",
      value: approvedPredictions,
      icon: CheckCircle2,
      iconClass: "bg-emerald-50 text-emerald-600",
      label: "Result",
      labelClass: "text-slate-400"
    },
    {
      title: "Explained Loan Decisions",
      value: explainedPredictions,
      icon: Sparkles,
      iconClass: "bg-violet-50 text-violet-600",
      label: "AI",
      labelClass: "text-slate-400"
    },
    {
      title: "Fairness Checks",
      value: fairnessChecks,
      icon: ShieldCheck,
      iconClass: "bg-orange-50 text-orange-600",
      label: "Analysis",
      labelClass: "text-slate-400"
    }
  ]

  // -----------------------------
  // Recent Predictions
  // -----------------------------

  const recentPredictions = predictions.slice(0, 3)

  // -----------------------------
  // Date Formatting
  // -----------------------------

  const formatDate = (date) => {
    if (!date) {
      return "Unknown date"
    }

    return new Date(date).toLocaleString(
      "en-IN",
      {
        dateStyle: "medium",
        timeStyle: "short"
      }
    )
  }

  // -----------------------------
  // Confidence
  // -----------------------------

  const getConfidence = (prediction) => {
    const approved =
      Number(prediction.approvedProbability) || 0

    const rejected =
      Number(prediction.rejectedProbability) || 0

    return Math.max(
      approved,
      rejected
    ).toFixed(1)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}

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

        {/* Welcome Section */}

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

        {/* New Prediction */}

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

        {/* Loading */}

        {loading && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-sm text-slate-500">
              Loading dashboard data...
            </p>
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
            <p className="text-sm font-medium text-red-600">
              {error}
            </p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Statistics */}

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

            {/* Recent Predictions + Analysis */}

            <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.7fr_1fr]">

              {/* Recent Predictions */}

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

                  {recentPredictions.length === 0 ? (

                    <div className="px-6 py-10 text-center">
                      <Sparkles
                        size={28}
                        className="mx-auto text-slate-300"
                      />

                      <p className="mt-3 text-sm font-medium text-slate-600">
                        No loan predictions yet.
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Create your first prediction to see it here.
                      </p>
                    </div>

                  ) : (

                    recentPredictions.map((prediction) => (

                      <div
                        key={prediction._id}
                        className="flex items-center gap-4 border-b border-slate-100 px-5 py-5 last:border-b-0 sm:px-6"
                      >

                        <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 sm:flex">
                          <Sparkles size={19} />
                        </div>

                        <div className="min-w-0 flex-1">

                          <div className="flex flex-wrap items-center gap-2">

                            <h4 className="text-sm font-bold text-slate-900">
                              Loan Approval
                            </h4>

                            <span className="text-xs text-slate-400">
                              #{prediction._id?.slice(-4)}
                            </span>

                          </div>

                          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">

                            <span className="flex items-center gap-1">
                              <Clock3 size={13} />
                              {formatDate(prediction.createdAt)}
                            </span>

                            <span>
                              Confidence {getConfidence(prediction)}%
                            </span>

                          </div>

                        </div>

                        <div className="flex items-center gap-3">

                          <div className="hidden text-right sm:block">

                            <span
                              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                                prediction.prediction === "Approved"
                                  ? "bg-emerald-50 text-emerald-600"
                                  : "bg-red-50 text-red-600"
                              }`}
                            >
                              {prediction.prediction}
                            </span>

                            <p className="mt-2 text-[11px] text-slate-400">
                              Analyzed
                            </p>

                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/prediction-result/${prediction._id}`
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:border-blue-200 hover:text-blue-600"
                          >
                            <ChevronRight size={17} />
                          </button>

                        </div>

                      </div>

                    ))

                  )}

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

              {/* Loan Analysis */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">

                <div>
                  <h3 className="text-lg font-bold text-slate-950">
                    Loan Analysis Overview
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Current loan decision quality indicators.
                  </p>
                </div>

                {/* Average Confidence */}

                <div className="mt-7">

                  <div className="flex items-end justify-between">

                    <div>
                      <p className="text-sm text-slate-500">
                        Average Confidence
                      </p>

                      <p className="mt-1 text-3xl font-bold text-slate-950">
                        {averageConfidence.toFixed(1)}%
                      </p>
                    </div>

                    <TrendingUp
                      className="text-emerald-500"
                      size={22}
                    />

                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{
                        width: `${Math.min(
                          averageConfidence,
                          100
                        )}%`
                      }}
                    />
                  </div>

                </div>

                <div className="mt-7 space-y-4">

                  {/* Explanations */}

                  <div className="rounded-xl bg-slate-50 p-4">

                    <div className="flex items-center justify-between">

                      <span className="text-sm font-medium text-slate-600">
                        Explanations
                      </span>

                      <span className="text-sm font-bold text-slate-900">
                        {explanationPercentage.toFixed(1)}%
                      </span>

                    </div>

                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">

                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{
                          width: `${Math.min(
                            explanationPercentage,
                            100
                          )}%`
                        }}
                      />

                    </div>

                  </div>

                  {/* Fairness */}

                  <div className="rounded-xl bg-slate-50 p-4">

                    <div className="flex items-center justify-between">

                      <span className="text-sm font-medium text-slate-600">
                        Fairness Analysis
                      </span>

                      <span className="text-sm font-bold text-slate-900">
                        {averageFairness.toFixed(1)}%
                      </span>

                    </div>

                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">

                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{
                          width: `${Math.min(
                            averageFairness,
                            100
                          )}%`
                        }}
                      />

                    </div>

                  </div>

                  {/* Model Reliability */}

                  <div className="rounded-xl bg-slate-50 p-4">

                    <div className="flex items-center justify-between">

                      <span className="text-sm font-medium text-slate-600">
                        Model Reliability
                      </span>

                      <span className="text-sm font-bold text-slate-900">
                        {averageConfidence.toFixed(1)}%
                      </span>

                    </div>

                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">

                      <div
                        className="h-full rounded-full bg-violet-500"
                        style={{
                          width: `${Math.min(
                            averageConfidence,
                            100
                          )}%`
                        }}
                      />

                    </div>

                  </div>

                </div>

              </div>

            </section>
          </>
        )}

      </main>

      <Footer />
    </div>
  )
}

export default Dashboard