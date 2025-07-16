document.addEventListener('DOMContentLoaded', () => {
    const learnGrid = document.getElementById('learn-grid');
    const currentLang = localStorage.getItem('lang') || 'th'; // ตรวจสอบภาษา

    async function loadConstellations() {
        try {
            // โหลดไฟล์ข้อมูลตามภาษา
            const response = await fetch(`data/constellations_${currentLang}.json`);
            const constellations = await response.json();
            displayConstellations(constellations);
        } catch (error) {
            console.error('Could not load constellation data:', error);
            const errorMsg = currentLang === 'en' 
                ? '<p style="color:white;">Could not load data.</p>'
                : '<p style="color:white;">ไม่สามารถโหลดข้อมูลได้</p>';
            learnGrid.innerHTML = errorMsg;
        }
    }

    function displayConstellations(constellations) {
        learnGrid.innerHTML = '';
        constellations.forEach(constellation => {
            const card = document.createElement('div');
            card.className = 'constellation-card';

            const img = document.createElement('img');
            img.src = constellation.image_url;
            img.alt = constellation.name;

            const name = document.createElement('p');
            name.textContent = constellation.name;

            card.appendChild(img);
            card.appendChild(name);
            learnGrid.appendChild(card);
        });
    }

    if (learnGrid) {
        loadConstellations();
    }

    fetch('data/constellations_en.json')
  .then(response => response.json())
  .then(data => {
    const grid = document.getElementById('constellation-grid');
    grid.innerHTML = '';
    data.forEach(constellation => {
      const card = document.createElement('div');
      card.className = 'constellation-card';
      card.innerHTML = `
        <img src="${constellation.image_url}" alt="${constellation.name}">
        <div class="constellation-name">${constellation.name}</div>
      `;
      grid.appendChild(card);
    });
  })
  .catch(err => {
    document.getElementById('constellation-grid').innerHTML = '<p>เกิดข้อผิดพลาดในการโหลดข้อมูลกลุ่มดาว</p>';
  });
});