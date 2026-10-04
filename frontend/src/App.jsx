import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './Views/Register.jsx'
import Login from './Views/Login.jsx'
import Home from "./Views/Home.jsx"
import Dashboard from './Views/Dashboard.jsx'
import Prediction from './Views/prediction.jsx'
import PredictionResult from './Views/PredictionResult.jsx'
import History from './Views/History.jsx'

const App = () => {
  return (
    <Routes>

      <Route
        path="/Register"
        element={<Register />}
      />

      <Route
        path="/Login"
        element={<Login />}
      />

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/loan-prediction"
        element={<Prediction />}
      />

      {/* Prediction Result with specific prediction ID */}
      <Route
        path="/prediction-result/:id"
        element={<PredictionResult />}
      />

      <Route
        path="/history"
        element={<History />}
      />

    </Routes>
  )
}

export default App