const ClassificacaoView = {
    mostrar(tabelas) {
        console.log("\n=== CLASSIFICAÇÃO DO CAMPEONATO ===");

        const modalidades = Object.keys(tabelas);

        if (modalidades.length === 0) {
            console.log("Nenhuma equipe cadastrada.");
            return;
        }

        modalidades.forEach(modalidade => {
            console.log(`\n--- ${modalidade} ---`);

            console.log(
                "Pos | Equipe | P | J | V | E | D | GP | GC | SG"
            );

            tabelas[modalidade].forEach(linha => {
                console.log(
                    `${linha.pos} | ${linha.equipe} | ${linha.pontos} | ${linha.jogos} | ${linha.vitorias} | ${linha.empates} | ${linha.derrotas} | ${linha.gp} | ${linha.gc} | ${linha.sg}`
                );
            });
        });
    }
};

module.exports = ClassificacaoView;