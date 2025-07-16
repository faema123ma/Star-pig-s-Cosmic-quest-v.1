document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-active-screen');
    const gameOverScreen = document.getElementById('game-over-screen');
    const winScreen = document.getElementById('win-screen');
    const scoreText = document.getElementById('score-text');
    const streakText = document.getElementById('streak-text');
    const livesText = document.getElementById('lives-text');
    const timerText = document.getElementById('timer-text');
    const progressText = document.getElementById('progress-text');
    const constellationImg = document.getElementById('constellation-img');
    const answerButtonsContainer = document.getElementById('answer-buttons');
    const finalScoreText = document.getElementById('final-score');
    const highScoreText = document.getElementById('high-score-text');
    const correctSound = document.getElementById('correct-sound');
    const incorrectSound = document.getElementById('incorrect-sound');
    const characterImg = document.getElementById('character-img');
    const characterSpeech = document.getElementById('character-speech');
    const CHARACTER_COUNT = 8;
    const CONSTELLATIONS_PER_FORM = 11;
    const characterImages = Array.from({length: CHARACTER_COUNT}, (_, i) => `images/character${i+1}.png`);
    const praiseMessages = [
        "โอ้โห! เก่งจังวะเนี่ย", "ตอบถูกแบบนี้ ไปซื้อหวยเลยมั้ย", "สมองไวเหมือนติดจรวด", "นี่มันอัจฉริยะชัดๆ", "ตอบถูกจนงงเอง", "สุดยอด! ขอยืมสมองหน่อย", "ตอบแบบนี้ไม่ธรรมดา", "เก่งเกินไปแล้วนะ", "ตอบถูกจนต้องร้องว้าว", "ฉลาดเกินเบอร์", "ตอบถูกแบบไม่ต้องคิด", "โดนใจกรรมการ", "ตอบถูกแบบนี้ เอารางวัลไปเลย", "สมองลื่นปรื๊ด", "ตอบถูกแบบนี้มีของแน่", "โอ้โห! ตอบไวกว่าเน็ตบ้าน", "ตอบถูกจนต้องปรบมือ", "นี่มันพรสวรรค์", "ตอบถูกแบบนี้ขอคารวะ", "ตอบถูกจนตัวละครยังตกใจ"
    ];
    const tryAgainMessages = [
        "เอ้า! ใจเย็นๆ ลองใหม่", "เกือบแล้ววววว", "ใกล้เคียงแต่ยังไม่ใช่", "ตอบผิดไม่เป็นไร ลุยต่อ", "สมองลื่นไปหน่อย", "ตอบผิดแบบนี้ต้องเติมพลัง", "ลองใหม่อีกทีนะ", "ตอบผิดแต่ยังหล่อ", "ไม่เป็นไร เดี๋ยวก็ถูก", "ตอบผิดแบบนี้ขำแห้ง", "เอ๊ะ! หรือจะง่วง", "ตอบผิดแต่ยังเท่", "ลองใหม่อีกที เผื่อฟลุค", "ตอบผิดแบบนี้ต้องกินข้าว", "สมองเบลอไปนิด", "ตอบผิดแต่ยังน่ารัก", "ไม่เป็นไร สู้ต่อ", "ตอบผิดแบบนี้ขอฮา", "ลองใหม่อีกทีนะเพื่อน", "ตอบผิดแต่ยังมีสไตล์"
    ];

    let allConstellations = [];
    let unansweredQuestions = [];
    let score = 0, lives = 5, streak = 0, timer = 15, timerInterval;
    const currentLang = localStorage.getItem('lang') || 'th'; // ตรวจสอบภาษาที่เลือก

    async function initializeGame() {
        try {
            // โหลดไฟล์ข้อมูลตามภาษาที่เลือก
            const response = await fetch(`data/constellations_${currentLang}.json`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            allConstellations = await response.json();
            if (allConstellations.length < 3) {
                 throw new Error("Not enough constellation data to start the game.");
            }
            startGame();
        } catch (error) {
            console.error("Could not load constellation data file:", error);
            if(gameContainer) {
                const errorMsg = currentLang === 'en'
                    ? "<p style='color:white; text-align: center;'>Error loading game data.<br>Please try refreshing the page.</p>"
                    : "<p style='color:white; text-align: center;'>เกิดข้อผิดพลาดในการโหลดข้อมูลเกม<br>กรุณาลองรีเฟรชหน้าอีกครั้ง</p>";
                gameContainer.innerHTML = errorMsg;
            }
        }
    }

    function startGame() {
        score = 0; lives = 5; streak = 0;
        unansweredQuestions = [...allConstellations];

        gameContainer.style.display = 'flex';
        gameOverScreen.style.display = 'none';
        if (winScreen) winScreen.style.display = 'none';

        updateUI();
        loadNextQuestion();
    }

    function updateCharacter() {
        const passed = allConstellations.length - unansweredQuestions.length;
        const formIndex = Math.min(Math.floor(passed / CONSTELLATIONS_PER_FORM), CHARACTER_COUNT - 1);
        if (characterImg) characterImg.src = characterImages[formIndex];
    }

    function loadNextQuestion() {
        if (unansweredQuestions.length === 0) {
            winGame();
            return;
        }

        const questionIndex = Math.floor(Math.random() * unansweredQuestions.length);
        const question = unansweredQuestions[questionIndex];

        const incorrectChoices = [];
        while (incorrectChoices.length < 2) {
            const randomIndex = Math.floor(Math.random() * allConstellations.length);
            const randomConstellation = allConstellations[randomIndex];
            if (randomConstellation.name !== question.name && !incorrectChoices.includes(randomConstellation.name)) {
                incorrectChoices.push(randomConstellation.name);
            }
        }

        const choices = [question.name, ...incorrectChoices].sort(() => Math.random() - 0.5);

        constellationImg.src = question.image_url;
        answerButtonsContainer.innerHTML = '';

        choices.forEach(choice => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = choice;
            button.addEventListener('click', () => handleAnswerSelection(button, question.name));
            answerButtonsContainer.appendChild(button);
        });

        startTimer(question.name);
        updateCharacter();
    }

    function handleAnswerSelection(selectedButton, correctAnswer) {
        clearInterval(timerInterval);
        const isCorrect = selectedButton.textContent === correctAnswer;

        if (isCorrect) {
            score += 10 + streak;
            streak++;
            playSound(correctSound);
            unansweredQuestions = unansweredQuestions.filter(q => q.name !== correctAnswer);
            if (characterSpeech) {
                const msg = praiseMessages[Math.floor(Math.random() * praiseMessages.length)];
                characterSpeech.textContent = msg;
            }
        } else {
            lives--;
            streak = 0;
            playSound(incorrectSound);
            if (characterSpeech) {
                const msg = tryAgainMessages[Math.floor(Math.random() * tryAgainMessages.length)];
                characterSpeech.textContent = msg;
            }
        }

        highlightAnswers(correctAnswer, selectedButton);
        updateUI();

        if (lives <= 0) {
            setTimeout(gameOver, 2000);
        } else if (unansweredQuestions.length === 0) {
            setTimeout(winGame, 2000);
        } else {
            setTimeout(loadNextQuestion, 2000);
        }
    }
    
    function highlightAnswers(correctAnswer, selectedButton) {
        Array.from(answerButtonsContainer.children).forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            } else if (btn === selectedButton) {
                btn.classList.add('incorrect');
            }
        });
    }

    function updateUI() {
        scoreText.textContent = score;
        streakText.textContent = streak;
        if (progressText) {
            progressText.textContent = `${allConstellations.length - unansweredQuestions.length}/${allConstellations.length}`;
        }
        livesText.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            if (i < lives) {
                livesText.innerHTML += `<span class="heart-animate">❤️</span>`;
            } else {
                livesText.innerHTML += '🖤';
            }
        }
        // Trigger reflow for animation
        const hearts = livesText.querySelectorAll('.heart-animate');
        hearts.forEach(heart => {
            heart.classList.remove('heart-animate');
            void heart.offsetWidth; // force reflow
            heart.classList.add('heart-animate');
        });
    }

    function startTimer(correctAnswer) {
        clearInterval(timerInterval);
        timer = 15;
        timerText.textContent = timer;
        timerInterval = setInterval(() => {
            timer--;
            timerText.textContent = timer;
            if (timer <= 0) {
                clearInterval(timerInterval);
                handleTimeout(correctAnswer);
            }
        }, 1000);
    }

    function handleTimeout(correctAnswer) {
        lives--;
        streak = 0;
        playSound(incorrectSound);
        highlightAnswers(correctAnswer, null);
        updateUI();
        if (characterSpeech) {
            const msg = tryAgainMessages[Math.floor(Math.random() * tryAgainMessages.length)];
            characterSpeech.textContent = msg;
        }
        if (lives <= 0) {
            setTimeout(gameOver, 2000);
        } else {
            setTimeout(loadNextQuestion, 2000);
        }
    }

    function gameOver() {
        clearInterval(timerInterval);
        gameContainer.style.display = 'none';
        gameOverScreen.style.display = 'flex';
        finalScoreText.textContent = score;
        let currentHighScore = parseInt(localStorage.getItem('moodaoHighScore') || '0', 10);
        if (score > currentHighScore) {
            currentHighScore = score;
            localStorage.setItem('moodaoHighScore', currentHighScore);
        }
        highScoreText.textContent = currentHighScore;
    }

    function winGame() {
        clearInterval(timerInterval);
        gameContainer.style.display = 'none';
        if(winScreen) winScreen.style.display = 'flex';
    }

    function playSound(sound) {
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(error => console.log("Sound play failed:", error));
        }
    }

    initializeGame();
});