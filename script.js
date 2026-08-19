// ========================================
// ELEMENTOS DO HTML
// ========================================

const senha = document.getElementById("senha");

const quantidade = document.getElementById("quantidade");

const diminuir = document.getElementById("diminuir");

const aumentar = document.getElementById("aumentar");

const gerar = document.getElementById("gerar");

const copiar = document.getElementById("copiar");

const maiusculas = document.getElementById("maiusculas");

const minusculas = document.getElementById("minusculas");

const numeros = document.getElementById("numeros");

const simbolos = document.getElementById("simbolos");

const nivelForca = document.getElementById("nivel-forca");

const textoForca = document.getElementById("texto-forca");

const mensagem = document.getElementById("mensagem");


// ========================================
// CONFIGURAÇÕES
// ========================================

let tamanhoSenha = 12;


// ========================================
// CARACTERES
// ========================================

const letrasMaiusculas =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const letrasMinusculas =
    "abcdefghijklmnopqrstuvwxyz";

const numerosDisponiveis =
    "0123456789";

const simbolosDisponiveis =
    "!@#$%&*?+-_=<>";


// ========================================
// ATUALIZAR QUANTIDADE
// ========================================

function atualizarQuantidade() {

    quantidade.textContent = tamanhoSenha;

}


// ========================================
// DIMINUIR TAMANHO
// ========================================

diminuir.addEventListener("click", function () {

    if (tamanhoSenha > 4) {

        tamanhoSenha--;

        atualizarQuantidade();

        gerarSenha();

    }

});


// ========================================
// AUMENTAR TAMANHO
// ========================================

aumentar.addEventListener("click", function () {

    if (tamanhoSenha < 30) {

        tamanhoSenha++;

        atualizarQuantidade();

        gerarSenha();

    }

});


// ========================================
// ESCOLHER CARACTERE ALEATÓRIO
// ========================================

function escolherCaractere(conjunto) {

    const indice =
        Math.floor(
            Math.random() * conjunto.length
        );

    return conjunto[indice];

}


// ========================================
// EMBARALHAR SENHA
// ========================================

function embaralhar(texto) {

    return texto
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");

}


// ========================================
// GERAR SENHA
// ========================================

function gerarSenha() {

    let conjunto = "";

    let senhaGerada = "";

    let caracteresObrigatorios = [];


    // ------------------------------------
    // VERIFICA AS OPÇÕES
    // ------------------------------------

    if (maiusculas.checked) {

        conjunto += letrasMaiusculas;

        caracteresObrigatorios.push(
            escolherCaractere(letrasMaiusculas)
        );

    }


    if (minusculas.checked) {

        conjunto += letrasMinusculas;

        caracteresObrigatorios.push(
            escolherCaractere(letrasMinusculas)
        );

    }


    if (numeros.checked) {

        conjunto += numerosDisponiveis;

        caracteresObrigatorios.push(
            escolherCaractere(numerosDisponiveis)
        );

    }


    if (simbolos.checked) {

        conjunto += simbolosDisponiveis;

        caracteresObrigatorios.push(
            escolherCaractere(simbolosDisponiveis)
        );

    }


    // ------------------------------------
    // NENHUMA OPÇÃO SELECIONADA
    // ------------------------------------

    if (conjunto.length === 0) {

        senha.value = "";

        atualizarForca(0);

        mensagem.textContent =
            "Selecione pelo menos uma característica.";

        return;

    }


    mensagem.textContent = "";


    // ------------------------------------
    // ADICIONA OS CARACTERES OBRIGATÓRIOS
    // ------------------------------------

    senhaGerada =
        caracteresObrigatorios.join("");


    // ------------------------------------
    // COMPLETA A SENHA
    // ------------------------------------

    while (
        senhaGerada.length < tamanhoSenha
    ) {

        senhaGerada +=
            escolherCaractere(conjunto);

    }


    // ------------------------------------
    // EMBARALHA
    // ------------------------------------

    senhaGerada =
        embaralhar(senhaGerada);


    // ------------------------------------
    // MOSTRA NO INPUT
    // ------------------------------------

    senha.value = senhaGerada;


    // ------------------------------------
    // CALCULA FORÇA
    // ------------------------------------

    calcularForca(senhaGerada);

}


