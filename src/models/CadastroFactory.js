const { Atleta } = require('./Pessoa');
const Equipe = require('./Equipe');
const Turma = require('./Turma');

class CadastroFactory {
    static criarTurma(idTurma, nome) {
        return new Turma(idTurma, nome);
    }

    static criarAtleta(idAtleta, nome, idTurma) {
        return new Atleta(idAtleta, nome, idTurma);
    }

    static criarEquipe(idEquipe, idTurma, modalidade) {
        return new Equipe(idEquipe, idTurma, modalidade);
    }
}

module.exports = CadastroFactory;