function getPaginaCadastrar() {
  return `
    <div class="container mt-5">
      <div class="card shadow-lg border-0">
        <div class="card-body p-4">
          <div class="card shadow-sm mb-4 border-1 p-5">
            <h2 class="text-center mb-4" style="color: cadetblue; font-weight: 600;">Cadastrar Ferramenta</h2>
            <div class="mb-3">
              <label class="form-label fw-semibold">Nome da Ferramenta</label>
              <input class="form-control form-control-lg" type="text" id="nome" required>
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Quantidade</label>
              <input class="form-control form-control-lg" type="number" id="quantidade" min="0" required>
            </div>
            <div class="mb-4">
              <label class="form-label fw-semibold">Valor</label>
              <input class="form-control form-control-lg" type="number" step="any" min="0" id="valor" required>
            </div>
            <div id="erroProduto" class="alert alert-danger d-none"></div>
            <div id="sucessoProduto" class="alert alert-success d-none"></div>
            <button class="btn w-100 py-2" onclick="cadastrarProduto()" style="background-color: cadetblue; color: white; font-size: 18px; border-radius: 8px;">Cadastrar</button>
          </div>

          <div class="modal fade" id="modalExcluir" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header border-0">
                  <h5 class="modal-title" style="color: cadetblue; font-weight: 600;">Confirmar Exclusão</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                  Tem certeza que deseja excluir o produto <strong id="nomeProdutoModal"></strong>?
                </div>
                <div class="modal-footer border-0">
                  <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
                  <button type="button" class="btn btn-danger" id="btnConfirmarExcluir">Excluir</button>
                </div>
              </div>
            </div>
          </div>

          <h1 class="mt-4 mb-4 text-center" style="color: cadetblue; font-weight: 600;">Ferramentas Cadastradas</h1>

          <div class="input-group mb-3">
            <input type="text" id="busca" class="form-control" placeholder="Buscar produto">
            <button class="btn text-white" onclick="carregarProdutos()" style="background-color: cadetblue;">🔎</button>
            <button class="btn text-white" onclick="document.getElementById('busca').value=''; carregarProdutos()" style="background-color: cadetblue;">❌</button>
          </div>

          <div class="card shadow-lg border-0 mb-4">
            <div class="card-body p-0">
              <table class="table table-hover mb-0">
                <thead class="table-light">
                  <tr>
                    <th>Ferramenta</th>
                    <th>Quantidade</th>
                    <th>Valor</th>
                    <th>Situação</th>
                    <th class="text-center">Ações</th>
                  </tr>
                </thead>
                <tbody id="tabelaProdutos">
                  <tr><td colspan="5" class="text-center">Carregando...</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

async function carregarProdutos() {
  const busca = document.getElementById('busca')?.value || '';
  const tbody = document.getElementById('tabelaProdutos');

  try {
    const resposta = await fetch(`${API}/produtos`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    const produtos = await resposta.json();

    const filtrados = busca
      ? produtos.filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()))
      : produtos;

    if (filtrados.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">Nenhum produto cadastrado</td></tr>`;
      return;
    }

    tbody.innerHTML = filtrados.map(produto => `
      <tr>
        <td>${produto.nome}</td>
        <td>${produto.quantidade}</td>
        <td>R$ ${parseFloat(produto.valor).toFixed(2).replace('.', ',')}</td>
        <td>${produto.quantidade >= 20
          ? "<span class='badge bg-success'>Estoque Suficiente</span>"
          : "<span class='badge bg-danger'>Estoque Baixo</span>"
        }</td>
        <td class="text-center" style="white-space: nowrap;">
          <button class="btn btn-sm btn-success me-2" onclick="abrirEditar(${produto.id}, '${produto.nome}', ${produto.quantidade}, ${produto.valor})">✏ Editar</button>
          <button class="btn btn-sm btn-danger" onclick="excluirProduto(${produto.id}, '${produto.nome}')">🗑 Excluir</button>
        </td>
      </tr>
    `).join('');

  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center text-danger">Erro ao carregar produtos</td></tr>`;
  }
}

