const PartidaView = require('../views/PartidaView')

const PartidaController = {
    registrarPartida(sistema){
        sistema.listarEquipes();
        try{
            const idEquipeA = PartidaView.perguntarIdEquipe("Digite ID euiqpe A: ");
            const idEquipeB = PartidaView.perguntarIdEquipe("Digite ID euiqpe B: ");
            const golsA = PartidaView.perguntarGols("Informe gols da Equipe A: ");
            const golsB = PartidaView.perguntarGols("Informe gols da Equipe B: ");
            const { equipeA, equipeB} = sistema.registrarPartida(idEquipeA, idEquipeB, golsA, golsB)
            PartidaView.mostrarRegistrada(equipeA.modalidade, equipeB.modalidade, golsA, golsB)
        }catch (erro) {
            PartidaView.mostrarErroCadastro(erro.message)
        }
    },
    listar(sistema){
        PartidaView.listarPartidas(sistema.listarPartidas)
    }
}