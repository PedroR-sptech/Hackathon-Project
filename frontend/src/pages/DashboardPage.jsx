import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, logout } from '../services/auth'
import api from '../services/api'

function DashboardPage() {
  const navigate = useNavigate()
  const user = getCurrentUser()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingHistory, setLoadingHistory] = useState(true)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    loadHistory()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const loadHistory = async () => {
    try {
      const response = await api.get('/api/chat/history')
      setMessages(response.data)
    } catch (error) {
      console.error('Error loading history:', error)
    } finally {
      setLoadingHistory(false)
    }
  }

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setLoading(true)

    const tempMsg = { id: Date.now(), role: 'user', content: userMessage, created_at: new Date().toISOString() }
    setMessages(prev => [...prev, tempMsg])

    try {
      const response = await api.post('/api/chat/message', { message: userMessage })
      const { user_message, assistant_message } = response.data
      
      setMessages(prev => [
        ...prev.filter(m => m.id !== tempMsg.id),
        user_message,
        assistant_message
      ])
    } catch (error) {
      setMessages(prev => prev.filter(m => m.id !== tempMsg.id))
      const errorMsg = {
        id: Date.now(),
        role: 'assistant',
        content: '⚠️ Erro ao comunicar com o servidor. Verifique se o backend está rodando.',
        created_at: new Date().toISOString()
      }
      setMessages(prev => [...prev, tempMsg, errorMsg])
    } finally {
      setLoading(false)
    }
  }

  const handleClearHistory = async () => {
    if (!window.confirm('Limpar todo o histórico de conversas?')) return
    try {
      await api.delete('/api/chat/history')
      setMessages([])
    } catch (error) {
      console.error('Error clearing history:', error)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">IA</span>
            </div>
            <span className="text-white font-bold">IntelliAssist</span>
          </div>
        </div>

        <div className="p-4">
          <button
            onClick={handleClearHistory}
            className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-gray-700"
          >
            <span>🗑️</span>
            Limpar Histórico
          </button>
        </div>

        <div className="flex-1 px-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Sessão atual</p>
          <div className="bg-gray-800/50 rounded-lg p-3 text-xs text-gray-400">
            <p>{messages.length} mensagens no histórico</p>
          </div>
        </div>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-indigo-600/30 rounded-full flex items-center justify-center border border-indigo-600/50">
              <span className="text-indigo-400 text-sm font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-sm text-gray-500 hover:text-red-400 transition-colors text-left"
          >
            ← Sair
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="px-6 py-4 border-b border-gray-800 bg-gray-900/50">
          <h1 className="text-white font-semibold">Chat com IntelliAssist</h1>
          <p className="text-xs text-gray-500">Assistente de IA disponível 24/7</p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {loadingHistory ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-500">Carregando histórico...</div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center mb-4 border border-indigo-500/30">
                <span className="text-3xl">🤖</span>
              </div>
              <h2 className="text-white font-semibold text-xl mb-2">Como posso ajudar?</h2>
              <p className="text-gray-400 max-w-md">
                Olá, {user?.name?.split(' ')[0]}! Sou o IntelliAssist, seu assistente de IA. 
                Pergunte qualquer coisa — estou aqui para ajudar!
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 max-w-md">
                {[
                  "Explique como funciona machine learning",
                  "Me ajude a escrever um email profissional",
                  "Quais são as melhores práticas de React?",
                  "Como otimizar meu tempo de trabalho?"
                ].map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(suggestion)}
                    className="text-left text-xs bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 rounded-lg p-3 text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6 max-w-3xl mx-auto">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 bg-indigo-600/30 rounded-full flex items-center justify-center flex-shrink-0 border border-indigo-500/40 mt-1">
                      <span className="text-sm">🤖</span>
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-sm'
                      : 'bg-gray-800 text-gray-100 rounded-bl-sm border border-gray-700/50'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 bg-indigo-600/30 rounded-full flex items-center justify-center flex-shrink-0 border border-indigo-500/40 mt-1">
                      <span className="text-sm font-bold text-indigo-400">{user?.name?.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                </div>
              ))}
              
              {loading && (
                <div className="flex gap-4 justify-start">
                  <div className="w-8 h-8 bg-indigo-600/30 rounded-full flex items-center justify-center flex-shrink-0 border border-indigo-500/40 mt-1">
                    <span className="text-sm">🤖</span>
                  </div>
                  <div className="bg-gray-800 rounded-2xl rounded-bl-sm border border-gray-700/50 px-4 py-3">
                    <div className="flex gap-1 items-center">
                      <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                      <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                      <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-800 bg-gray-900/50">
          <form onSubmit={handleSend} className="max-w-3xl mx-auto flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              disabled={loading}
              className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-3 rounded-xl font-medium transition-colors flex items-center gap-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span>→</span>
              )}
            </button>
          </form>
          <p className="text-center text-xs text-gray-600 mt-2">
            IntelliAssist pode cometer erros. Verifique informações importantes.
          </p>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
