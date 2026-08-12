let turmas = [];

function adicionarTurma(nome) {
    let turma = {
        id: turmas.length + 1,
        nome: nome
    };

    turmas.push(turma);

    console.log("Turma adicionada:", turma);
}

function listarTurmas() {
    for (let i = 0; i < turmas.length; i++) {
        console.log(turmas[i]);
    }
}

function removerTurma(id) {
    turmas = turmas.filter(function(turma) {
        return turma.id !== id;
    });

    console.log("Turma removida:", id);
}

adicionarTurma("Turma A");
adicionarTurma("Turma B");
adicionarTurma("Turma C");

listarTurmas();

removerTurma(2);

listarTurmas();