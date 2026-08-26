<?php session_start(); ?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="bg-dark d-flex justify-content-center align-items-center" style="height: 100vh;">

    <?php if (isset($_SESSION['erro_login'])): ?>
        <div class="alert alert-danger text-center mt-3 fw-bold rounded-pill shadow-sm position-absolute top-0 start-50 translate-middle-x" style="margin-top: 20px;">
            ❌ <?= $_SESSION['erro_login'] ?>
        </div>
        <?php unset($_SESSION['erro_login']); ?>
    <?php endif; ?>

    <div class="card p-4 border-0"
        style="width: 380px; background-color: #111; border-radius: 15px; box-shadow:0 12px 30px rgba(0, 0, 0, 0.9), 0 0 18px rgba(95, 158, 160, 0.25); transform: translateY(-6px);">
        <h2 class="text-center mb-4" style="color: cadetblue; font-weight: 600;">Acesso ao Sistema</h2>
        <form action="autenticar.php" method="GET">
            <div class="mb-3">
                <label for="email" class="form-label text-light">Informe seu E-mail</label>
                <input id="email" class="form-control bg-dark text-light border-secondary" type="email" name="email" placeholder="Digite seu email" required>
            </div>
            <div class="mb-3">
                <label for="senha" class="form-label text-light">Informe sua Senha</label>
                <input id="senha" class="form-control bg-dark text-light border-secondary" type="password" name="senha" placeholder="Digite sua senha" required>
            </div>
            <button class="btn w-100 mb-2"style="background-color: cadetblue; color: white; font-weight: 600;">Entrar</button>
        </form>
        <div class="text-center mt-2">
            <a href="cadastrarUsuario.php" style="color: cadetblue; text-decoration: none;">Criar uma conta</a>
        </div>
    </div>

</body>
</html>