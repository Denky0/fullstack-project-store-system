<?php
session_start();
include_once '../conexao.php';

$id = $_GET['id'];

$check = $conexao->query("SELECT COUNT(*) as total FROM venda WHERE produto = $id");
$row = $check->fetch_object();

if ($row->total > 0) {
    $_SESSION['erro'] = "Não é possível apagar este produto: existem vendas registradas para ele.";
    header('location:../index.php?pagina=cadastrar');
    exit;
}

$conexao->query("DELETE FROM produto WHERE id = $id");

header('location:../index.php?pagina=cadastrar');