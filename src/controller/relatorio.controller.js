const relatorioController = {
  validaConexao: (req, res) => {
    const objeto = { conexão: "concluida", data: new Date() };
    return res.json(objeto);
  },

  uploadFile: (req, res) => {
    console.log(req.data);
    return res.json({ mensagem: "ok" });
  },
};

module.exports = relatorioController;
