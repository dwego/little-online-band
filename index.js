const dotenv = require("dotenv");
const conectarBancoDados = require("./src/database/connect");

dotenv.config();

async function main() {
  console.log("Conectando ao banco de dados...");
  try {
    await conectarBancoDados();
    console.log("Conectado ao banco de dados!");
    require("./src/modules/express");
  } catch (err) {
    console.error("Erro ao conectar ao banco de dados: ", err);
  }
}

main();
