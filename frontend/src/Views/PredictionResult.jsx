import { useEffect, useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  CreditCard,
  IndianRupee,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  TrendingUp,
  UserRound,
  XCircle
} from "lucide-react"
import {
  Link,
  useParams
} from "react-router-dom"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import { getPredictionById } from "../api/predictionApi"

const PredictionResult = () => {
  const { id } = useParams()

  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const token = localStorage.getItem("token")

        if (!token) {
          setError("Please login again.")
          return
        }

        if (!id) {
          setError("Prediction ID is missing.")
          return
        }

        const response = await getPredictionById(
          id,
          token
        )

        if (response.prediction) {
          setResult(response.prediction)
        } else {
          setError("Prediction not found.")
        }

      } catch (error) {
        console.error(
          "Prediction Result Error:",
          error
        )

        setError(
          error.message ||
          "Unable to load prediction result."
        )

      } finally {
        setLoading(false)
      }
    }

    fetchPrediction()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">

        <Navbar />

        <main className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-4">

          <div className="text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

            <p className="mt-4 text-sm text-slate-500">
              Loading prediction result...
            </p>

          </div>

        </main>

        <Footer />

      </div>
    )
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-slate-50">

        <Navbar />

        <main className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-4">

          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">

            <p className="font-semibold text-red-600">
              {error || "Prediction result not found."}
            </p>

            <Link
              to="/loan-prediction"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
            >
              New Prediction
              <ArrowRight size={16} />
            </Link>

          </div>

        </main>

        <Footer />

      </div>
    )
  }

  const isApproved =
    result.prediction === "Approved"

  const confidence = isApproved
    ? result.approvedProbability
    : result.rejectedProbability

  const explanation =
    result.explanation || []

  const fairness =
    result.fairness || {
      fairnessScore: 0,
      groups: []
    }

  /* --------------------------------
     Feature Name Formatting
  -------------------------------- */

  const formatFeatureName = (feature) => {
    const featureNames = {
      Age: "Age",
      Income: "Annual Income",
      CreditScore: "Credit Score",
      Employment: "Employment",
      LoanAmount: "Loan Amount",
      LoanTerm: "Loan Term"
    }

    return featureNames[feature] || feature
  }

  /* --------------------------------
     Explanation Description
  -------------------------------- */

  const getExplanationDescription = (
    feature,
    effect
  ) => {
    const readableFeature =
      formatFeatureName(feature)

    if (effect === "Positive") {
      return `${readableFeature} positively influenced the prediction.`
    }

    if (effect === "Negative") {
      return `${readableFeature} negatively influenced the prediction.`
    }

    return `${readableFeature} had a neutral influence on the prediction.`
  }

  /* --------------------------------
     Explanation Bar Width
  -------------------------------- */

  const getBarWidth = (value) => {
    const numericValue = Math.abs(
      Number(value)
    )

    if (numericValue >= 1) return "90%"
    if (numericValue >= 0.75) return "75%"
    if (numericValue >= 0.5) return "60%"
    if (numericValue >= 0.25) return "45%"

    return "30%"
  }

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        {/* --------------------------------
            Header
        -------------------------------- */}

        <div className="mb-7">

          <Link
            to="/loan-prediction"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={16} />
            New Prediction
          </Link>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Prediction Result
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Review the loan decision, confidence and factors influencing the prediction.
          </p>

        </div>

        {/* --------------------------------
            Main Result
        -------------------------------- */}

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px]">

            {/* Decision */}

            <div className="p-6 sm:p-8">

              <div className="flex items-center gap-4">

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                    isApproved
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >

                  {isApproved ? (
                    <CheckCircle2 size={28} />
                  ) : (
                    <XCircle size={28} />
                  )}

                </div>

                <div>

                  <p className="text-sm font-medium text-slate-500">
                    Loan Decision
                  </p>

                  <h2
                    className={`mt-1 text-3xl font-bold ${
                      isApproved
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {result.prediction}
                  </h2>

                </div>

              </div>

              <div className="mt-8">

                <div className="flex items-end justify-between">

                  <div>

                    <p className="text-sm text-slate-500">
                      Prediction Confidence
                    </p>

                    <p className="mt-1 text-3xl font-bold text-slate-950">
                      {confidence}%
                    </p>

                  </div>

                  {isApproved ? (
                    <TrendingUp
                      size={23}
                      className="text-emerald-500"
                    />
                  ) : (
                    <TrendingDown
                      size={23}
                      className="text-red-500"
                    />
                  )}

                </div>

                <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100">

                  <div
                    className={`h-full rounded-full ${
                      isApproved
                        ? "bg-emerald-500"
                        : "bg-red-500"
                    }`}
                    style={{
                      width: `${confidence}%`
                    }}
                  />

                </div>

              </div>

            </div>

            {/* AI Status */}

            <div className="flex flex-col justify-center bg-slate-950 p-6 text-white sm:p-8">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
                <Sparkles size={21} />
              </div>

              <p className="mt-5 text-xs font-medium uppercase tracking-wider text-slate-500">
                AI Analysis
              </p>

              <p className="mt-2 text-lg font-bold">
                Analysis Completed
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                The model has analyzed the submitted applicant information.
              </p>

            </div>

          </div>

        </section>

        {/* --------------------------------
            Applicant Information
        -------------------------------- */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <UserRound size={20} />
            </div>

            <div>

              <h2 className="text-lg font-bold text-slate-950">
                Applicant Information
              </h2>

              <p className="text-sm text-slate-500">
                Information used for this prediction
              </p>

            </div>

          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {/* Age */}

            <div className="rounded-xl bg-slate-50 p-4">

              <p className="text-xs text-slate-400">
                Age
              </p>

              <p className="mt-1 text-sm font-bold text-slate-900">
                {result.age} Years
              </p>

            </div>

            {/* Annual Income */}

            <div className="rounded-xl bg-slate-50 p-4">

              <div className="flex items-center gap-2">

                <IndianRupee
                  size={14}
                  className="text-slate-400"
                />

                <p className="text-xs text-slate-400">
                  Annual Income
                </p>

              </div>

              <p className="mt-1 text-sm font-bold text-slate-900">
                ₹{Number(result.income).toLocaleString("en-IN")}
              </p>

            </div>

            {/* Credit Score */}

            <div className="rounded-xl bg-slate-50 p-4">

              <div className="flex items-center gap-2">

                <CreditCard
                  size={14}
                  className="text-slate-400"
                />

                <p className="text-xs text-slate-400">
                  Credit Score
                </p>

              </div>

              <p className="mt-1 text-sm font-bold text-slate-900">
                {result.creditScore}
              </p>

            </div>

            {/* Employment */}

            <div className="rounded-xl bg-slate-50 p-4">

              <div className="flex items-center gap-2">

                <BriefcaseBusiness
                  size={14}
                  className="text-slate-400"
                />

                <p className="text-xs text-slate-400">
                  Employment
                </p>

              </div>

              <p className="mt-1 text-sm font-bold text-slate-900">
                {result.employment}
              </p>

            </div>

            {/* Loan Amount */}

            <div className="rounded-xl bg-slate-50 p-4">

              <p className="text-xs text-slate-400">
                Loan Amount
              </p>

              <p className="mt-1 text-sm font-bold text-slate-900">
                ₹{Number(result.loanAmount).toLocaleString("en-IN")}
              </p>

            </div>

            {/* Loan Term */}

            <div className="rounded-xl bg-slate-50 p-4">

              <p className="text-xs text-slate-400">
                Loan Term
              </p>

              <p className="mt-1 text-sm font-bold text-slate-900">
                {result.loanTerm} Months
              </p>

            </div>

          </div>

        </section>

        {/* --------------------------------
            Explanation + Fairness
        -------------------------------- */}

        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">

          {/* Decision Explanation */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <Sparkles size={20} />
              </div>

              <div>

                <h2 className="text-lg font-bold text-slate-950">
                  Decision Explanation
                </h2>

                <p className="text-sm text-slate-500">
                  Factors influencing the prediction
                </p>

              </div>

            </div>

            <div className="mt-7 space-y-5">

              {explanation.map(
                (factor, index) => (

                  <div
                    key={`${factor.feature}-${index}`}
                  >

                    <div className="flex items-center justify-between gap-4">

                      <div>

                        <p className="text-sm font-semibold text-slate-800">
                          {formatFeatureName(
                            factor.feature
                          )}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {getExplanationDescription(
                            factor.feature,
                            factor.effect
                          )}
                        </p>

                      </div>

                      <span
                        className={`shrink-0 text-sm font-bold ${
                          factor.effect === "Positive"
                            ? "text-emerald-600"
                            : factor.effect === "Negative"
                            ? "text-red-500"
                            : "text-slate-500"
                        }`}
                      >
                        {Number(factor.value) > 0
                          ? "+"
                          : ""}
                        {Number(
                          factor.value
                        ).toFixed(2)}
                      </span>

                    </div>

                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">

                      <div
                        className={`h-full rounded-full ${
                          factor.effect === "Positive"
                            ? "bg-emerald-500"
                            : factor.effect === "Negative"
                            ? "bg-red-400"
                            : "bg-slate-400"
                        }`}
                        style={{
                          width: getBarWidth(
                            factor.value
                          )
                        }}
                      />

                    </div>

                  </div>

                )
              )}

              {explanation.length === 0 && (
                <p className="text-sm text-slate-500">
                  No explanation data available for this prediction.
                </p>
              )}

            </div>

          </div>

          {/* Fairness Analysis */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <ShieldCheck size={20} />
              </div>

              <div>

                <h2 className="text-lg font-bold text-slate-950">
                  Fairness Analysis
                </h2>

                <p className="text-sm text-slate-500">
                  Decision fairness indicator
                </p>

              </div>

            </div>

            {/* Fairness Score */}

            <div className="mt-7 rounded-2xl bg-slate-50 p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-500">
                    Fairness Score
                  </p>

                  <p className="mt-1 text-3xl font-bold text-slate-950">
                    {fairness.fairnessScore}%
                  </p>

                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <ShieldCheck size={23} />
                </div>

              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">

                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{
                    width: `${fairness.fairnessScore}%`
                  }}
                />

              </div>

              <p className="mt-4 text-xs leading-5 text-slate-500">
                Fairness score calculated from approval-rate differences across employment groups.
              </p>

            </div>

            {/* Fairness Groups */}

            <div className="mt-5 space-y-3">

              {fairness.groups?.map(
                (group) => (

                  <div
                    key={group.employment}
                    className="rounded-xl border border-slate-200 bg-white p-4"
                  >

                    <div className="flex items-center justify-between">

                      <p className="text-sm font-semibold text-slate-800">
                        {group.employment}
                      </p>

                      <p className="text-sm font-bold text-slate-950">
                        {group.approvalRate}%
                      </p>

                    </div>

                    <div className="mt-2 flex items-center justify-between text-xs text-slate-400">

                      <span>
                        Applications:{" "}
                        {group.totalApplications}
                      </span>

                      <span>
                        Approved:{" "}
                        {group.approved}
                      </span>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </section>

        {/* --------------------------------
            Actions
        -------------------------------- */}

        <section className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">

          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Back to Dashboard
          </Link>

          <Link
            to="/loan-prediction"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            New Prediction
            <ArrowRight size={17} />
          </Link>

        </section>

      </main>

      <Footer />

    </div>
  )
}

export default PredictionResult