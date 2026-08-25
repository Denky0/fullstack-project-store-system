<?php

include '../conexao.php';

$produto = $_GET['produto'];
$data = $_GET['data'];
$operacao = $_GET['operacao'];

$insert = "INSERT INTO venda VALUES('', '{$produto}', '{$data}', '{$operacao}')";
$result = $conexao->query($insert);

$select = "SELECT quantidade FROM produto WHERE nome = '$produto'";
$result2 = $conexao->query($select);

$dados = $result2->fetch_object();

$quantidadeFinal = intval($dados->quantidade);

if ($operacao == 'entrada') {
    $quantidadeFinal++;
} else {
    $quantidadeFinal--;
}

$update = "UPDATE produto SET quantidade = $quantidadeFinal WHERE nome = '$produto'";
$result3 = $conexao->query($update);

header('location:../index.php?pagina=home');

?>
