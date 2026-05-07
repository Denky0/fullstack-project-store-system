function getToken() {
  return localStorage.getItem('token');
}

function sair() {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  window.location.href = 'login.html';
}

function mostrarPagina(pagina) {
  const conteudo = document.getElementById('conteudo');

  switch (pagina) {
    case 'cadastrar':
      conteudo.innerHTML = getPaginaCadastrar();
      carregarProdutos();
      break;
    default:
      conteudo.innerHTML = getPaginaHome();
      carregarMovimentacoes();
      carregarProdutosSelect();
      break;
  }
}

window.onload = () => {
  const token = getToken();
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  const usuario = localStorage.getItem('usuario');
  document.getElementById('nomeUsuario').textContent = `👨‍💼 ${usuario}`;
  mostrarPagina('home');
};

function getPaginaHome() {
  return `
    <div style="background-color: #f1f4f8;">
      <div class="container py-4">
        <div class="card shadow-sm mb-4 border-0">
          <div class="card-header text-white" style="background-color: cadetblue;">
            <h5 class="mb-0">Registrar Movimentação de Estoque</h5>
          </div>
          <div class="card-body">
            <div class="row g-3">
              <div class="col-md-3">
                <label class="form-label">Informe o Dia</label>
                <input type="date" id="data" class="form-control">
              </div>
              <div class="col-md-3">
                <label class="form-label">Ferramenta</label>
                <select id="produto" class="form-select">
                  <option>Carregando...</option>
                </select>
              </div>
              <div class="col-md-3">
                <label class="form-label">Operação</label>
                <select id="operacao" class="form-select">
                  <option value="entrada">Entrada</option>
                  <option value="saida">Saída</option>
                </select>
              </div>
              <div class="col-md-3">
                <label class="form-label">Quantidade</label>
                <input type="number" id="quantidade" class="form-control" min="1" value="1">
              </div>
              <div class="col-12 text-end">
                <div id="erroMovimentacao" class="alert alert-danger d-none mb-2"></div>
                <button class="btn text-white px-4" onclick="registrarMovimentacao()" style="background-color: cadetblue;">Cadastrar</button>
              </div>
            </div>
          </div>
        </div>

        <div class="card shadow-sm mb-4 border-0">
          <div class="card-header text-white" style="background-color: cadetblue;">
            <h5 class="mb-0">Movimentações</h5>
          </div>
          <div class="card-body p-0">
            <table class="table table-hover table-bordered mb-0">
              <thead class="table-light">
                <tr>
                  <th>Ferramenta</th>
                  <th>Data</th>
                  <th>Operação</th>
                  <th>Quantidade</th>
                </tr>
              </thead>
              <tbody id="tabelaMovimentacoes">
                <tr><td colspan="4" class="text-center">Carregando...</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
}

async function carregarProdutosSelect() {
  const select = document.getElementById('produto');
  try {
    const resposta = await fetch(`${API}/produtos`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    const produtos = await resposta.json();
    select.innerHTML = produtos.map(p => `<option value="${p.id}">${p.nome}</option>`).join('');
  } catch (err) {
    select.innerHTML = '<option>Erro ao carregar</option>';
  }
}

async function carregarMovimentacoes() {
  const tbody = document.getElementById('tabelaMovimentacoes');
  try {
    const resposta = await fetch(`${API}/vendas`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    const vendas = await resposta.json();

    if (vendas.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" class="text-center text-muted">Nenhum registro encontrado</td></tr>`;
      return;
    }

    tbody.innerHTML = vendas.map(venda => `
      <tr>
        <td>${venda.produto}</td>
        <td>${new Date(venda.data).toLocaleDateString('pt-BR')}</td>
        <td>${venda.operacao === 'entrada'
          ? "<span class='badge bg-success'>Entrada</span>"
          : "<span class='badge bg-danger'>Saída</span>"
        }</td>
        <td>${venda.quantidade}</td>
      </tr>
    `).join('');

  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="4" class="text-center text-danger">Erro ao carregar movimentações</td></tr>`;
  }
}

async function registrarMovimentacao() {
  const produto = document.getElementById('produto').value;
  const data = document.getElementById('data').value;
  const operacao = document.getElementById('operacao').value;
  const quantidade = document.getElementById('quantidade').value;
  const erro = document.getElementById('erroMovimentacao');

  if (!data) {
    erro.textContent = 'Informe a data!';
    erro.classList.remove('d-none');
    return;
  }

  if (!quantidade || quantidade <= 0) {
    erro.textContent = 'Informe uma quantidade válida!';
    erro.classList.remove('d-none');
    return;
  }

  try {
    const resposta = await fetch(`${API}/vendas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ produto, data, operacao, quantidade })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      erro.textContent = dados.erro;
      erro.classList.remove('d-none');
      return;
    }

    erro.classList.add('d-none');
    carregarMovimentacoes();
    carregarProdutosSelect();

  } catch (err) {
    erro.textContent = 'Erro ao conectar com o servidor';
    erro.classList.remove('d-none');
  }
}