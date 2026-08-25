<?php

$nome_servidor = "mysql-storageproject.alwaysdata.net";
$nome_usuario = "storageproject";
$senha_usuario = "#Allan5872"; // senha da sua conta Alwaysdata
$nome_db = "storageproject_db";

$conexao = new mysqli($nome_servidor, $nome_usuario, $senha_usuario, $nome_db);

if ($conexao->connect_error) {
    die("Erro de conexão" . $conexao->connect_error);
}