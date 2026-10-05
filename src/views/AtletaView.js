const prompt = require('prompt-sync')();

const AtletaView = {
    perguntarIDTurma(){
        return parseInt(prompt("ID da Turma do Atleta"))
    },
    perguntarNome(){
        return prompt("Nome do Atleta")
    },
    perguntarID(rotulo = "ID do Atleta"){
        return parseInt(prompt(rotulo));
    },
    mostrarAtletaVinculado(){
        console.log('Atleta "${nomeAtleta}" vinculado ao ${nomeTurma}!');
    },
    mostrarErroCadastro(mensagem) {
        console.log('Não foi possível cadastrar oatleta: ${mensagem}')
    },
    listarAtleta(lista){
        console.log("\n=== LISTA DE ATLETAS ===");
        if (lista.lenght === 0) returnconsole.log("Nenhum atleta no sistema.");
        lista.forEach(({atleta, nomeTurma}) => atleta.exibir(nomeTurma));
    },
}

module.exports = AtletaView;