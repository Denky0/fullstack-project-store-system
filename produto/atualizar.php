<?php
include_once '../conexao.php';

$id = $_GET['id'];
$nome = $_GET['nome'];
$quantidade = $_GET['quantidade'];
$valor = $_GET['valor'];
$update = "UPDATE produto SET nome ='$nome', quantidade = '$quantidade', valor = '$valor' WHERE id = $id";
$result = $conexao->query($update);

if ($result === true) {
    echo "<h1>Produto atualizado com sucesso !</h1>";
} else {
    echo "<h1>Erro ao atualizar !</h1>";
}

header('location:../index.php?pagina=cadastrar');
