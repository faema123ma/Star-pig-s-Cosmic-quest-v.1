document.addEventListener('DOMContentLoaded', () => {
    const historyList = document.getElementById('score-history');
    const SCORE_HISTORY_KEY = 'moodaoScoreHistory';
    const currentLang = localStorage.getItem('lang') || 'th';

    const scores = JSON.parse(localStorage.getItem(SCORE_HISTORY_KEY) || '[]');

    if (historyList) {
        if (scores.length === 0) {
            const noDataMsg = currentLang === 'en'
                ? '<li>No data yet... Go play a game!</li>'
                : '<li>ยังไม่มีข้อมูล... ลองเล่นสักเกมสิ!</li>';
            historyList.innerHTML = noDataMsg;
        } else {
            scores.slice(-10).reverse().forEach((score, index) => {
                const li = document.createElement('li');
                const playCount = scores.length - index;
                const scoreText = currentLang === 'en' ? 'Score' : 'คะแนน';
                const attemptText = currentLang === 'en' ? `Attempt #${playCount}` : `ครั้งที่ ${playCount}`;
                li.textContent = `${attemptText}: ${score} ${scoreText}`;
                historyList.appendChild(li);
            });
        }
    }
});