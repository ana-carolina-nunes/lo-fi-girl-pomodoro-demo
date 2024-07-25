//capturando elementos
const html = document.querySelector('html');

const displayTempo = document.querySelector('#timer');//#id
const musicaFoco = document.querySelector('#alternar-musica');
const banner = document.querySelector('.gif_lofi_girl-image');//.classe
const titulo = document.querySelector('.app__title')
const iconeIniciarOuPausar = document.querySelector('.app__card-primary-butto-icon')

const botoes = document.querySelectorAll('.app__card-button');
const btnFoco = document.querySelector('.app__card-button--foco');
const btnCurto = document.querySelector('.app__card-button--curto');
const btnLongo = document.querySelector('.app__card-button--longo');
const startPauseBtn = document.querySelector('.app__card-primary-button');
const iniciarOuPausatBtn = document.querySelector('#start-pause span');

const tempFoco = 1500;
const tempCurto = 300;
const tempLongo = 900;
const somPause = new Audio('/sons/pause.mp3');
const somPlay = new Audio('/sons/play.wav');
const somBeep = new Audio('/sons/beep.mp3');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true; //toca musica sempre
//readFile só usa quando ao carregar o arquivo 
//declarando objeto fica mais otimizado e apenas indica o caminho

let tempoDecorridoSegundos = 1500;
let intervaloId = null;

function alterarContexto(contexto) {

    let corBtn;

    switch (contexto) {
        case 'foco':
            corBtn = '#aa384a';
            break;
        case 'descanso-curto':
            corBtn = '#486e48';
            break;
        case 'descanso-longo':
            corBtn = '#a7c6ca';
            break;
        default:
            break;
    }

    startPauseBtn.style.setProperty("background", `linear-gradient(180deg, ${corBtn} 0%, #144480 100%)`);

    mostrarTempo();
    //(elemento a ser alterar, o que se quer inserir)
    html.setAttribute('data-contexto', contexto)
    //templare string
    banner.setAttribute('src', `/imagens/lo-fi-girl-${contexto}.gif`);

    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    })

    switch (contexto) {
        case "foco": //innerHTML: trabalhando especificamente com textos em elementos html (pode usar tags) e criar listas (+ adiciona texto repetido)
            titulo.innerHTML = ` 
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `;
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `;
            break;
        default:
            break;
    }
}

btnFoco.addEventListener('click', () => {
    tempoDecorridoSegundos = 1500;
    btnFoco.style.setProperty("background", "#123456");
    btnCurto.style.setProperty("background", "none");
    btnLongo.style.setProperty("background", "none");
    alterarContexto('foco');
    btnFoco.classList.add('active') //setta classe no elemento       
});

btnCurto.addEventListener('click', () => {
    tempoDecorridoSegundos = 20;
    btnFoco.style.setProperty("background", "none");
    btnCurto.style.setProperty("background", "#123456");
    btnLongo.style.setProperty("background", "none");
    alterarContexto('descanso-curto');
    btnCurto.classList.add('active')
})

btnLongo.addEventListener('click', () => {
    tempoDecorridoSegundos = 900;
    btnFoco.style.setProperty("background", "none");
    btnCurto.style.setProperty("background", "none");
    btnLongo.style.setProperty("background", "#123456");
    alterarContexto('descanso-longo');
    btnLongo.classList.add('active')
})

//change é usado p/ ver se marcou/desmarcou checkbox
musicaFoco.addEventListener('change', () => {
   /* if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }*/
    // Get a reference to the embed iframe element
const spotifyEmbedWindow = document.querySelector('iframe[src*="spotify.com/embed"]').contentWindow;
spotifyEmbedWindow.postMessage({command: 'toggle'}, '*');
})

//funcao arrow ? evento tem q ser escrito depois da função
const contagemRegressiva = () => {
    if (tempoDecorridoSegundos <= 0) {
        zerar();
        somBeep.play();
        alert('Tempo finalizado');
        return;//interrompe o código
    }
    tempoDecorridoSegundos -= 1;
    console.log('Temporizador: ' + tempoDecorridoSegundos);
    mostrarTempo();
}

startPauseBtn.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        iniciarOuPausatBtn.textContent = "Começar";
        iconeIniciarOuPausar.setAttribute('src', `/imagens/play_arrow.png`);
        zerar();
        somPause.play();
        return;
    }

    somPlay.play();

    intervaloId = setInterval(contagemRegressiva, 1000); //método a ser executado, tempo se intervalo a ser executado em ms
    iniciarOuPausatBtn.textContent = "Pausar";
    iconeIniciarOuPausar.setAttribute('src', `/imagens/pause.png`);
}

function zerar() {
    clearInterval(intervaloId); //interrompe execução de algum codigo
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', { minute: '2-digit', second: '2-digit' })
    displayTempo.innerHTML = `${tempoFormatado}`
}

mostrarTempo();