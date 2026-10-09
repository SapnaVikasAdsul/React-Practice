import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import ConceptsPage from './pages/ConceptsPage.jsx'
import Home from './pages/Home.jsx'
import HooksPage from './pages/HooksPage.jsx'
import Login from './pages/Login.jsx'
import OptimizedSearchPage from './pages/OptimizedSearchPage.jsx'
import ReduxPage from './pages/ReduxPage.jsx'

const getNavLinkClass = ({ isActive }) => (
  isActive ? 'nav-link active' : 'nav-link'
)

const getLoginLinkClass = ({ isActive }) => (
  isActive ? 'login-link active' : 'login-link'
)

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <nav className="navbar">
          <NavLink to="/" className="brand">
            React Practice
          </NavLink>

          <div className="nav-actions">
            <NavLink to="/" className={getNavLinkClass}>
              Home
            </NavLink>
            <NavLink to="/concepts" className={getNavLinkClass}>
              Core Concepts
            </NavLink>
            <NavLink to="/hooks" className={getNavLinkClass}>
              Hooks
            </NavLink>
            <NavLink to="/redux" className={getNavLinkClass}>
              Redux
            </NavLink>
            <NavLink to="/optimized-search" className={getNavLinkClass}>
              Optimized Search
            </NavLink>
            <NavLink to="/login" className={getLoginLinkClass}>
              Login
            </NavLink>
          </div>
        </nav>

        <main className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/concepts" element={<ConceptsPage />} />
            <Route path="/hooks" element={<HooksPage />} />
            <Route path="/redux" element={<ReduxPage />} />
            <Route path="/optimized-search" element={<OptimizedSearchPage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
