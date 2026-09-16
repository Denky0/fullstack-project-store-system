<?php
include_once('conexao.php');

if (isset($_GET['busca'])) {
    $busca = $_GET['busca'];
    $select = "SELECT * FROM produto WHERE id = '$busca' OR nome like '%$busca%' ORDER BY nome ASC";
} else {
    $select = "SELECT * FROM produto ORDER BY nome ASC";
}

$result = $conexao->query($select);
?>

<div class="container mt-5">
    <div class="card shadow-lg border-0">
        <div class="card-body p-4">

            <h1 class="mt-4 mb-4 text-center" style="color: cadetblue; font-weight: 600;">Ferramentas Cadastradas</h1>

            <div class="card-body">
                <form method="get" class="input-group">
                    <input type="hidden" name="pagina" value="cadastrar">
                    <button style="background-color: cadetblue; border: none; border-radius: 5px;" class="btn text-white" type="submit">🔎</button>
                    <input name="busca" class="form-control" placeholder="Buscar produto" maxlength="15" required>

                    <?php if (isset($_GET['busca'])): ?>
                        <a href="?pagina=cadastrar" class="btn text-white" style="background-color: cadetblue; border: none; border-radius: 5px; text-decoration: none;">❌ Limpar</a>
                    <?php endif; ?>
                </form>
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
                        <tbody>
                            <?php
                            if ($result->num_rows > 0) {
                                while ($produto = $result->fetch_object()) {

                                    if ($produto->quantidade < 50) {
                                        $situacao = "<span class='badge bg-danger'>Estoque Baixo</span>";
                                    } elseif ($produto->quantidade > 300) {
                                        $situacao = "<span class='badge bg-warning'>Estoque Acima</span>";
                                    } else {
                                        $situacao = "<span class='badge bg-success'>Estoque Suficiente</span>";
                                    }

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

        </div>
    </div>
</div>

<div class="modal fade" id="modalExcluir" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" style="border-radius: 12px;">
            <div class="modal-header" style="background-color: cadetblue; color: white; border-radius: 12px 12px 0 0;">
                <h5 class="modal-title">Confirmar Exclusão</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p class="mb-0">Tem certeza que deseja excluir o produto <strong id="nomeProdutoModal"></strong>?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <a id="linkConfirmarExclusao" href="#" class="btn btn-danger">Excluir</a>
            </div>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        var modalExcluir = document.getElementById('modalExcluir');
        modalExcluir.addEventListener('show.bs.modal', function(event) {
            var button = event.relatedTarget;
            var id = button.getAttribute('data-id');
            var nome = button.getAttribute('data-nome');

            document.getElementById('nomeProdutoModal').textContent = nome;
            document.getElementById('linkConfirmarExclusao').href = 'produto/apagar.php?id=' + id;
        });
    });
</script>