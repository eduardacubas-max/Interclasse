class Atleta {
    constructor(nomeAtleta, idadeAtleta) {
        this.nomeAtleta = nomeAtleta;
        this.idadeAtleta = idadeAtleta;
    }

    registrar() {
        console.log("Atleta registrado:", this.nomeAtleta);
    }
}

let arena = [];

let atleta1 = new Atleta("Cypher", 19);

arena.push(atleta1);

atleta1.registrar();

console.log("Atletas na arena:");
console.log(arena);