const API = 'http://localhost:3000/api';

async function login() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const erro = document.getElementById('erro');

  try {
    const resposta = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      erro.textContent = dados.erro;
      erro.classList.remove('d-none');
      return;
    }

    localStorage.setItem('token', dados.token);
    const payload = JSON.parse(atob(dados.token.split('.')[1]));
    localStorage.setItem('usuario', payload.nome);
    window.location.href = 'index.html';

  } catch (err) {
    erro.textContent = 'Erro ao conectar com o servidor';
    erro.classList.remove('d-none');
  }
}