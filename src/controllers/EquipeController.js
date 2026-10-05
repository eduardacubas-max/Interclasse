import EquipeView from '../views/EquipeView.js';

class EquipeController {
    constructor(arenaConnect) {
        this.arenaConnect = arenaConnect;
        this.view = new EquipeView();
    }

    cadastrar() {
        this.arenaConnect.adicionarEquipe();
    }

    listar() {

        this.arenaConnect.listarEquipes();
    }
}

export default EquipeController;