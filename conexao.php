<?php

function carregarEnv($caminho) {
    $linhas = file($caminho, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($linhas as $linha) {
        if (strpos(trim($linha), '#') === 0) continue;
        list($chave, $valor) = explode('=', $linha, 2);
        $_ENV[trim($chave)] = trim($valor);
    }
}

carregarEnv(__DIR__ . '/.env');

$nome_servidor = $_ENV['DB_HOST'];
$nome_usuario = $_ENV['DB_USER'];
$senha_usuario = $_ENV['DB_PASS'];
$nome_db = $_ENV['DB_NAME'];

$conexao = new mysqli($nome_servidor, $nome_usuario, $senha_usuario, $nome_db);

if ($conexao->connect_error) {
    die("Erro de conexão" . $conexao->connect_error);
}