import ArbitroView from '../views/ArbitroView.js';

class ArbitroController {
    constructor(arenaConnect) {
        this.arenaConnect = arenaConnect;
        this.view = new ArbitroView();
    }

    adicionar() {

        this.arenaConnect.adicionarArbitro();
    }

    listar() {
        this.arenaConnect.listarArbitros();
    }
}

export default ArbitroController;