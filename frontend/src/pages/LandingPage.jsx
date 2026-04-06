import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar transparent />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-gray-950" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-600/20 border border-indigo-500/30 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
            <span className="text-indigo-300 text-sm font-medium">Powered by Inteligência Artificial</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Seu Assistente
            <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Inteligente
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            IntelliAssist combina IA avançada com uma interface intuitiva para responder suas 
            perguntas, ajudar em tarefas complexas e acelerar suas decisões.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/25"
            >
              Começar Grátis →
            </Link>
            <a
              href="#features"
              className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all"
            >
              Ver Demo
            </a>
          </div>
          
          <div className="mt-16 flex items-center justify-center gap-8 text-sm text-gray-500">
            <span>✓ Sem cartão de crédito</span>
            <span>✓ Configuração em 1 minuto</span>
            <span>✓ Histórico salvo</span>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-6 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">O Problema</h2>
            <p className="text-gray-400 text-lg">Você já passou por alguma dessas situações?</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "⏰",
                title: "Perda de Tempo",
                desc: "Horas pesquisando em múltiplas fontes para encontrar uma resposta simples"
              },
              {
                icon: "🎲",
                title: "Respostas Inconsistentes",
                desc: "Informações contraditórias de diferentes fontes, sem saber em qual confiar"
              },
              {
                icon: "🤔",
                title: "Falta de Contexto",
                desc: "Assistentes genéricos que não lembram do que você falou e não personalizam respostas"
              }
            ].map((item, i) => (
              <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-red-400">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossa Solução</h2>
            <p className="text-gray-400 text-lg">IntelliAssist resolve esses problemas de forma inteligente</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: "⚡",
                title: "Respostas Instantâneas",
                desc: "Obtenha respostas precisas em segundos, sem precisar pesquisar em múltiplos sites"
              },
              {
                icon: "🧠",
                title: "IA Avançada",
                desc: "Powered by GPT, nosso assistente entende contexto, nuances e responde naturalmente"
              },
              {
                icon: "📚",
                title: "Histórico de Conversas",
                desc: "O assistente lembra de toda a sua conversa, mantendo contexto entre mensagens"
              },
              {
                icon: "🌐",
                title: "Disponível 24/7",
                desc: "Acesse seu assistente a qualquer hora, de qualquer lugar, sem limitações de horário"
              }
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-indigo-900/20 to-purple-900/10 border border-indigo-700/30 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Por que IntelliAssist?</h2>
            <p className="text-gray-400 text-lg">Benefícios que fazem a diferença no seu dia a dia</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: "🚀", title: "Rápido", desc: "Respostas em segundos" },
              { icon: "🔒", title: "Seguro", desc: "Seus dados protegidos" },
              { icon: "💬", title: "Natural", desc: "Converse normalmente" },
              { icon: "📱", title: "Responsivo", desc: "Funciona em qualquer device" }
            ].map((item, i) => (
              <div key={i} className="text-center bg-gray-800/30 rounded-2xl p-6 border border-gray-700/30">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-semibold mb-1 text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Como Funciona</h2>
            <p className="text-gray-400 text-lg">Comece a usar em 3 passos simples</p>
          </div>
          
          <div className="space-y-6">
            {[
              { step: "01", title: "Crie sua conta", desc: "Cadastre-se gratuitamente em menos de 1 minuto" },
              { step: "02", title: "Faça sua pergunta", desc: "Digite qualquer dúvida, tarefa ou assunto que queira explorar" },
              { step: "03", title: "Receba respostas inteligentes", desc: "Nossa IA processa e entrega respostas precisas e contextualizadas" }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-14 h-14 bg-indigo-600/20 border border-indigo-500/40 rounded-xl flex items-center justify-center">
                  <span className="text-indigo-400 font-bold text-sm">{item.step}</span>
                </div>
                <div className="pt-2">
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-indigo-900/30 to-purple-900/20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para começar?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Junte-se a usuários que já usam IntelliAssist para ser mais produtivo
          </p>
          <Link
            to="/register"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/25"
          >
            Criar Conta Gratuita
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">IA</span>
            </div>
            <span className="text-gray-400 text-sm">IntelliAssist © 2024</span>
          </div>
          <p className="text-gray-600 text-sm">Powered by OpenAI GPT</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
