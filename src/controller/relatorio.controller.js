const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

const relatorioController = {
  // GET /
  validaConexao: (req, res) => {
    const objeto = { conexão: "concluida", data: new Date() };
    return res.json(objeto);
  },

  // POST /upload
  uploadFile: async (req, res) => {
    if (!req.file) {
      return res.status(400).json("arquivo é obrigatorio");
    }

    const caminhoArquivoXLSX = path.join(
      __dirname,
      "../upload",
      req.file.filename
    );

    const workbook = xlsx.readFile(caminhoArquivoXLSX); //ler o excel no caminho informado
    const sheetName = workbook.SheetNames[0]; //escolhe a primeira aba
    const sheet = workbook.Sheets[sheetName]; //dados da primeira aba
    const data = xlsx.utils.sheet_to_json(sheet); //dados em json

    const agrupados = data.reduce((acumulador, linhaExcel) => {
      const gerente = linhaExcel.Produtor;
      if (!acumulador[gerente]) {
        acumulador[gerente] = [];
      }
      acumulador[gerente].push(linhaExcel);
      return acumulador;
    }, {});

    res.json({ dados: agrupados });

    //excluir o arquivo depois de usar
    fs.unlinkSync(caminhoArquivoXLSX);
  },
};

module.exports = relatorioController;
