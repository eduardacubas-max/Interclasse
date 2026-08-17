class Turma {
    constructor(nome) {
        this.id = Turma.proximoId++;
        this.nome = nome;
    }

    adicionar() {
        console.log("Turma adicionada:", this);
    }

    listar() {
        console.log("Turma:", this);
    }

    remover() {
        console.log("Turma removida:", this.id);
    }
}

Turma.proximoId = 1;

class Atleta {
    constructor(nomeAtleta, idadeAtleta) {
        this.nomeAtleta = nomeAtleta;
        this.idadeAtleta = idadeAtleta;
    }

    registrar() {
        console.log("Atleta registrado:", this.nomeAtleta);
    }
}

let turmas = [];

let turma1 = new Turma("Turma A");
let turma2 = new Turma("Turma B");
let turma3 = new Turma("Turma C");

turmas.push(turma1);
turmas.push(turma2);
turmas.push(turma3);

console.log("Turmas cadastradas:");

for (let i = 0; i < turmas.length; i++) {
    turmas[i].listar();
}

turmas = turmas.filter(function(turma) {
    return turma.id !== 2;
});

console.log("Depois de remover a turma 2:");

for (let i = 0; i < turmas.length; i++) {
    turmas[i].listar();
}

let atleta1 = new Atleta("Cypher", 19);

atleta1.registrar();