class ArbitroView {
    exibirMensagem(mensagem) {
        console.log(mensagem);
    }

    exibirLista(arbitros) {
        console.log("\n=== LISTA DE ÁRBITROS ===");
        if (arbitros.length === 0) {
            console.log("Nenhum árbitro cadastrado.");
            return;
        }
        arbitros.forEach(arbitro => arbitro.exibir());
    }
}

export default ArbitroView;