// Service Worker for handling notifications
const CACHE_NAME = 'royalofillegal-music-v1';
const ASSETS_TO_CACHE = [
    '/royalofillegal.onion/',
    '/royalofillegal.onion/songs',
    '/royalofillegal.onion/index.html',
    '/royalofillegal.onion/manifest.json',
    '/royalofillegal.onion/sw.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
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

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
        const { title, artist, cover } = event.data;
        self.registration.showNotification(title, {
            body: artist,
            icon: cover,
            badge: 'https://res.cloudinary.com/dykzuljjr/image/upload/v1743437143/IMG_20250331_112437_oc200m.png',
            tag: 'music-player',
            renotify: true,
            actions: [
                {
                    action: 'play-pause',
                    title: 'Play/Pause'
                },
                {
                    action: 'next',
                    title: 'Next'
                },
                {
                    action: 'prev',
                    title: 'Previous'
                }
            ]
        });
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'play-pause') {
        clients.matchAll().then(clients => {
            clients.forEach(client => {
                client.postMessage({ type: 'TOGGLE_PLAY' });
            });
        });
    } else if (event.action === 'next') {
        clients.matchAll().then(clients => {
            clients.forEach(client => {
                client.postMessage({ type: 'NEXT_SONG' });
            });
        });
    } else if (event.action === 'prev') {
        clients.matchAll().then(clients => {
            clients.forEach(client => {
                client.postMessage({ type: 'PREV_SONG' });
            });
        });
    }
}); 
