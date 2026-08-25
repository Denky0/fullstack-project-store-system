<?php
include "../conexao.php";

$email = $_GET['email'];
$senha = $_GET['senha'];

$sql = "SELECT * FROM usuario WHERE email = '$email' AND senha = '$senha'";

$resposta = $conexao->query($sql);

if ($resposta->num_rows > 0) {
    $usuario = $resposta->fetch_object();

    session_start();
    $_SESSION['usuario'] = $usuario->nome;
    $_SESSION['email'] = $usuario->email;

    header('location: ../index.php');
} else {
    echo "Erro ao logar";
}

?>

<a href="login.php">voltar</a>