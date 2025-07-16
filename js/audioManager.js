document.addEventListener('DOMContentLoaded', () => {
    // มองหา audio element และปุ่มควบคุมในหน้าที่เปิดอยู่
    const bgMusic = document.querySelector('.page-music'); // ใช้ class .page-music
    const musicControl = document.getElementById('music-control');
    const MUSIC_STATE_KEY = 'moodaoMusicState';

    if (!bgMusic || !musicControl) {
        // ถ้าหน้านี้ไม่มีเพลงหรือปุ่มควบคุม ก็ไม่ต้องทำอะไร
        return;
    }

    // ฟังก์ชันเล่นเพลง
    const playMusic = async () => {
        try {
            await bgMusic.play();
            musicControl.classList.remove('paused');
            musicControl.textContent = '🎵';
        } catch (err) {
            console.log('Music play was blocked. Waiting for user interaction or previous setting.');
        }
    };

    // ฟังก์ชันควบคุมเพลง
    const toggleMusic = () => {
        if (bgMusic.paused) {
            playMusic();
            localStorage.setItem(MUSIC_STATE_KEY, 'on');
        } else {
            bgMusic.pause();
            musicControl.classList.add('paused');
            musicControl.textContent = '🔇';
            localStorage.setItem(MUSIC_STATE_KEY, 'off');
        }
    };

    // ตั้งค่าสถานะเพลงเมื่อโหลดหน้าเว็บ
    const initializeMusic = () => {
        if (localStorage.getItem(MUSIC_STATE_KEY) === 'off') {
            bgMusic.pause();
            musicControl.classList.add('paused');
            musicControl.textContent = '🔇';
        } else {
            musicControl.classList.remove('paused');
            musicControl.textContent = '🎵';
            // สำหรับหน้าที่ไม่ใช่หน้าแรก ให้เล่นเพลงเลยถ้าสถานะเป็น 'on'
            if (!document.body.classList.contains('is-main-page')) {
                 playMusic();
            }
        }
    };

    // Event listener สำหรับปุ่มควบคุม
    musicControl.addEventListener('click', toggleMusic);

    // สำหรับหน้าแรก (index.html) จะรอให้กดปุ่ม "เข้าสู่เกม" ก่อน
    const enterGameBtn = document.querySelector('.intro-overlay .menu-btn');
    if (enterGameBtn && document.body.classList.contains('is-main-page')) {
         enterGameBtn.addEventListener('click', () => {
             if (localStorage.getItem(MUSIC_STATE_KEY) !== 'off') {
                 playMusic();
             }
         });
    }

    initializeMusic();
});