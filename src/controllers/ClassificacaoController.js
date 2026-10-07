const ClassificacaoView = require('../views/ClassificacaoView');

const ClassificacaoController = {
    mostrar(sistema) {
        const tabelas = sistema.calcularClassificacao();

        ClassificacaoView.mostrar(tabelas);
    }
};

module.exports = ClassificacaoController;