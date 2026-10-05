class TurmaView {
    exibirMensagem(mensagem) {
        console.log(mensagem);
    }

    exibirLista(turmas) {
        console.log("\n=== LISTA DE TURMAS ===");
        if (turmas.length === 0) {
            console.log("Nenhuma turma cadastrada.");
            return;
        }
        turmas.forEach(turma => turma.exibir());
    }
}

export default TurmaView;