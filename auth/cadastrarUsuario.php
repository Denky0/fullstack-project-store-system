<?php
session_start();
include_once "../conexao.php";


if (isset($_REQUEST['nome'])) {
    $nome = $_GET['nome'];
    $email = $_GET['email'];
    $senha = $_GET['senha'];

    try {
        $result = $conexao->query("INSERT INTO usuario VALUES('','$nome','$email','$senha')");

        if ($result) {
            $_SESSION['usuario'] = $nome;
            $_SESSION['email'] = $email;
            echo "<meta http-equiv='refresh' content='1;url=../index.php'>";
            echo "<div class='alert alert-success text-center mt-3 fw-bold rounded-pill shadow-sm'>
                ✅ Cadastrado com Sucesso!
                </div>";
        }
    } catch (Exception $e) {
        echo "<p class='text-danger ms-5'>Erro ao cadastrar</p>" . $e->getMessage();
    }
}

?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="bg-dark d-flex justify-content-center align-items-center" style="height: 100vh;">
    <div class="card p-4 border-0"
        style="width: 380px; background-color: #111; border-radius: 15px; box-shadow: 0 12px 30px rgba(0, 0, 0, 0.9), 0 0 18px rgba(95, 158, 160, 0.25); transform: translateY(-6px);">
        <h2 class="text-center mb-4" style="color: cadetblue; font-weight: 600;">Criar Conta</h2>
        <form action="" method="GET">
            <div class="mb-3">
                <label class="form-label text-light">Seu Nome</label>
                <input class="form-control bg-dark text-light border-secondary" type="text" name="nome" placeholder="Nome completo" required>
            </div>
            <div class="mb-3">
                <label class="form-label text-light">Seu Email</label>
                <input class="form-control bg-dark text-light border-secondary" type="email" name="email" placeholder="Email" required>
            </div>
            <div class="mb-3">
                <label class="form-label text-light">Crie uma Senha</label>
                <input class="form-control bg-dark text-light border-secondary" type="password" name="senha" placeholder="Senha" required>
            </div>
            <button class="btn w-100 mb-2" style="background-color: cadetblue; color: white; font-weight: 600;" type="submit">Cadastrar</button>
        </form>
        <div class="text-center mt-2">
            <a href="login.php" style="color: cadetblue; text-decoration: none;">Já tenho login</a>
        </div>
    </div>
</body>

</html>