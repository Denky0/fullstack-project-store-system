<?php

$nome_servidor = "localhost";
$nome_usuario = "root";
$senha_usuario = "";
$nome_db = "saep_db";
$porta  = "3307";

$conexao = new mysqli($nome_servidor, $nome_usuario, $senha_usuario, $nome_db, $porta);

if ($conexao->connect_error) {
    die("Erro de conexão" . $conexao->connect_error);
}
