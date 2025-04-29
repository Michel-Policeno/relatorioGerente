const express = require("express");
const relatorioRoute = require("./router/relatorio.route.js");

const app = express();
app.use(express.json()); //habilita json
app.use(express.urlencoded({ extended: true })); //configuração ler dados da requisição

//rotas
app.use(relatorioRoute);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Servidor Iniciado com sucesso. http://localhost:${PORT}/`)
);
