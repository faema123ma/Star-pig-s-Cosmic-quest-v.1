const CACHE_NAME = 'moodao-cache-v4';

const constellationNames = [
    'andromeda', 'antlia', 'apus', 'aquarius', 'aquila', 'ara', 'aries', 'auriga', 'bootes', 'caelum',
    'camelopardalis', 'cancer', 'canes_venatici', 'canis_major', 'canis_minor', 'capricornus', 'carina',
    'cassiopeia', 'centaurus', 'cepheus', 'cetus', 'chamaeleon', 'circinus', 'columba', 'coma_berenices',
    'corona_australis', 'corona_borealis', 'corvus', 'crater', 'crux', 'cygnus', 'delphinus', 'dorado',
    'draco', 'equuleus', 'eridanus', 'fornax', 'gemini', 'grus', 'hercules', 'horologium', 'hydra',
    'hydrus', 'indus', 'lacerta', 'leo', 'leo_minor', 'lepus', 'libra', 'lupus', 'lynx', 'lyra', 'mensa',
    'microscopium', 'monoceros', 'musca', 'norma', 'octans', 'ophiuchus', 'orion', 'pavo', 'pegasus',
    'perseus', 'phoenix', 'pictor', 'pisces', 'piscis_austrinus', 'puppis', 'pyxis', 'reticulum',
    'sagitta', 'sagittarius', 'scorpius', 'sculptor', 'scutum', 'serpens', 'sextans', 'taurus',
    'telescopium', 'triangulum', 'triangulum_australe', 'tucana', 'ursa_major', 'ursa_minor', 'vela',
    'virgo', 'volans', 'vulpecula'
];
const constellationImageUrls = constellationNames.map(name => `images/constellations/${name}.png`);

const urlsToCache = [
    '/',
    'index.html', 'exercise.html', 'stats.html', 'learn.html', 'login.html',
    'style.css',
    'manifest.json',
    'data/constellations.json',
    'js/main.js', 'js/game.js', 'js/stats.js', 'js/auth.js', 'js/learn.js', 'js/audioManager.js',
    'images/moodao-character.png', 'images/icon-192.png', 'images/icon-512.png',
    'sounds/correct.mp3', 'sounds/incorrect.mp3', 'sounds/click.mp3',
    'sounds/main-theme.mp3', 'sounds/game-theme.mp3', 'sounds/learn-theme.mp3',
    'videos/bg-video.mp4',
    'https://fonts.googleapis.com/css2?family=Kanit:wght@400;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Mali&family=Kanit:wght@400;700&display=swap',
    ...constellationImageUrls
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache).catch(error => {
                    console.error('Failed to cache one or more URLs:', error);
                });
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});     