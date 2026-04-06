import { Link, useNavigate } from 'react-router-dom'
import { logout, getCurrentUser } from '../services/auth'

function Navbar({ transparent = false }) {
  const navigate = useNavigate()
  const user = getCurrentUser()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between ${transparent ? 'bg-transparent' : 'bg-gray-900/95 backdrop-blur border-b border-gray-800'}`}>
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">IA</span>
        </div>
        <span className="text-white font-bold text-lg">IntelliAssist</span>
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors text-sm">
              Dashboard
            </Link>
            <span className="text-gray-400 text-sm">Olá, {user.name.split(' ')[0]}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600/20 hover:bg-red-600/40 text-red-400 px-4 py-2 rounded-lg text-sm transition-colors border border-red-600/30"
            >
              Sair
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-300 hover:text-white transition-colors text-sm">
              Entrar
            </Link>
            <Link
              to="/register"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Começar Grátis
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
