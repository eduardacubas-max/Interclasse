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
    #nome;
    #idTurma;

    constructor(nome, idTurma) {
        this.#nome = nome;
        this.idTurma = idTurma;
    }

    get nome() {
        return this.#nome;
    }

    get idTurma() {
        return this.#idTurma;
    }

    set idTurma(novoIdTurma) {
        if (!novoIdTurma || String(novoIdTurma).trim().length < 3) {
            console.error("Erro: idTurma inválido! Não pode ser vazio e deve ter no mínimo 3 caracteres.");
            return;
        }
        this.#idTurma = novoIdTurma;
    }

    registrar() {
        console.log("Atleta registrado:", this.#nome, "| Turma ID:", this.#idTurma);
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

let atleta1 = new Atleta("Cypher", "T01");
atleta1.registrar();

console.log("Nome acessado via Getter:", atleta1.nome);

atleta1.idTurma = "AB";