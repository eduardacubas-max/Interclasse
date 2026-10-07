const prompt = require('prompt-sync')();

const PartidaView = {
    perguntarIdEquipe(mensagem){
        return parseInt(prompt(mensagem));
    },
    perguntarGols(mensagem){
        return parseInt(prompt(mensagem));
    },
    mostrarRegistrada(nomeA, golsA, nomeB, golsB){
        console.log(`[SUCESSO] Partida registrada: ${nomeA} ${golsA} x ${golsB} ${nomeB}`)
    },
    mostrarErroCadastro(mensagem){
        console.log(`[ERRO] Não foi possível cadastrar o atleta ${mensagem}`)
    },

    listarPartidas(linhas){
        console.log("\n=== LISTA DE PARTIDAS ===");
        if (linhas.length === 0) return console.log("Nenhuma partida registrada!");
        linhas.forEach(({partida, nomeEquipeA, nomeEquipeB}) => partida.exibir(nomeEquipeA, nomeEquipeB));
    }
};

module.exports = PartidaView;