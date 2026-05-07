const db = require('./src/config/db');

const setup = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS usuario (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(32) NOT NULL,
        email VARCHAR(100) NOT NULL,
        senha VARCHAR(255) NOT NULL
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS produto (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(32) NOT NULL,
        quantidade INT NOT NULL,
        valor DECIMAL(10,2) NOT NULL
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS venda (
        id SERIAL PRIMARY KEY,
        produto INT NOT NULL REFERENCES produto(id),
        data DATE NOT NULL,
        operacao VARCHAR(32) NOT NULL,
        quantidade INT NOT NULL DEFAULT 1
      )
    `);

    console.log('Tabelas criadas com sucesso!');
    process.exit(0);

  } catch (err) {
    console.error('Erro ao criar tabelas:', err);
    process.exit(1);
  }
};

setup();