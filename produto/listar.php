<h1 class="mt-4 mb-4 text-center" style="color: cadetblue; font-weight: 600;">Ferramentas Cadastradas</h1>

<div class="card-body">
    <form method="get" class="input-group">
        <input type="hidden" name="pagina" value="cadastrar">
        <button style="background-color: cadetblue; border: none; border-radius: 5px;" class="btn text-white" type="submit">🔎</button>
        <input name="busca" class="form-control" placeholder="Buscar produto" required>

        <?php if (isset($_GET['busca'])): ?>
            <a href="?pagina=cadastrar" class="btn text-white" style="background-color: cadetblue; border: none; border-radius: 5px; text-decoration: none;">❌ Limpar</a>
        <?php endif; ?>
    </form>
</div>

<?php
include_once('conexao.php');

if (isset($_GET['busca'])) {
    $busca = $_GET['busca'];
    $select = "SELECT * FROM produto WHERE nome like '%$busca%'";
} else {
    $select = "SELECT * FROM produto ORDER BY nome ASC";
}

$result = $conexao->query($select);
?>

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
            <tbody>
                <?php
                if ($result->num_rows > 0) {
                    while ($produto = $result->fetch_object()) {
                        $situacao = $produto->quantidade >= 10
                            ? "<span class='badge bg-success'>Estoque Suficiente</span>"
                            : "<span class='badge bg-danger'>Estoque Baixo</span>";

                        echo "
                        <tr>
                            <td>" . htmlspecialchars($produto->nome) . "</td>
                            <td>$produto->quantidade</td>
                            <td>R$ " . number_format($produto->valor, 2, ',', '.') . "</td>
                            <td>$situacao</td>
                            <td class='text-center' style='white-space: nowrap;'>
                                <a class='btn btn-sm btn-success me-2' 
                                   href='?pagina=editar&id=$produto->id'>
                                   ✏ Editar
                                </a>
                                <a class='btn btn-sm btn-danger'
                                   href='produto/apagar.php?id=$produto->id'
                                   onclick='return confirm(\"Tem certeza que deseja excluir o produto " . htmlspecialchars($produto->nome, ENT_QUOTES) . "?\")'>
                                   🗑 Excluir
                                </a>
                            </td>
                        </tr>";
                    }
                } else {
                    echo "
                    <tr>
                        <td colspan='5' class='text-center text-muted py-3'>
                            Nenhum produto cadastrado
                        </td>
                    </tr>";
                }
                ?>
            </tbody>
        </table>
    </div>
</div>