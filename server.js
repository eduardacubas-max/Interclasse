const ArenaConnect = require('./src/models/ArenaConnect');
const MenuView = require('./src/views/MenuView');
const AtletaController = require('./src/controllers/AtletaController');
const PartidaController = require('./src/controllers/PartidaController');
const ClassificacaoController = require('./src/controllers/ClassificacaoController');

function main() {
    const sistema = ArenaConnect.getInstancia();

    sistema.carregarEstado();

    while (true) {
        const opcao = MenuView.mostrarMenu();

        if (opcao === "1") sistema.adicionarTurma();
        else if (opcao === "2") sistema.listarTurmas();
        else if (opcao === "3") AtletaController.adicionar(sistema);
        else if (opcao === "4") AtletaController.listar(sistema);
        else if (opcao === "5") sistema.adicionarArbitro();
        else if (opcao === "6") sistema.listarArbitros();
        else if (opcao === "7") sistema.adicionarEquipe();
        else if (opcao === "8") sistema.listarEquipes();
        else if (opcao === "9") sistema.vincularAtletaEquipe();
        else if (opcao === "10") sistema.desvincularAtletaEquipe();
        else if (opcao === "11") sistema.removerEquipe();
        else if (opcao === "12") PartidaController.registrarPartida(sistema);
        else if (opcao === "13") PartidaController.listar(sistema);
        else if (opcao === "14") ClassificacaoController.mostrar(sistema);
        else if (opcao === "0") {
            sistema.salvarEstado();
            console.log("Sistema encerrado e dados salvos com sucesso!");
            break;
        } else {
            MenuView.mostrarOpcaoInvalida();
        }
    }
}

if (require.main === module) {
    main();
}