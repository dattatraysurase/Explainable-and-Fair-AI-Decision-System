import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircleGauge,
  ShieldCheck,
  Sparkles,
  TrendingUp
} from "lucide-react"
import { Link } from "react-router-dom"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">

      <Navbar />

      <main className="flex-1">

        <section className="overflow-hidden bg-white">
          <div className="mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">

            <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">

              <div>

                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-2 text-xs font-semibold text-blue-600">
                  <Sparkles size={15} />
                  Explainable & Fair Loan AI
                </div>

                <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-[58px]">
                  Smarter
                  <span className="text-blue-600"> loan decisions</span>
                  <br />
                  with clear explanations.
                </h1>

                <p className="mt-6 max-w-xl text-base leading-8 text-slate-500 sm:text-lg">
                  Generate machine learning based loan approval predictions
                  and understand the key factors behind every decision through
                  explainable and fair AI.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                  <Link
                    to="/register"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                  >
                    Get Started
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>

                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
                  >
                    Sign In
                  </Link>

                </div>

                <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs text-slate-500">

                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-blue-600" />
                    Loan Prediction
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-blue-600" />
                    Decision Explanation
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-blue-600" />
                    Fairness Analysis
                  </div>

                </div>

              </div>

              <div className="relative">

                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-50 blur-3xl" />

                <div className="relative rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-[0_25px_60px_rgba(15,23,42,0.10)] sm:p-6">

                  <div className="rounded-2xl border border-slate-200 bg-white">

                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                          <BrainCircuit size={19} />
                        </div>

                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            Loan Decision
                          </p>

                          <p className="text-[11px] text-slate-400">
                            AI prediction analysis
                          </p>
                        </div>

                      </div>

                      <span className="rounded-full bg-green-50 px-3 py-1 text-[11px] font-semibold text-green-600">
                        Completed
                      </span>

                    </div>

                    <div className="space-y-5 p-5">

                      <div className="rounded-xl bg-slate-50 p-4">

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">
                            Loan Prediction
                          </span>

                          <TrendingUp
                            size={17}
                            className="text-blue-600"
                          />
                        </div>

                        <div className="mt-2 flex items-end justify-between">

                          <h2 className="text-2xl font-bold text-slate-900">
                            Approved
                          </h2>

                          <span className="text-sm font-bold text-blue-600">
                            92%
                          </span>

                        </div>

                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                          <div className="h-full w-[92%] rounded-full bg-blue-600" />
                        </div>

                      </div>

                      <div>

                        <div className="mb-3 flex items-center justify-between">

                          <p className="text-sm font-bold text-slate-800">
                            Decision Factors
                          </p>

                          <span className="text-[11px] text-slate-400">
                            AI Analysis
                          </span>

                        </div>

                        <div className="space-y-3">

                          <div>
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-600">
                                Annual Income
                              </span>

                              <span className="font-semibold text-green-600">
                                Positive
                              </span>
                            </div>

                            <div className="mt-1.5 h-1.5 rounded-full bg-slate-100">
                              <div className="h-full w-[76%] rounded-full bg-green-500" />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-600">
                                Credit History
                              </span>

                              <span className="font-semibold text-green-600">
                                Positive
                              </span>
                            </div>

                            <div className="mt-1.5 h-1.5 rounded-full bg-slate-100">
                              <div className="h-full w-[68%] rounded-full bg-green-500" />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-600">
                                Existing Loan
                              </span>

                              <span className="font-semibold text-red-500">
                                Negative
                              </span>
                            </div>

                            <div className="mt-1.5 h-1.5 rounded-full bg-slate-100">
                              <div className="h-full w-[30%] rounded-full bg-red-400" />
                            </div>
                          </div>

                        </div>

                      </div>

                      <div className="grid grid-cols-2 gap-3">

                        <div className="rounded-xl border border-slate-100 p-3">

                          <div className="flex items-center gap-2">
                            <Sparkles
                              size={15}
                              className="text-blue-600"
                            />

                            <span className="text-xs font-semibold text-slate-700">
                              Explanation
                            </span>
                          </div>

                          <p className="mt-2 text-[11px] text-green-600">
                            Available
                          </p>

                        </div>

                        <div className="rounded-xl border border-slate-100 p-3">

                          <div className="flex items-center gap-2">
                            <ShieldCheck
                              size={15}
                              className="text-blue-600"
                            />

                            <span className="text-xs font-semibold text-slate-700">
                              Fairness
                            </span>
                          </div>

                          <p className="mt-2 text-[11px] text-green-600">
                            Analyzed
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50">

          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

            <div className="max-w-2xl">

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                Core capabilities
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                One loan decision, three layers of understanding.
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
                The system generates a loan prediction and provides additional
                information to help understand and review the decision.
              </p>

            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">

              <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">

                <div className="flex items-center justify-between">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <CircleGauge size={22} />
                  </div>

                  <span className="text-xs font-bold text-slate-300">
                    01
                  </span>

                </div>

                <h3 className="mt-6 text-lg font-bold text-slate-900">
                  Loan Prediction
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Process applicant information and generate a loan approval
                  prediction using a machine learning model.
                </p>

                <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-blue-600">
                  ML Prediction
                  <ChevronRight size={14} />
                </div>

              </div>

              <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">

                <div className="flex items-center justify-between">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Sparkles size={22} />
                  </div>

                  <span className="text-xs font-bold text-slate-300">
                    02
                  </span>

                </div>

                <h3 className="mt-6 text-lg font-bold text-slate-900">
                  Explainable Decision
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Understand which applicant features contributed to the
                  generated loan decision.
                </p>

                <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-blue-600">
                  Decision Explanation
                  <ChevronRight size={14} />
                </div>

              </div>

              <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">

                <div className="flex items-center justify-between">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <ShieldCheck size={22} />
                  </div>

                  <span className="text-xs font-bold text-slate-300">
                    03
                  </span>

                </div>

                <h3 className="mt-6 text-lg font-bold text-slate-900">
                  Fairness Analysis
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Analyze loan model outcomes across relevant applicant
                  groups using fairness metrics.
                </p>

                <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-blue-600">
                  Fairness Analysis
                  <ChevronRight size={14} />
                </div>

              </div>

            </div>

          </div>

        </section>

        <section className="bg-white">

          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                  Loan decision flow
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  From applicant data to an explainable loan decision.
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                  Each loan application follows a structured process so the
                  prediction, explanation and fairness information can be
                  reviewed together.
                </p>

              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7">

                <div className="space-y-3">

                  <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">
                      01
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        Applicant Data
                      </p>

                      <p className="text-xs text-slate-400">
                        Enter loan application information
                      </p>
                    </div>

                  </div>

                  <div className="ml-8 h-4 border-l border-dashed border-slate-300" />

                  <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">
                      02
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        Loan Prediction
                      </p>

                      <p className="text-xs text-slate-400">
                        Generate approval decision
                      </p>
                    </div>

                  </div>

                  <div className="ml-8 h-4 border-l border-dashed border-slate-300" />

                  <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">
                      03
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        Decision Explanation
                      </p>

                      <p className="text-xs text-slate-400">
                        Identify important decision factors
                      </p>
                    </div>

                  </div>

                  <div className="ml-8 h-4 border-l border-dashed border-slate-300" />

                  <div className="flex items-center gap-4 rounded-xl bg-blue-600 p-4 shadow-lg shadow-blue-600/15">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15 text-sm font-bold text-white">
                      04
                    </div>

                    <div>
                      <p className="text-sm font-bold text-white">
                        Fairness Analysis
                      </p>

                      <p className="text-xs text-blue-100">
                        Review fairness-related model outcomes
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        <section className="bg-slate-900">

          <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-8">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
              <BrainCircuit size={24} />
            </div>

            <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
              Ready to explore a loan decision?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400">
              Create an account and generate explainable loan approval
              predictions with fairness analysis in one workspace.
            </p>

            <Link
              to="/register"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Create Account
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

          </div>

        </section>

      </main>

      <Footer />

    </div>
  )
}