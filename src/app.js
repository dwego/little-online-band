const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes/routes");
const config = require("./config/config");

config.middleware.forEach((middleware) => {
  app.use(middleware);
});

app.use("/", routes);

app.listen(config.port, () => {
  console.log(`Servidor iniciado na porta ${config.port}`);
});
