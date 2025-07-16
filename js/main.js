document.addEventListener('DOMContentLoaded', () => {
    const userInfoContainer = document.getElementById('user-info');
    const usernameDisplay = document.getElementById('username-display');
    const logoutBtn = document.getElementById('logout-btn');
    const loggedInUser = sessionStorage.getItem('loggedInUser');

    if (loggedInUser && userInfoContainer) {
        // อัปเดตการแสดงผลชื่อผู้ใช้ให้รองรับ 2 ภาษา
        const welcomeMessage = document.getElementById('welcome-user-message');
        if (welcomeMessage) {
            welcomeMessage.textContent = `${localStorage.getItem('lang') === 'en' ? 'Hello' : 'สวัสดี'}, `;
        }
        usernameDisplay.textContent = loggedInUser;
        userInfoContainer.style.display = 'block';

        logoutBtn.addEventListener('click', () => {
            const confirmMessage = localStorage.getItem('lang') === 'en' ? 'Are you sure you want to log out?' : 'คุณต้องการออกจากระบบใช่หรือไม่?';
            if (confirm(confirmMessage)) {
                logout();
            }
        });
    }

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('Service Worker registered successfully:', registration))
            .catch(error => console.log('Service Worker registration failed:', error));
    }

    const introOverlay = document.querySelector('.intro-overlay');
    const enterGameBtn = document.querySelector('.intro-overlay .menu-btn');
    const learnBtn = document.getElementById('learn-btn');
    const howToPlayModal = document.getElementById('how-to-play-modal');
    const openModalBtn = document.getElementById('how-to-play-open-btn');
    const closeModalBtn = document.querySelector('.modal-close-btn');
    const clickSound = document.getElementById('click-sound');
    const allButtons = document.querySelectorAll('.menu-btn, .how-to-play-btn, .modal-close-btn');

    const playClickSound = () => {
        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.play();
        }
    };

    allButtons.forEach(button => {
        button.addEventListener('click', playClickSound);
    });

    if (enterGameBtn && introOverlay) {
        enterGameBtn.addEventListener('click', () => {
            introOverlay.style.display = 'none';
        });
    }

    if (openModalBtn && howToPlayModal) {
        openModalBtn.addEventListener('click', () => {
            howToPlayModal.style.display = 'flex';
        });
    }

    if (closeModalBtn && howToPlayModal) {
        closeModalBtn.addEventListener('click', () => {
            howToPlayModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === howToPlayModal) {
            howToPlayModal.style.display = 'none';
        }
    });

    if (learnBtn) {
        learnBtn.addEventListener('click', () => {
            window.location.href = 'learn.html';
        });
    }
});