async function cadastrarProduto() {
  const nome = document.getElementById('nome').value;
  const quantidade = document.getElementById('quantidade').value;
  const valor = document.getElementById('valor').value;
  const erro = document.getElementById('erroProduto');
  const sucesso = document.getElementById('sucessoProduto');

  try {
    const resposta = await fetch(`${API}/produtos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ nome, quantidade, valor })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      erro.textContent = dados.erro;
      erro.classList.remove('d-none');
      sucesso.classList.add('d-none');
      return;
    }

    sucesso.textContent = 'Produto cadastrado com sucesso!';
    sucesso.classList.remove('d-none');
    erro.classList.add('d-none');
    document.getElementById('nome').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('valor').value = '';
    carregarProdutos();

  } catch (err) {
    erro.textContent = 'Erro ao conectar com o servidor';
    erro.classList.remove('d-none');
  }
}

function excluirProduto(id, nome) {
  document.getElementById('nomeProdutoModal').textContent = nome;
  const modal = new bootstrap.Modal(document.getElementById('modalExcluir'));
  modal.show();

  document.getElementById('btnConfirmarExcluir').onclick = async () => {
    modal.hide();
    try {
      const resposta = await fetch(`${API}/produtos/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        const alerta = document.createElement('div');
        alerta.className = 'alert alert-danger alert-dismissible fade show position-fixed bottom-0 end-0 m-4';
        alerta.style.zIndex = 9999;
        alerta.innerHTML = `
          ${dados.erro}
          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(alerta);
        setTimeout(() => alerta.remove(), 4000);
        return;
      }

      carregarProdutos();

    } catch (err) {
      alert('Erro ao excluir produto');
    }
  };
}

function abrirEditar(id, nome, quantidade, valor) {
  const conteudo = document.getElementById('conteudo');
  conteudo.innerHTML = `
    <div class="d-flex justify-content-center align-items-center" style="min-height: 70vh;">
      <div class="card p-4 border-0" style="width: 360px; border-radius: 12px; box-shadow: 0 6px 18px rgba(0,0,0,0.15);">
        <h3 class="text-center mb-3" style="color: cadetblue; font-weight: 600;">Atualizar Ferramenta</h3>
        <div class="mb-2">
          <label class="form-label">Nome da Ferramenta</label>
          <input class="form-control" type="text" id="editNome" value="${nome}">
        </div>
        <div class="mb-2">
          <label class="form-label">Quantidade</label>
          <input class="form-control" type="number" id="editQuantidade" value="${quantidade}">
        </div>
        <div class="mb-3">
          <label class="form-label">Valor do Produto</label>
          <input class="form-control" type="number" step="any" id="editValor" value="${valor}">
        </div>
        <div id="erroEditar" class="alert alert-danger d-none"></div>
        <button class="btn w-100 mb-2" onclick="atualizarProduto(${id})" style="background-color: cadetblue; color: white; font-weight: 600;">Atualizar</button>
        <button class="btn w-100 btn-outline-secondary" onclick="mostrarPagina('cadastrar')">Cancelar</button>
      </div>
    </div>
  `;
}

async function atualizarProduto(id) {
  const nome = document.getElementById('editNome').value;
  const quantidade = document.getElementById('editQuantidade').value;
  const valor = document.getElementById('editValor').value;
  const erro = document.getElementById('erroEditar');

  try {
    const resposta = await fetch(`${API}/produtos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ nome, quantidade, valor })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      erro.textContent = dados.erro;
      erro.classList.remove('d-none');
      return;
    }

    mostrarPagina('cadastrar');

  } catch (err) {
    erro.textContent = 'Erro ao conectar com o servidor';
    erro.classList.remove('d-none');
  }
}