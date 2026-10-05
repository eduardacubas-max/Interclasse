import TurmaView from '../views/TurmaView.js';

class TurmaController {
    constructor(arenaConnect) {
        this.arenaConnect = arenaConnect;
        this.view = new TurmaView();
    }

    cadastrar() {
        this.arenaConnect.adicionarTurma();
    }

    listar() {
        this.arenaConnect.listarTurmas();
    }
}

export default TurmaController;