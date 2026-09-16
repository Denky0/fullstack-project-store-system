<div class="card shadow-sm mb-4 border-1 p-5">
    <h2 class="text-center mb-4" style="color: cadetblue; font-weight: 600;">Cadastrar Ferramenta</h2>
    <form action="produto/inserir.php" method="get">
        <div class="mb-3">
            <label class="form-label fw-semibold">Nome da Ferramenta</label>
            <input class="form-control form-control-lg" type="text" name="nome" required>
        </div>
        <div class="mb-3">
            <label class="form-label fw-semibold">Quantidade</label>
            <input class="form-control form-control-lg" type="number" name="quantidade" min="0" required>
        </div>
        <div class="mb-4">
            <label class="form-label fw-semibold">Valor</label>
            <input class="form-control form-control-lg" type="number" step="any" min="0" name="valor" required>
        </div>
        <button class="btn w-100 py-2" style="background-color: cadetblue; color: white; font-size: 18px; border-radius: 8px;">Cadastrar</button>
    </form>
</div>