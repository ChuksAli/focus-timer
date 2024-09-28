document.addEventListener("DOMContentLoaded", () => {
    const timerDisplay = document.querySelector(".timer-text");
    const startPauseButton = document.querySelector(".start-pause");
    const restartButton = document.querySelector(".restart");
    const focusLengthButton = document.querySelector(".focus-length");
    const progressRing = document.querySelector(".progress-ring");
    const roundsInput = document.getElementById("rounds");
    const chimeSound = document.getElementById("chime-sound");

    let focusTime = 25 * 60; // 25 minutes default focus time
    let breakTime = 5 * 60;  // 5 minutes default break time
    let timer;
    let isRunning = false;
    let timeLeft = focusTime;
    let rounds = 1;
    let currentRound = 0;
    let inBreak = false; // Track if we are in a break session

    function updateTimerDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function updateProgressRing() {
        const totalTime = inBreak ? breakTime : focusTime;
        const percentage = (totalTime - timeLeft) / totalTime * 100;
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

                if (inBreak) {
                    currentRound++;
                    if (currentRound < rounds) {
                        // Start the next focus session
                        inBreak = false;
                        timeLeft = focusTime;
                        startPauseButton.textContent = "Pause Focus ⏸️"; // Update button text
                        startTimer();
                    } else {
                        alert("You've completed all focus rounds! Well done!");
                        startPauseButton.textContent = "Start Focus 💆🏾‍♂️"; // Reset button to default after rounds are complete
                    }
                } else {
                    alert("Focus session complete! Time for a break.");
                    // Start break time
                    inBreak = true;
                    timeLeft = breakTime;
                    startPauseButton.textContent = "Pause Break ⏸️"; // Update button text for break
                    startTimer();
                }
            }
        }, 1000);
    }

    function playChime() {
        chimeSound.play();
    }

    startPauseButton.addEventListener("click", () => {
        if (isRunning) {
            clearInterval(timer);
            if (inBreak) {
                startPauseButton.textContent = "Start Break 💆🏾‍♂️";
            } else {
                startPauseButton.textContent = "Start Focus 💆🏾‍♂️";
            }
        } else {
            if (currentRound === 0 && !inBreak) {
                // Get the number of rounds from the input
                rounds = parseInt(roundsInput.value);
                currentRound = 0;
                timeLeft = focusTime; // Reset to focus time
            }
            startTimer();
            startPauseButton.textContent = inBreak ? "Pause Break ⏸️" : "Pause Focus ⏸️"; // Set text based on session type
        }
        isRunning = !isRunning;
    });

    restartButton.addEventListener("click", () => {
        clearInterval(timer);
        isRunning = false;
        inBreak = false;
        currentRound = 0;
        timeLeft = focusTime;
        updateTimerDisplay(timeLeft);
        updateProgressRing(); // Reset the progress ring
        startPauseButton.textContent = "Start Focus 💆🏾‍♂️"; // Reset button to default
    });

    focusLengthButton.addEventListener("click", () => {
        const newTime = prompt("Enter focus time in minutes:");
        if (newTime && !isNaN(newTime)) {
            focusTime = parseInt(newTime) * 60;
            timeLeft = focusTime;
            updateTimerDisplay(timeLeft);
            updateProgressRing();
        }
    });

    // Initialize the display with the default timer
    updateTimerDisplay(timeLeft);
    updateProgressRing();
});