<?php
session_start();
if (!isset($_SESSION['usuario'])) {
  header('Location: auth/login.php');
}

$usuario = $_SESSION['usuario'];
?>
<html lang="pt-br">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <title>Início</title>

  <style>
    body {
      background: #f3f7fa;
      font-family: "Inter", sans-serif;
    }

    .navbar {
      background: linear-gradient(90deg, cadetblue, #4a8a8a);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    .navbar-brand,
    .nav-link,
    .navbar-text {
      font-weight: 600;
    }

    .nav-link:hover {
      opacity: 0.85;
    }

    .container-content {
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);
      animation: fadeIn 0.4s ease;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(5px);
      }

      to {
        opacity: 1;
      }
    }
  </style>
</head>

<body>

  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <a class="navbar-brand fs-4" href="index.php">🏠 Gestão de Estoque</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarScroll">
        <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
          <li class="nav-item">
            <a class="nav-link active" href="?pagina=cadastrar">➕ Cadastrar Produto</a>
          </li>
        </ul>
        <ul class="navbar-nav">
          <span class="navbar-text nav-link active">👨‍💼 <?= $usuario ?> </span>
          <a class="navbar-text nav-link" href="?pagina=sair"> Sair ⮌</a>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container mt-4">
    <div class="container-content">

      <?php
      switch (@$_REQUEST['pagina']) {
        case 'cadastrar':
          include('produto/formCadastrar.php');
          break;
        case 'editar':
          include('produto/formEditar.php');
          break;
        case 'listar':
          include('produto/listar.php');
          break;
        case 'sair':
          include('auth/sair.php');
          break;
        default:
          include("home.php");
      }
      ?>

    </div>
  </div>

</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

</html>