// ========================================
// CALCULAR FORÇA DA SENHA
// ========================================

function calcularForca(valor) {

    let pontos = 0;


    // ------------------------------------
    // TAMANHO
    // ------------------------------------

    if (valor.length >= 8) {

        pontos += 2;

    }


    if (valor.length >= 12) {

        pontos += 2;

    }


    if (valor.length >= 16) {

        pontos += 2;

    }


    // ------------------------------------
    // LETRA MAIÚSCULA
    // ------------------------------------

    if (/[A-Z]/.test(valor)) {

        pontos += 1;

    }


    // ------------------------------------
    // LETRA MINÚSCULA
    // ------------------------------------

    if (/[a-z]/.test(valor)) {

        pontos += 1;

    }


    // ------------------------------------
    // NÚMERO
    // ------------------------------------

    if (/[0-9]/.test(valor)) {

        pontos += 2;

    }


    // ------------------------------------
    // SÍMBOLO
    // ------------------------------------

    if (/[^A-Za-z0-9]/.test(valor)) {

        pontos += 2;

    }


    atualizarForca(pontos);

}


// ========================================
// ATUALIZAR BARRA DE FORÇA
// ========================================

function atualizarForca(pontos) {

    let porcentagem;

    let cor;

    let texto;


    // ------------------------------------
    // FRACA
    // ------------------------------------

    if (pontos <= 3) {

        porcentagem = 25;

        cor = "#f52f50";

        texto = "Fraca";

    }


    // ------------------------------------
    // MÉDIA
    // ------------------------------------

    else if (pontos <= 6) {

        porcentagem = 60;

        cor = "#ffd400";

        texto = "Média";

    }


    // ------------------------------------
    // FORTE
    // ------------------------------------

    else {

        porcentagem = 100;

        cor = "#21d17c";

        texto = "Forte";

    }


    nivelForca.style.width =
        porcentagem + "%";

    nivelForca.style.backgroundColor =
        cor;

    textoForca.textContent =
        texto;

    textoForca.style.color =
        cor;

}


// ========================================
// DIGITAÇÃO MANUAL
// ========================================

senha.addEventListener("input", function () {

    const senhaDigitada =
        senha.value;


    // Atualiza o contador conforme
    // a quantidade de caracteres digitados

    tamanhoSenha =
        senhaDigitada.length;


    if (tamanhoSenha < 4) {

        quantidade.textContent =
            tamanhoSenha;

    }

    else {

        quantidade.textContent =
            tamanhoSenha;

    }


    // Calcula a força da senha digitada

    calcularForca(senhaDigitada);


    mensagem.textContent = "";

});


// ========================================
// BOTÃO GERAR
// ========================================

gerar.addEventListener("click", function () {

    gerarSenha();

});


// ========================================
// COPIAR SENHA
// ========================================

copiar.addEventListener("click", async function () {

    const texto =
        senha.value;


    if (texto === "") {

        mensagem.textContent =
            "Digite ou gere uma senha primeiro.";

        return;

    }


    try {

        await navigator.clipboard.writeText(texto);

        copiar.textContent =
            "Copiado!";

        mensagem.textContent =
            "Senha copiada com sucesso!";


        setTimeout(function () {

            copiar.textContent =
                "Copiar";

            mensagem.textContent =
                "";

        }, 1500);


    }

    catch (erro) {

        senha.select();

        document.execCommand("copy");

        copiar.textContent =
            "Copiado!";


        setTimeout(function () {

            copiar.textContent =
                "Copiar";

        }, 1500);

    }

});


// ========================================
// ALTERAÇÃO DAS CARACTERÍSTICAS
// ========================================

maiusculas.addEventListener(
    "change",
    gerarSenha
);


minusculas.addEventListener(
    "change",
    gerarSenha
);


numeros.addEventListener(
    "change",
    gerarSenha
);


simbolos.addEventListener(
    "change",
    gerarSenha
);


// ========================================
// INICIAR PROGRAMA
// ========================================

atualizarQuantidade();

gerarSenha();
