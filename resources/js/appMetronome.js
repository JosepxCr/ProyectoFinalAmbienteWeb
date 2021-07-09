import Timer from './timer.js';

const tempoDisplay = document.querySelector('.tempo');
const tempoText = document.querySelector('.tempo-text');
const decreaseTempoBtn = document.querySelector('.decrease-tempo');
const increaseTempoBtn = document.querySelector('.increase-tempo');
const tempoSlider = document.querySelector('.slider');
const startStopBtn = document.querySelector('.start-stop');
const subtractBeats = document.querySelector('.subtract-beats');
const addBeats = document.querySelector('.add-beats');
const measureCount = document.querySelector('.measure-count');

const click1 = new Audio('click1.mp3');
const click2 = new Audio('click2.mp3');

let bpm = 140;
let beatsPerMeasure = 4;
let count = 0;
let isRunning = false;
let tempoTextString = 'Medium';

decreaseTempoBtn.addEventListener('click', () => {
    if (bpm <= 20) { return };
    bpm--;
    validateTempo();
    updateMetronome();
});
increaseTempoBtn.addEventListener('click', () => {
    if (bpm >= 280) { return };
    bpm++;
    validateTempo();
    updateMetronome();
});
tempoSlider.addEventListener('input', () => {
    bpm = tempoSlider.value;
    validateTempo();
    updateMetronome();
});

subtractBeats.addEventListener('click', () => {
    if (beatsPerMeasure <= 2) { return };
    beatsPerMeasure--;
    measureCount.textContent = beatsPerMeasure;
    count = 0;
});
addBeats.addEventListener('click', () => {
    if (beatsPerMeasure >= 12) { return };
    beatsPerMeasure++;
    measureCount.textContent = beatsPerMeasure;
    count = 0;
});

startStopBtn.addEventListener('click', () => {
    count = 0;
    if (!isRunning) {
        metronome.start();
        isRunning = true;
        startStopBtn.textContent = 'STOP';
    } else {
        metronome.stop();
        isRunning = false;
        startStopBtn.textContent = 'START';
    }
});

function updateMetronome() {
    tempoDisplay.textContent = bpm;
    tempoSlider.value = bpm;
    metronome.timeInterval = 60000 / bpm;
    if (bpm <= 40) { tempoTextString = "Super Slow" };
    if (bpm > 40 && bpm < 80) { tempoTextString = "Slow" };
    if (bpm > 80 && bpm < 120) { tempoTextString = "Getting there" };
    if (bpm > 120 && bpm < 180) { tempoTextString = "Nice and Steady" };
    if (bpm > 180 && bpm < 220) { tempoTextString = "Rock n' Roll" };
    if (bpm > 220 && bpm < 240) { tempoTextString = "Funky Stuff" };
    if (bpm > 240 && bpm < 260) { tempoTextString = "Relax Dude" };
    if (bpm > 260 && bpm <= 280) { tempoTextString = "Eddie Van Halen" };

    tempoText.textContent = tempoTextString;
}
function validateTempo() {
    if (bpm <= 20) { return };
    if (bpm >= 280) { return };
}

function playClick() {
    console.log(count);
    if (count === beatsPerMeasure) {
        count = 0;
    }
    if (count === 0) {
        click1.play();
        click1.currentTime = 0;
    } else {
        click2.play();
        click2.currentTime = 0;
    }
    count++;
}

const metronome = new Timer(playClick, 60000 / bpm, { immediate: true });



/*
import Timer from "./timer";

//Llamada de elementos para hacerlos de forma dinamica

const tempoDisplay = document.querySelector('.tempo');
const tempoText = document.querySelector('.tempo-text');
const decreaseTempoBtn = document.querySelector('.decrease-tempo');
const increaseTempoBtn = document.querySelector('.increase-tempo');
const tempoSlider = document.querySelector('.slider');
const startStopBtn = document.querySelector('.start-stop');
const subtractBeats = document.querySelector('.subtract-beats');
const addBeats = document.querySelector('.add-beats');
const measureCount = document.querySelector('.measure-count');

//imports de los sonidos de click
const click1 = new Audio('click1.mp3');
const click2 = new Audio('click2.mp3');

//Variables globales
let bpm = 140;
let beatsPerMeasure = 4;
let count = 0;
let isRunning = false;
let tempoTextString = 'Allegro';
//Incrtemento y decremento de la barra y los números
decreaseTempoBtn.addEventListener('click', () => {
    if (bpm <= 20) { return };
        bpm--;
        validateTempo();
        updateMetronome();
});
increaseTempoBtn.addEventListener('click', () => {
    if (bpm >= 280) { return };
        bpm++;
        validateTempo();
        updateMetronome();
});
//Evento actualiza el slider
tempoSlider.addEventListener('input', () => {
     bpm = tempoSlider.value;
     validateTempo();
     updateMetronome();
});
//Disminuir el beat
subtractBeats.addEventListener('click', () => {
   if(beatsPerMeasure <= 2) { return };
    beatsPerMeasure--;
    measureCount.textContent = beatsPerMeasure;
    count = 0;
});
//Aumentar el beat
addBeats.addEventListener('click', () => {
    if (beatsPerMeasure >= 12) { return };
    beatsPerMeasure++;
    measureCount.textContent = beatsPerMeasure;
    count = 0;
});
//Metodo comienzo
startStopBtn.addEventListener('click', () => {
    count = 0;
    if (!isRunning){
        metronome.start();
        isRunning = true;
        startStopBtn.textContent = 'STOP';
    } else {
        metronome.stop();
        isRunning = false;
        startStopBtn.textContent = 'START'
    }
});
//Funcion que actualiza el tempText dependiendo de los beats
function updateMetronome() {
    tempoDisplay.textContent = bpm;
    tempoSlider.value = bpm;
    metronome.timeInterval = 60000 /  bpm;
    if (bpm <= 40) { tempoTextString = "Larghissimo" };
    if (bpm > 40 && bpm < 60) { tempoTextString = "Largo" };
    if (bpm > 60 && bpm < 66) { tempoTextString = "Larghetto" };
    if (bpm > 66 && bpm < 76) { tempoTextString = "Adagio" };
    if (bpm > 76 && bpm < 86) { tempoTextString = "Andante" };
    if (bpm > 86 && bpm < 108) { tempoTextString = "Andantino" };
    if (bpm > 108 && bpm < 120) { tempoTextString = "Moderato" };
    if (bpm > 120 && bpm < 156) { tempoTextString = "Allegro" };
    if (bpm > 156 && bpm < 176) { tempoTextString = "Vivace" };
    if (bpm > 176 && bpm < 186) { tempoTextString = " Allegro vivace" };
    if (bpm > 186 && bpm < 200) { tempoTextString = "Presto" };
    if (bpm > 200 && bpm <= 280) { tempoTextString = "Prestissimo" };
    tempoText.textContent = tempoTextString;
}
//Funcion que valida el tempo que no sobrepase los limites
function validateTempo(){
    if (bpm <= 20) { return };
    if (bpm >= 280) { return };
}

function playClick(){
    console.log(count);
    if (count === beatsPerMeasure){
        count = 0;
    }
    if (count === 0) {
        click1.play();
        click1.currentTime = 0;
    } else {
        click2.play();
        click2.currentTime = 0;
    }
    count ++;
}

const metronome = new Timer(playClick, 60000 / bpm, { immediate: true });   */