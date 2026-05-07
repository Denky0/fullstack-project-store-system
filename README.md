# 🏠 Gestão de Estoque — Fullstack Project

Sistema web de gerenciamento de estoque para lojas de ferramentas, desenvolvido como projeto fullstack para portfólio.

## 🔗 Links

- **Frontend:** https://fullstack-project-store-system-1.onrender.com
- **Backend:** https://fullstack-project-store-system.onrender.com
- **Repositório:** https://github.com/Denky0/fullstack-project-store-system

---

## 🚀 Tecnologias Utilizadas

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT (JSON Web Token)
- Bcrypt
- CORS

### Frontend
- HTML5
- CSS3
- Bootstrap 5
- JavaScript (Vanilla)

### Deploy
- Render (Backend + Banco de dados)
- Render Static Site (Frontend)

---

## ✅ Funcionalidades

- Autenticação com JWT (login e cadastro de usuário)
- Cadastro, edição e exclusão de produtos
- Controle de estoque com alertas de estoque baixo
- Registro de movimentações de entrada e saída
- Histórico de movimentações ordenado por data
- Proteção de rotas — acesso restrito a usuários autenticados
- Busca de produtos por nome

---

## 🛠️ Como Rodar Localmente

### Pré-requisitos
- Node.js instalado
- PostgreSQL instalado ou conta no Render

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/Denky0/fullstack-project-store-system.git
```

2. Instale as dependências:
```bash
npm install
```

3. Crie o arquivo `.env` na raiz do projeto:
```env
DATABASE_URL=sua_url_do_postgresql
JWT_SECRET=sua_chave_secreta
PORT=3000
```

4. Crie as tabelas no banco:
```bash
node setup.js
```

5. Inicie o servidor:
```bash
node server.js
```

6. Abra o front-end com Live Server na pasta `front_end`

---

## 📁 Estrutura do Projeto

```
fullstack-project-store-system/
├── front_end/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── auth.js
│   │   ├── home.js
│   │   └── produtos.js
│   ├── index.html
│   ├── login.html
│   └── cadastro.html
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── produtoController.js
│   │   ├── usuarioController.js
│   │   └── vendaController.js
│   ├── middlewares/
│   │   └── auth.js
│   └── routes/
│       ├── authRoutes.js
│       ├── produtoRoutes.js
│       ├── usuarioRoutes.js
│       └── vendaRoutes.js
├── server.js
├── setup.js
└── package.json
```

---

## 👨‍💻 Autor

Desenvolvido por **Allan Guilherme**
