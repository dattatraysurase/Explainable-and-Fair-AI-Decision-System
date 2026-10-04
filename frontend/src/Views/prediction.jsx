import { useState } from "react"
import { ArrowRight, BrainCircuit, RotateCcw } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import Footer from "../Components/Footer"
import Navbar from "../Components/Navbar"
import { predictLoan } from "../api/predictionApi"

const initialForm = {
  age: "",
  income: "",
  creditScore: "",
  employment: "",
  loanAmount: "",
  loanTerm: ""
}

const Prediction = () => {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [predictionResult, setPredictionResult] = useState(null)

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value
    }))

    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setError("")
    setPredictionResult(null)

    try {
      // Get JWT token
      const token = localStorage.getItem("token")

      if (!token) {
        setError("Please login again.")
        return
      }

      // Prepare data for backend
      const data = {
        age: Number(form.age),
        income: Number(form.income),
        creditScore: Number(form.creditScore),
        employment: form.employment,
        loanAmount: Number(form.loanAmount),
        loanTerm: Number(form.loanTerm)
      }

      // Call backend API
      const result = await predictLoan(data, token)

      // Store result in state
      setPredictionResult(result)

      // Store prediction result and applicant information
      localStorage.setItem(
        "predictionResult",
        JSON.stringify({
          ...result,
          applicant: data
        })
      )

      console.log("Prediction Result:", result)

      // Go to Prediction Result page
      navigate(`/prediction-result/${result.predictionId}`)

    } catch (error) {
      console.error("Prediction Error:", error)

      setError(
        error.message || "Unable to generate prediction."
      )

    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setForm(initialForm)
    setError("")
    setPredictionResult(null)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="mb-7">
          <Link
            to="/dashboard"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            ← Back to Dashboard
          </Link>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            New Loan Prediction
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Enter applicant information to generate a loan approval prediction.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <BrainCircuit size={23} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-950">
                  Loan Application
                </h2>

                <p className="text-sm text-slate-500">
                  Provide applicant information
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Age
                  </label>

                  <input
                    type="number"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="Enter age"
                    min="18"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Annual Income
                  </label>

                  <input
                    type="number"
                    name="income"
                    value={form.income}
                    onChange={handleChange}
                    placeholder="Enter annual income"
                    min="0"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Credit Score
                  </label>

                  <input
                    type="number"
                    name="creditScore"
                    value={form.creditScore}
                    onChange={handleChange}
                    placeholder="Enter credit score"
                    min="300"
                    max="900"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Employment Status
                  </label>

                  <select
                    name="employment"
                    value={form.employment}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  >
                    <option value="">Select status</option>
                    <option value="Salaried">Salaried</option>
                    <option value="Self-Employed">Self Employed</option>
                    <option value="Unemployed">Unemployed</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Loan Amount
                  </label>

                  <input
                    type="number"
                    name="loanAmount"
                    value={form.loanAmount}
                    onChange={handleChange}
                    placeholder="Enter loan amount"
                    min="0"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Loan Term
                  </label>

                  <select
                    name="loanTerm"
                    value={form.loanTerm}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  >
                    <option value="">Select term</option>
                    <option value="12">12 Months</option>
                    <option value="24">24 Months</option>
                    <option value="36">36 Months</option>
                    <option value="60">60 Months</option>
                  </select>
                </div>

              </div>

              {error && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={handleReset}
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <RotateCcw size={17} />
                  Reset
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Generating..." : "Generate Prediction"}
                  {!loading && <ArrowRight size={17} />}
                </button>

              </div>

            </form>

            {/* Prediction Result */}
            {predictionResult && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      Prediction Result
                    </p>

                    <h3 className="mt-1 text-2xl font-bold text-slate-950">
                      {predictionResult.prediction}
                    </h3>
                  </div>

                  <div
                    className={`rounded-full px-4 py-2 text-sm font-bold ${
                      predictionResult.prediction === "Approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {predictionResult.prediction}
                  </div>

                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-sm text-slate-500">
                      Approval Probability
                    </p>

                    <p className="mt-1 text-xl font-bold text-slate-900">
                      {predictionResult.probability?.Approved}%
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-sm text-slate-500">
                      Rejection Probability
                    </p>

                    <p className="mt-1 text-xl font-bold text-slate-900">
                      {predictionResult.probability?.Rejected}%
                    </p>
                  </div>

                </div>

              </div>
            )}

          </div>

          <div className="h-fit rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
              <BrainCircuit size={21} />
            </div>

            <h3 className="mt-6 text-lg font-bold">
              Loan Approval AI
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              The trained machine learning model analyzes the applicant
              information and generates a loan approval decision.
            </p>

            <div className="mt-7 space-y-3">

              <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                <p className="text-sm font-semibold">
                  AI Prediction
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Loan approval decision generated from applicant data
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                <p className="text-sm font-semibold">
                  Explanation
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Important factors behind the prediction
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                <p className="text-sm font-semibold">
                  Fairness Analysis
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Review fairness-related model indicators
                </p>
              </div>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  )
}

export default Prediction