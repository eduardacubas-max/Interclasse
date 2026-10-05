const fs = require('fs');
const path = require('path');
const prompt = require('prompt-sync')();
const Modalidade = require('./Modalidade');
const CadastroFactory = require('./CadastroFactory');

const ARQUIVO_DADOS = path.join(__dirname, '..', 'dados-arena-connect.json');

class ArenaConnect {

    static #instancia = null;

    constructor() {
        if (ArenaConnect.#instancia) {
            throw new Error("ArenaConnect já existe. Use ArenaConnect.getInstancia().");
        }

        this.turmas = [];
        this.atletas = [];
        this.arbitros = [];
        this.equipes = [];

        this.idTurmaContador = 1;
        this.idAtletaContador = 1;
        this.idArbitroContador = 1;
        this.idEquipeContador = 1;

        this.carregarEstado();
    }

    static getInstancia() {
        if (!ArenaConnect.#instancia) {
            ArenaConnect.#instancia = new ArenaConnect();
        }

        return ArenaConnect.#instancia;
    }

    salvarEstado() {
        const dados = {
            contadores: {
                turma: this.idTurmaContador,
                atleta: this.idAtletaContador,
                arbitro: this.idArbitroContador,
                equipe: this.idEquipeContador
            },
            turmas: this.turmas.map(t => ({
                id: t.id,
                nome: t.nome
            })),
            atletas: this.atletas.map(a => ({
                id: a.id,
                nome: a.nome,
                idTurma: a.idTurma
            })),
            arbitros: this.arbitros.map(ar => ({
                id: ar.id,
                nome: ar.nome,
                numeroCredencial: ar.numeroCredencial,
                anosExperiencia: ar.anosExperiencia
            })),
            equipes: this.equipes.map(e => ({
                id: e.id,
                idTurma: e.idTurma,
                modalidade: e.modalidade,
                atletas: e.atletas
            }))
        };

        fs.writeFileSync(ARQUIVO_DADOS, JSON.stringify(dados, null, 2));
    }

    carregarEstado() {
        if (!fs.existsSync(ARQUIVO_DADOS)) {
            return;
        }

        try {
            const arquivo = fs.readFileSync(ARQUIVO_DADOS, 'utf-8');
            const dados = JSON.parse(arquivo);

            if (dados.contadores) {
                this.idTurmaContador = dados.contadores.turma || 1;
                this.idAtletaContador = dados.contadores.atleta || 1;
                this.idArbitroContador = dados.contadores.arbitro || 1;
                this.idEquipeContador = dados.contadores.equipe || 1;
            }

            this.turmas = (dados.turmas || []).map(t => 
                CadastroFactory.criarTurma(t.id, t.nome)
            );

            this.atletas = (dados.atletas || []).map(a => 
                CadastroFactory.criarAtleta(a.id, a.nome, a.idTurma)
            );

            this.arbitros = (dados.arbitros || []).map(ar => 
                CadastroFactory.criarArbitro(ar.id, ar.nome, ar.numeroCredencial, ar.anosExperiencia)
            );

            this.equipes = (dados.equipes || []).map(e => {
                const equipeReconstruida = CadastroFactory.criarEquipe(e.id, e.idTurma, e.modalidade);
                
                if (e.atletas && Array.isArray(e.atletas)) {
                    e.atletas.forEach(idAtleta => {
                        equipeReconstruida.adicionarAtleta(idAtleta);
                    });
                }
                
                return equipeReconstruida;
            });

            console.log("Estado do Arena-Connect carregado com sucesso do arquivo JSON!");
        } catch (erro) {
            console.log(`Erro ao carregar o arquivo de dados: ${erro.message}`);
        }
    }

    buscarTurmaOuFalhar(idTurma) {
        const turma = this.turmas.find(turma => turma.id === idTurma);

        if (!turma) {
            throw new Error(`Turma com ID ${idTurma} não existe.`);
        }

        return turma;
    }

    buscarAtletaOuFalhar(idAtleta) {
        const atleta = this.atletas.find(atleta => atleta.id === idAtleta);

        if (!atleta) {
            throw new Error(`Atleta com ID ${idAtleta} não existe.`);
        }

        return atleta;
    }

    buscarEquipeOuFalhar(idEquipe) {
        const equipe = this.equipes.find(equipe => equipe.id === idEquipe);

        if (!equipe) {
            throw new Error(`Equipe com ID ${idEquipe} não existe.`);
        }

        return equipe;
    }

    adicionarTurma() {
        const nome = prompt("Nome da nova turma: ");

        try {
            const novaTurma = CadastroFactory.criarTurma(
                this.idTurmaContador,
                nome
            );

            this.turmas.push(novaTurma);
            this.idTurmaContador++;

            console.log("Turma registrada com sucesso!");
        } catch (erro) {
            console.log(`Turma não registrada: ${erro.message}`);
        }
    }

    listarTurmas() {
        console.log("\n=== LISTA DE TURMAS ===");

        if (this.turmas.length === 0) {
            console.log("Nenhuma turma no sistema.");
            return;
        }

        this.turmas.forEach(turma => turma.exibir());
    }

    adicionarAtleta(idTurma, nome) {
        const turma = this.buscarTurmaOuFalhar(idTurma);

        const novoAtleta = CadastroFactory.criarAtleta(
            this.idAtletaContador,
            nome,
            idTurma
        );

        this.idAtletaContador++;
        this.atletas.push(novoAtleta);

        return { atleta: novoAtleta, turma };
    }

