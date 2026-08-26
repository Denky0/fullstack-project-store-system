<body style="background-color: #f1f4f8;">
  <div class="container py-4">

    <div class="card shadow-sm mb-4 border-0">
      <div class="card-header text-white" style="background-color: cadetblue;">
        <h5 class="mb-0">Movimentações</h5>
      </div>
      <div class="card-body p-0">
        <?php
        include_once('conexao.php');
        $select = "SELECT venda.data, venda.operacao, venda.quantidade, produto.nome FROM venda JOIN produto ON venda.produto = produto.id ORDER BY venda.id DESC";
        $result = $conexao->query($select);
        ?>

        <table class='table table-hover table-bordered mb-0'>
          <thead class="table-light">
            <tr>
              <th>Ferramenta</th>
              <th>Data</th>
              <th>Operação</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            <?php
            if ($result->num_rows > 0) {
              while ($venda = $result->fetch_object()) {
                echo "
                <tr>
                  <td>$venda->nome</td>
                  <td>$venda->data</td>
                  <td>$venda->operacao</td>
                  <td>$venda->quantidade</td>
                </tr>";
              }
            } else {
              echo "
              <tr>
                <td colspan='4' class='text-center text-muted'>Nenhum registro encontrado</td>
              </tr>
              ";
            }
            ?>
          </tbody>
        </table>
      </div>
    </div>

    <div class="card shadow-sm mb-4 border-0">
      <div class="card-header text-white" style="background-color: cadetblue;">
        <h5 class="mb-0">Registrar Movimentação de Estoque</h5>
      </div>

      <div class="card-body">
        <form action="venda/inserir.php" method="GET" class="row g-3">

          <div class="col-md-3">
            <label class="form-label">Informe o Dia</label>
            <input type="date" name="data" required class="form-control">
          </div>

          <div class="col-md-3">
            <label class="form-label">Ferramenta</label>
            <select name="produto" class="form-select">
              <?php
              include_once('conexao.php');
              $select = "SELECT nome FROM produto";
              $result = $conexao->query($select);
              while ($produto = $result->fetch_object()) {
                echo "<option>$produto->nome</option>";
              };
              ?>
            </select>
          </div>

          <div class="col-md-3">
            <label class="form-label">Operação</label>
            <select name="operacao" class="form-select">
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
          </div>

          <div class="col-md-3">
            <label class="form-label">Quantidade</label>
            <input type="number" name="quantidade" min="1" value="1" required class="form-control">
          </div>

          <div class="col-12 text-end">
            <button class="btn text-white px-4" style="background-color: cadetblue;">Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</body>