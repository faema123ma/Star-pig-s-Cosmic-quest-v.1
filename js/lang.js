 // ฟังก์ชันสำหรับตั้งค่าภาษา
async function setLanguage(lang) {
    // เก็บภาษาที่เลือกไว้ใน localStorage เพื่อการใช้งานครั้งต่อไป
    localStorage.setItem('lang', lang);
    // โหลดไฟล์ภาษาที่ต้องการ
    const response = await fetch(`lang/${lang}.json`);
    const langData = await response.json();
    // นำข้อมูลภาษาไปใช้กับทุกส่วนของหน้าเว็บ
    applyLanguage(langData);
}

// ฟังก์ชันสำหรับนำข้อมูลภาษาไปใช้กับ element ต่างๆ
function applyLanguage(langData) {
    // ใช้ querySelectorAll เพื่อหา element ทั้งหมดที่มี data-lang-key
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (langData[key]) {
            // รองรับการใส่ HTML ลงใน value ของ JSON
            element.innerHTML = langData[key];
        }
    });
}

// ฟังก์ชันสำหรับสลับภาษาและโหลดหน้าเว็บใหม่
function switchLanguage(lang) {
    setLanguage(lang).then(() => {
        window.location.reload(); // รีโหลดหน้าเพื่อให้การเปลี่ยนแปลงมีผลสมบูรณ์
    });
}

// Event listener เมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', () => {
    // ดึงภาษาที่เคยเลือกไว้ หรือใช้ 'th' เป็นค่าเริ่มต้น
    const savedLang = localStorage.getItem('lang') || 'th';
    setLanguage(savedLang);

    // สร้าง event listener ให้กับปุ่มเปลี่ยนภาษา
    const langSwitcher = document.getElementById('lang-switcher');
    if (langSwitcher) {
        langSwitcher.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const lang = event.target.getAttribute('data-lang');
                if (lang) {
                    switchLanguage(lang);
                }
            }
        });
    }
});