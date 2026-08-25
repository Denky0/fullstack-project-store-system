<?php

include "conexao.php";

if (isset($_GET['id'])) {

    $id = $_GET['id'];

    $select = "SELECT * FROM produto WHERE id = $id";

    $result = $conexao->query($select);

    $produto = $result->fetch_object();
}

?>
<div class="d-flex justify-content-center align-items-center" style="min-height: 70vh; box-shadow: 0 6px 18px rgba(0,0,0,0.15), 0 0 8px rgba(95,158,160,0.15); background-color: #f0f0f0;">
    <div class="card p-4 border-0"
        style="width: 360px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 6px 18px rgba(0,0,0,0.15), 0 0 8px rgba(95,158,160,0.15);">
        <h3 class="text-center mb-3" style="color: cadetblue; font-weight: 600;">Atualizar Ferramenta</h3>
        <form action="produto/atualizar.php" method="get">
            <input type="hidden" name="id" value="<?= $produto->id ?>">
            <div class="mb-2">
                <label class="form-label">Nome da Ferramenta</label>
                <input class="form-control" type="text" required value="<?= $produto->nome ?>" name="nome">
            </div>
            <div class="mb-2">
                <label class="form-label">Quantidade</label>
                <input class="form-control" type="number" required value="<?= $produto->quantidade ?>" name="quantidade">
            </div>
            <div class="mb-3">
                <label class="form-label">Valor do Produto</label>
                <input class="form-control" type="number" step="any" required value="<?= $produto->valor ?>" name="valor">
            </div>
            <button class="btn w-100" style="background-color: cadetblue; color: white; font-weight: 600;">Atualizar</button>
        </form>
    </div>
</div>
