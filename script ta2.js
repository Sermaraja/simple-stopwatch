let timer;
let milliseconds = 0;
let running = false;
let paused = false;
const interval = 100;  // Update every 100 milliseconds (0.1 seconds)

const stopwatch = document.querySelector('.stopwatch');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const pauseButton = document.getElementById('pause');
const lapButton = document.getElementById('lap');
const lapsContainer = document.querySelector('.laps');
const animatedImage = document.getElementById('animated-image');

startButton.addEventListener('click', () => {
    startTimer();
    animateImage();
});
stopButton.addEventListener('click', stopTimer);
pauseButton.addEventListener('click', pauseTimer);
lapButton.addEventListener('click', recordLap);

function startTimer() {
    if (!running) {
        timer = setInterval(updateTimer, interval);
        running = true;
        paused = false;
    }
}

function stopTimer() {
    clearInterval(timer);
    running = false;
    paused = false;
    milliseconds = 0;
    updateDisplay();
    lapsContainer.innerHTML = '';
}

function pauseTimer() {
    if (running) {
        clearInterval(timer);
        running = false;
        paused = true;
    }
}

function updateTimer() {
    milliseconds += interval;
    updateDisplay();
}

function updateDisplay() {
    const totalSeconds = milliseconds / 1000;
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = Math.floor(totalSeconds % 60);
    const msecs = Math.floor((milliseconds % 1000) / 100);
    stopwatch.textContent = `${pad(hrs)}:${pad(mins)}:${pad(secs)}.${msecs}`;
}

function pad(value) {
    return value.toString().padStart(2, '0');
}

function recordLap() {
    if (running || paused) {
        const lapTime = document.createElement('div');
        lapTime.textContent = stopwatch.textContent;
        lapsContainer.appendChild(lapTime);
    }
}

function animateImage() {
    animatedImage.classList.remove('animate');  // Reset animation
    void animatedImage.offsetWidth;  // Trigger reflow
    animatedImage.classList.add('animate');  // Start animation
}
