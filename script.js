document.addEventListener("DOMContentLoaded", () => {
    const timerDisplay = document.querySelector(".timer-text");
    const startPauseButton = document.querySelector(".start-pause");
    const restartButton = document.querySelector(".restart");
    const focusLengthButton = document.querySelector(".focus-length");
    const progressRing = document.querySelector(".progress-ring");
    const chimeSound = document.getElementById("chime-sound");

    let timerDuration = 25 * 60; // 25 minutes in seconds
    let timer;
    let isRunning = false;
    let timeLeft = timerDuration;

    function updateTimerDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function updateProgressRing() {
        const percentage = (timerDuration - timeLeft) / timerDuration * 100;
        progressRing.style.background = `conic-gradient(#ff4d4d ${percentage}%, #f4f4f4 ${percentage}%)`;
    }

    function startTimer() {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay(timeLeft);
                updateProgressRing();
            } else {
                clearInterval(timer);
                playChime();
                alert("Time's up! Take a break!");
            }
        }, 1000);
    }

    function playChime() {
        chimeSound.play();
    }

    startPauseButton.addEventListener("click", () => {
        if (isRunning) {
            clearInterval(timer);
            startPauseButton.textContent = "Start Focus 💆🏾‍♂️";
        } else {
            startTimer();
            startPauseButton.textContent = "Pause Focus ⏸️";
        }
        isRunning = !isRunning;
    });

    restartButton.addEventListener("click", () => {
        clearInterval(timer);
        isRunning = false;
        timeLeft = timerDuration;
        updateTimerDisplay(timeLeft);
        updateProgressRing(); // Reset the progress ring
        startPauseButton.textContent = "Start Focus 💆🏾‍♂️";
    });

    focusLengthButton.addEventListener("click", () => {
        const newTime = prompt("Enter focus time in minutes:");
        if (newTime && !isNaN(newTime)) {
            timerDuration = parseInt(newTime) * 60;
            timeLeft = timerDuration;
            updateTimerDisplay(timeLeft);
            updateProgressRing();
        }
    });

    // Initialize the display with the default timer
    updateTimerDisplay(timeLeft);
    updateProgressRing();
});