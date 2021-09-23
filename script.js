var cartas = [
    {
        nome: 'Eren Yeager',
        img: 'https://inasianspaces.files.wordpress.com/2021/02/eren-yess.png?w=1200',
        atributos: {
            ataque: 90,
            defesa: 100,
            magia: 80,
        },
    },
    {
        nome: 'Mikasa Ackerman',
        img: 'https://i.pinimg.com/736x/4b/6c/d0/4b6cd06f0debbb0dccfec37b6fa5201f.jpg',
        atributos: {
            ataque: 100,
            defesa: 80,
            magia: 90,
        },
    },
    {
        nome: 'Armin Arlelt',
        img: 'https://i.pinimg.com/736x/5f/83/ee/5f83ee4603492f0a4c3d41f8d96ee8e4.jpg',
        atributos: {
            ataque: 80,
            defesa: 90,
            magia: 100,
        },
    },
    {
        nome: 'Super Trunfo',
        img: './trunfo.png',
        atributos : {
            ataque: 150,
            defesa: 150,
            magia: 150,
        },
    },
];

var cartaJogador;
var cartaMaquina;

function exibirCartaJogador() {
    var nome = `<p class="cartaSubtitle">${cartaJogador.nome}</p>`;
    var HTML_cartaJogador = document.getElementById('cartaJogador');
    HTML_cartaJogador.style.backgroundImage = `url(${cartaJogador.img})`;
    var moldura = `
        <img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;">
    `;
    var opcoes = `
        <div id="opcoes" class="cartaStatus">
    `;
    var opcoesTexto = '';

    for (var atributo in cartaJogador.atributos) {
        opcoesTexto += `
            <div class="opcoes ${atributo}">
                <input id="${atributo}" type="radio" name="atributo" value="${atributo}">
                <label for="${atributo}">${atributo.toUpperCase()}: ${cartaJogador.atributos[atributo]}</label>
            </div>
        `;
    };

    HTML_cartaJogador.innerHTML = moldura + nome + opcoes + opcoesTexto + '</div>';
};

function exibirCartaMaquina() {
    var nome = `<p class="cartaSubtitle">${cartaMaquina.nome}</p>`;
    var HTML_cartaMaquina = document.getElementById('cartaMaquina');
    HTML_cartaMaquina.style.backgroundImage = `url(${cartaMaquina.img})`;
    var moldura = `
        <img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;">
    `;
    var opcoes = `
        <div id="opcoes" class="cartaStatus">
    `;
    var opcoesTexto = '';

    for (var atributo in cartaMaquina.atributos) {
        opcoesTexto += `
            <p name="atributo" value="${atributo}">${atributo.toUpperCase()}: ${cartaMaquina.atributos[atributo]}</p>
        `;
    };

    HTML_cartaMaquina.innerHTML = moldura + nome + opcoes + opcoesTexto + '</div>';
}

function sortearCarta() {
    var numCartaJogador = parseInt(Math.random() * cartas.length);
    var numCartaMaquina = parseInt(Math.random() * cartas.length);

    while (numCartaMaquina == numCartaJogador) {
        numCartaMaquina = parseInt(Math.random() * cartas.length);
    };

    cartaJogador = cartas[numCartaJogador];
    cartaMaquina = cartas[numCartaMaquina];

    document.getElementById('btnSortear').disabled = true;
    document.getElementById('btnJogar').disabled = false;

    var HTML_cartaMaquina = document.getElementById('cartaMaquina');
    HTML_cartaMaquina.innerHTML =`
        <img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;">
    `;
    HTML_cartaMaquina.style.backgroundImage = 'none';

    exibirCartaJogador();
};

function obterAtributo() {
    var HTML_atributo = document.getElementsByName('atributo');

    for (var i = 0; i < HTML_atributo.length; i++) {
        if (HTML_atributo[i].checked) {
            return HTML_atributo[i].value;
        }
    }
};

function jogar() {
    var selecao = obterAtributo();
    var HTML_resultado = document.getElementById('resultado');
    var golpeJogador = cartaJogador.atributos[selecao];
    var golpeMaquina = cartaMaquina.atributos[selecao];

    if (golpeJogador > golpeMaquina) {
        HTML_resultado.innerHTML = '<h3 class="resultado">Você Venceu!</h3>';
    } else if (golpeMaquina > golpeJogador) {
        HTML_resultado.innerHTML = '<h3 class="resultado">Você Perdeu!</h3>';
    } else if (golpeJogador == golpeMaquina) {
        HTML_resultado.innerHTML = '<h3 class="resultado">Empate!</h3>';
    } else {
        HTML_resultado.innerHTML = '<h3>Erro Não Identificado!</h3>';
    };

    document.getElementById('btnJogar').disabled = true;
    document.getElementById('btnSortear').disabled = false;

    exibirCartaMaquina();
};