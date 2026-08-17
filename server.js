class Turma {
    constructor(nomeAtleta, idadeAtleta) {
        this.nomeAtleta = nomeAtleta;
        this.idadeAtleta = idadeAtleta;
    }

    registrar() {
        console.log("Atleta registrado:", this.nomeAtleta);
    }
}

let turmas = [];

let turma1 = new Turma("Cypher", 19);

turmas.push(turma1);

turma1.registrar();

console.log("Turmas na arena:");
console.log(turmas);