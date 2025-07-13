
import type React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { ThemeProvider } from "./contexts/ThemeContext"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import Login from "./components/Login/Login"
import Header from "./components/Header/Header"
import Calendar from "./components/Calendar/Calendar"
import { useAuth } from "./contexts/AuthContext"
import "./styles/globals.scss"

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Header />}
        <main className="main-content">
          <div className="container">
            <Routes>
              <Route path="/login" element={isAuthenticated ? <Navigate to="/calendar" replace /> : <Login />} />
              <Route
                path="/calendar"
                element={
                  <ProtectedRoute>
                    <Calendar />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to={isAuthenticated ? "/calendar" : "/login"} replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  )
}

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
