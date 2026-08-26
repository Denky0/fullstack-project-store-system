<?php

include_once '../conexao.php';

$produto_nome = $_GET['produto'];
$data = $_GET['data'];
$operacao = $_GET['operacao'];
$quantidade_movimentada = intval($_GET['quantidade']);

$select_id = "SELECT id, quantidade FROM produto WHERE nome = '$produto_nome'";
$result_id = $conexao->query($select_id);
$dados = $result_id->fetch_object();

$produto_id = $dados->id;
$quantidadeFinal = intval($dados->quantidade);

if ($operacao == 'entrada') {
    $quantidadeFinal += $quantidade_movimentada;
} else {
    $quantidadeFinal -= $quantidade_movimentada;
}

$insert = "INSERT INTO venda (produto, data, operacao, quantidade) VALUES ($produto_id, '$data', '$operacao', $quantidade_movimentada)";
$conexao->query($insert);

$update = "UPDATE produto SET quantidade = $quantidadeFinal WHERE id = $produto_id";
$conexao->query($update);

header('location:../index.php');

?>