<?php
include '../conexao.php';

$id = $_GET['id'];

$conexao->query("DELETE FROM produto WHERE id = $id");

header('location:../index.php?pagina=cadastrar');
