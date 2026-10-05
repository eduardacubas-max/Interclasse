class EquipeView {
    exibirMensagem(mensagem) {
        console.log(mensagem);
    }

    exibirLista(equipes, buscarNomeTurma) {
        console.log("\n=== LISTA DE EQUIPES ===");
        if (equipes.length === 0) {
            console.log("Nenhuma equipe cadastrada.");
            return;
        }
        equipes.forEach(equipe => {
            const nomeTurma = buscarNomeTurma ? buscarNomeTurma(equipe.idTurma) : equipe.idTurma;
            equipe.exibir(nomeTurma);
        });
    }
}

export default EquipeView;