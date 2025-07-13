
import type React from "react"
import { useAuth } from "../../contexts/AuthContext"
import { useTheme } from "../../contexts/ThemeContext"
import { LogOut, Moon, Sun, Calendar } from "lucide-react"
import "./Header.scss"

const Header: React.FC = () => {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-left">
            <div className="logo">
              <Calendar size={24} />
              <span>Clinic Calendar</span>
            </div>
          </div>

          <div className="header-right">
            <span className="user-name">Welcome, {user?.name}</span>

            <button onClick={toggleTheme} className="btn btn-secondary theme-toggle" aria-label="Toggle theme">
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button onClick={logout} className="btn btn-secondary logout-btn">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
