# IntelliAssist — Plataforma de IA Inteligente

Uma plataforma full-stack de assistente de IA, com landing page moderna, autenticação de usuários e chat interativo com IA (powered by OpenAI GPT).

## 🏗️ Estrutura do Projeto

```
├── frontend/          # React + Vite + Tailwind CSS
└── backend/           # FastAPI + SQLAlchemy + OpenAI
```

## 🚀 Pré-requisitos

- **Node.js** >= 18
- **Python** >= 3.10
- **OpenAI API Key** (obtenha em https://platform.openai.com)

## ⚙️ Configuração e Execução

### 1. Backend (FastAPI)

```bash
cd backend

# Criar ambiente virtual
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

# Instalar dependências
pip install -r requirements.txt

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com sua OPENAI_API_KEY

# Iniciar servidor
uvicorn app.main:app --reload --port 8000
```

O backend ficará disponível em: http://localhost:8000  
Documentação Swagger: http://localhost:8000/docs

### 2. Frontend (React)

```bash
cd frontend

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O frontend ficará disponível em: http://localhost:5173

## 🔑 Variáveis de Ambiente (Backend)

Crie um arquivo `.env` na pasta `backend/` com:

```env
OPENAI_API_KEY=sua-chave-openai-aqui
SECRET_KEY=sua-chave-secreta-jwt-aqui
DATABASE_URL=sqlite:///./intelliassist.db
```

## ✨ Funcionalidades

- 🏠 **Landing Page** moderna com apresentação do produto
- 🔐 **Autenticação** completa (login/cadastro com JWT)
- 💬 **Chat com IA** powered by OpenAI GPT
- 📚 **Histórico de Conversas** salvo por usuário
- 🗑️ **Limpar histórico** a qualquer momento
- 📱 **Design responsivo** para mobile e desktop

## 🛠️ Tecnologias

**Frontend:**
- React 18 + Vite
- Tailwind CSS
- React Router DOM
- Axios

**Backend:**
- FastAPI
- SQLAlchemy + SQLite
- JWT Authentication (python-jose + passlib)
- OpenAI API

## 📡 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/auth/register` | Cadastrar usuário |
| POST | `/api/auth/login` | Fazer login |
| GET | `/api/auth/me` | Dados do usuário logado |
| POST | `/api/chat/message` | Enviar mensagem para IA |
| GET | `/api/chat/history` | Buscar histórico de conversas |
| DELETE | `/api/chat/history` | Limpar histórico |
