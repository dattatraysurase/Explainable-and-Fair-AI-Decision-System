import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserRound,
  CreditCard,
  IndianRupee,
  ArrowRight,
  BriefcaseBusiness
} from "lucide-react"
import { Link } from "react-router-dom"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"

const PredictionResult = () => {
  const result = {
    decision: "Approved",
    confidence: "92%",
    applicant: {
      age: "32",
      income: "₹8,00,000",
      creditScore: "760",
      employment: "Employed",
      loanAmount: "₹5,00,000",
      loanTerm: "36 Months"
    }
  }

  const factors = [
    {
      name: "Credit Score",
      value: "+0.38",
      description: "Strong credit score positively influenced the decision.",
      width: "76%",
      type: "positive"
    },
    {
      name: "Annual Income",
      value: "+0.31",
      description: "Stable income supports the loan repayment capability.",
      width: "62%",
      type: "positive"
    },
    {
      name: "Loan Amount",
      value: "+0.18",
      description: "Requested loan amount is within the acceptable range.",
      width: "45%",
      type: "positive"
    },
    {
      name: "Existing Risk",
      value: "-0.14",
      description: "Some risk factors slightly affected the decision.",
      width: "28%",
      type: "negative"
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}

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

        {/* Main Result */}

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px]">

            {/* Decision */}

            <div className="p-6 sm:p-8">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={28} />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Loan Decision
                  </p>

                  <h2 className="mt-1 text-3xl font-bold text-emerald-600">
                    {result.decision}
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
                      {result.confidence}
                    </p>
                  </div>

                  <TrendingUp
                    size={23}
                    className="text-emerald-500"
                  />

                </div>

                <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100">

                  <div className="h-full w-[92%] rounded-full bg-emerald-500" />

                </div>

              </div>

            </div>

            {/* Status */}

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

        {/* Applicant Information */}

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

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">
                Age
              </p>

              <p className="mt-1 text-sm font-bold text-slate-900">
                {result.applicant.age} Years
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2">
                <IndianRupee size={14} className="text-slate-400" />

                <p className="text-xs text-slate-400">
                  Annual Income
                </p>
              </div>

              <p className="mt-1 text-sm font-bold text-slate-900">
                {result.applicant.income}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2">
                <CreditCard size={14} className="text-slate-400" />

                <p className="text-xs text-slate-400">
                  Credit Score
                </p>
              </div>

              <p className="mt-1 text-sm font-bold text-slate-900">
                {result.applicant.creditScore}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2">
                <BriefcaseBusiness size={14} className="text-slate-400" />

                <p className="text-xs text-slate-400">
                  Employment
                </p>
              </div>

              <p className="mt-1 text-sm font-bold capitalize text-slate-900">
                {result.applicant.employment}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">
                Loan Amount
              </p>

              <p className="mt-1 text-sm font-bold text-slate-900">
                {result.applicant.loanAmount}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">
                Loan Term
              </p>

              <p className="mt-1 text-sm font-bold text-slate-900">
                {result.applicant.loanTerm}
              </p>
            </div>

          </div>

        </section>

        {/* Decision Explanation */}

        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">

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

              {factors.map((factor) => (

                <div key={factor.name}>

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {factor.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {factor.description}
                      </p>
                    </div>

                    <span
                      className={`text-sm font-bold ${
                        factor.type === "positive"
                          ? "text-emerald-600"
                          : "text-red-500"
                      }`}
                    >
                      {factor.value}
                    </span>

                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">

                    <div
                      className={`h-full rounded-full ${
                        factor.type === "positive"
                          ? "bg-emerald-500"
                          : "bg-red-400"
                      }`}
                      style={{ width: factor.width }}
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* Fairness */}

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

            <div className="mt-7 rounded-2xl bg-slate-50 p-5">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Fairness Score
                  </p>

                  <p className="mt-1 text-3xl font-bold text-slate-950">
                    92%
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <ShieldCheck size={23} />
                </div>

              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full w-[92%] rounded-full bg-emerald-500" />
              </div>

              <p className="mt-4 text-xs leading-5 text-slate-500">
                The prediction has been reviewed using the available
                fairness indicators.
              </p>

            </div>

          </div>

        </section>

        {/* Actions */}

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