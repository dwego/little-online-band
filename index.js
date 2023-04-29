const dotenv = require("dotenv");
const conectarBancoDados = require("./src/database/connect");

dotenv.config();

async function main() {
  console.log("Connecting to the database...");
  try {
    await conectarBancoDados();
    console.log("Connected to the database...");
    require("./src/modules/express");
  } catch (err) {
    console.error("Error connecting to the database: ", err);
  }
}

main();
