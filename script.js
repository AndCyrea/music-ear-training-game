let tones = {
    c: 261,
    d: 294,
    e: 329,
    f: 349,
    g: 392,
    a: 440,
    h: 493
};

let tone1, tone2;
let score = 0;
let round = 1;

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playTone(freq) {
    let oscillator = audioContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);

    oscillator.connect(audioContext.destination);
    oscillator.start();

    setTimeout(() => oscillator.stop(), 800);
}

function getRandomTone() {
    let keys = Object.keys(tones);
    return keys[Math.floor(Math.random() * keys.length)];
}

function playFirstTone() {
    tone1 = getRandomTone();
    playTone(tones[tone1]);
}

function playSecondTone() {
    tone2 = getRandomTone();
    playTone(tones[tone2]);
}

function checkAnswer(answer) {
    if (!tone1 || !tone2) {
        document.getElementById("result").innerText = "Play both tones first!";
        return;
    }

    let correct;

    if (tones[tone2] > tones[tone1]) {
        correct = "higher";
    } else if (tones[tone2] < tones[tone1]) {
        correct = "lower";
    } else {
        correct = "same tone";
    }

    if (answer === correct) {
        score++;
        document.getElementById("result").innerText = "Correct!";
    } else {
        document.getElementById("result").innerText = "Wrong! It was " + correct;
    }

    document.getElementById("score").innerText = "Score: " + score;

    round++;
    document.getElementById("round").innerText = "Round: " + round + " / 10";

    if (round > 10) {
        document.getElementById("result").innerText += " 🎉 Game Over!";
    }

    tone1 = null;
    tone2 = null;
}