<?php
session_start();
include_once "../conexao.php";

$email = $_GET['email'];
$senha = $_GET['senha'];

$sql = "SELECT * FROM usuario WHERE email = '$email' AND senha = '$senha'";

$resposta = $conexao->query($sql);

if ($resposta->num_rows > 0) {
    $usuario = $resposta->fetch_object();

    $_SESSION['usuario'] = $usuario->nome;
    $_SESSION['email'] = $usuario->email;

    header('location: ../index.php');
    exit;
} else {
    $_SESSION['erro_login'] = "Email ou senha inválidos.";
    header('location: login.php');
    exit;
}