document.addEventListener('DOMContentLoaded', () => {
    // ดึงภาษาที่ตั้งไว้มาใช้กับข้อความแจ้งเตือน
    const currentLang = localStorage.getItem('lang') || 'th';

    const messages = {
        th: {
            passwordMismatch: 'รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน!',
            passwordLength: 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร!',
            usernameLength: 'ชื่อผู้ใช้ต้องมีความยาวอย่างน้อย 3 ตัวอักษร!',
            userExists: 'ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว!',
            registerSuccess: 'สมัครสมาชิกสำเร็จ! กรุณาล็อกอิน',
            loginSuccess: 'ล็อกอินสำเร็จ! กำลังเข้าสู่ระบบ...',
            loginFail: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!'
        },
        en: {
            passwordMismatch: 'Passwords do not match!',
            passwordLength: 'Password must be at least 6 characters long!',
            usernameLength: 'Username must be at least 3 characters long!',
            userExists: 'This username is already taken!',
            registerSuccess: 'Registration successful! Please log in.',
            loginSuccess: 'Login successful! Redirecting...',
            loginFail: 'Incorrect username or password!'
        }
    };

    const t = messages[currentLang]; // ตัวแปรสำหรับเก็บข้อความของภาษาที่เลือก

    if (sessionStorage.getItem('loggedInUser')) {
        if (window.location.pathname.endsWith('login.html')) {
            window.location.href = 'index.html';
        }
    } else {
        if (!window.location.pathname.endsWith('login.html')) {
            window.location.href = 'login.html';
        }
    }

    const loginForm = document.getElementById('login');
    const registerForm = document.getElementById('register');
    const loginContainer = document.getElementById('login-form');
    const registerContainer = document.getElementById('register-form');
    const authMessage = document.getElementById('auth-message');

    const showMessage = (message, type = 'error') => {
        authMessage.textContent = message;
        authMessage.className = type;
        authMessage.style.display = 'block';
    };

    window.toggleForms = () => {
        loginContainer.style.display = loginContainer.style.display === 'none' ? 'block' : 'none';
        registerContainer.style.display = registerContainer.style.display === 'none' ? 'block' : 'none';
        authMessage.style.display = 'none';
    };

    const simpleHash = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0;
        }
        return hash.toString();
    };

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('register-username').value.trim();
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;

            if (password !== confirmPassword) {
                return showMessage(t.passwordMismatch);
            }
            if (password.length < 6) {
                return showMessage(t.passwordLength);
            }
            if (username.length < 3) {
                 return showMessage(t.usernameLength);
            }

            const users = JSON.parse(localStorage.getItem('moodaoUsers') || '{}');

            if (users[username]) {
                return showMessage(t.userExists);
            } else {
                const hashedPassword = simpleHash(password);
                users[username] = { password: hashedPassword };
                localStorage.setItem('moodaoUsers', JSON.stringify(users));
                
                showMessage(t.registerSuccess, 'success');
                registerForm.reset();
                setTimeout(toggleForms, 1500);
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('login-username').value.trim();
            const password = document.getElementById('login-password').value;
            const users = JSON.parse(localStorage.getItem('moodaoUsers') || '{}');

            if (users[username] && users[username].password === simpleHash(password)) {
                showMessage(t.loginSuccess, 'success');
                sessionStorage.setItem('loggedInUser', username);
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                showMessage(t.loginFail);
            }
        });
    }
});

function logout() {
    sessionStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
}