    listarAtletas() {
        return this.atletas.map(atleta => ({
            atleta,
            nomeTurma: this.turmas.find(t => t.id === atleta.idTurma)?.nome ?? 'Turma Não Encontrada'
        }));
    }

    adicionarArbitro() {
        const nome = prompt("Nome do Árbitro: ");
        const numeroCredencial = parseInt(
            prompt("Número de Credencial: ")
        );
        const anosExperiencia = parseInt(
            prompt("Anos de Experiência: ")
        );

        try {
            const novoArbitro = CadastroFactory.criarArbitro(
                this.idArbitroContador,
                nome,
                numeroCredencial,
                anosExperiencia
            );

            this.idArbitroContador++;
            this.arbitros.push(novoArbitro);

            console.log("Árbitro registrado com sucesso!");
        } catch (erro) {
            console.log(`Árbitro não registrado: ${erro.message}`);
        }
    }

    listarArbitros() {
        console.log("\n=== LISTA DE ÁRBITROS ===");

        if (this.arbitros.length === 0) {
            console.log("Nenhum árbitro no sistema.");
            return;
        }

        this.arbitros.forEach(arbitro => arbitro.exibir());
    }

    equipeJaExiste(idTurma, modalidade) {
        return this.equipes.some(
            equipe =>
                equipe.idTurma === idTurma &&
                equipe.modalidade === modalidade
        );
    }

    adicionarEquipe() {
        this.listarTurmas();

        const idTurma = parseInt(prompt("ID da Turma: "));

        try {
            const turma = this.buscarTurmaOuFalhar(idTurma);

            console.log("\nModalidades disponíveis:");

            Object.values(Modalidade).forEach(
                modalidade => console.log(`- ${modalidade}`)
            );

            const modalidade = prompt(
                "Modalidade (copie exatamente como está na lista acima): "
            );

            if (this.equipeJaExiste(idTurma, modalidade)) {
                throw new Error(
                    `A turma ${turma.nome} já tem uma equipe em "${modalidade}".`
                );
            }

            const novaEquipe = CadastroFactory.criarEquipe(
                this.idEquipeContador,
                idTurma,
                modalidade
            );

            this.idEquipeContador++;
            this.equipes.push(novaEquipe);

            console.log(
                `Equipe registrada: ${turma.nome} em "${modalidade}"!`
            );

        } catch (erro) {
            console.log(`Equipe não registrada: ${erro.message}`);
        }
    }

    listarEquipes() {
        console.log("\n=== LISTA DE EQUIPES ===");

        if (this.equipes.length === 0) {
            console.log("Nenhuma equipe no sistema.");
            return;
        }

        this.equipes.forEach(equipe => {
            const turma = this.turmas.find(
                turma => turma.id === equipe.idTurma
            );

            const nomesAtletas = equipe.atletas
                .map(idAtleta =>
                    this.atletas.find(atleta => atleta.id === idAtleta)
                )
                .filter(atleta => atleta)
                .map(atleta => atleta.nome);

            equipe.exibir(
                turma ? turma.nome : "TURMA NÃO ENCONTRADA",
                nomesAtletas
            );
        });
    }

    removerEquipe() {
        this.listarEquipes();

        const idEquipe = parseInt(
            prompt("ID da Equipe a remover: ")
        );

        try {
            const equipe = this.buscarEquipeOuFalhar(idEquipe);

            this.equipes = this.equipes.filter(
                equipeAtual => equipeAtual.id !== equipe.id
            );

            console.log(
                `Equipe removida. Os atletas continuam no sistema (total de atletas: ${this.atletas.length}).`
            );

        } catch (erro) {
            console.log(
                `Não foi possível remover: ${erro.message}`
            );
        }
    }

    vincularAtletaEquipe() {
        this.listarEquipes();

        const idEquipe = parseInt(
            prompt("ID da Equipe: ")
        );

        try {
            const equipe = this.buscarEquipeOuFalhar(idEquipe);

            this.listarAtletas();

            const idAtleta = parseInt(
                prompt("ID do Atleta: ")
            );

            const atleta = this.buscarAtletaOuFalhar(idAtleta);

            if (atleta.idTurma !== equipe.idTurma) {
                throw new Error(
                    `${atleta.nome} não pertence à turma dessa equipe.`
                );
            }

            if (!equipe.adicionarAtleta(idAtleta)) {
                throw new Error(
                    `${atleta.nome} já está nessa equipe.`
                );
            }

            console.log(
                `${atleta.nome} vinculado à equipe de "${equipe.modalidade}"!`
            );

        } catch (erro) {
            console.log(
                `Não foi possível vincular: ${erro.message}`
            );
        }
    }

    desvincularAtletaEquipe() {
        this.listarEquipes();

        const idEquipe = parseInt(
            prompt("ID da Equipe: ")
        );

        try {
            const equipe = this.buscarEquipeOuFalhar(idEquipe);

            const idAtleta = parseInt(
                prompt("ID do Atleta a remover da equipe: ")
            );

            const atleta = this.buscarAtletaOuFalhar(idAtleta);

            if (!equipe.removerAtleta(idAtleta)) {
                throw new Error(
                    `${atleta.nome} não está nessa equipe.`
                );
            }

            console.log(
                `${atleta.nome} removido da equipe. Ele continua no sistema (total de atletas: ${this.atletas.length}).`
            );

        } catch (erro) {
            console.log(
                `Não foi possível desvincular: ${erro.message}`
            );
        }
    }
}

module.exports = ArenaConnect;