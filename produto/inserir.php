<?php
include '../conexao.php';

$nome = $_GET['nome'];
$quantidade = $_GET['quantidade'];
$valor = $_GET['valor'];

$insert = "INSERT INTO produto VALUES('', '{$nome}', '{$quantidade}', '{$valor}')";
$result = $conexao->query($insert);

if ($result === true) {
    echo "<h1>Produto adicionado com sucesso !</h1>";
} else {
    echo "<h1>Erro ao adicionar !</h1>";
}

header('location:../index.php?pagina=cadastrar');

?>
