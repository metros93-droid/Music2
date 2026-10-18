const CACHE_NAME = 'ted-music-v1.1';
const ASSETS = [
'./',
'./index.html',
'./manifest.json',
'./icon-192.png',
'./icon-512.png'
];

self.addEventListener('install', (event) => {
event.waitUntil(
caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
);
self.skipWaiting();
});

self.addEventListener('activate', (event) => {
event.waitUntil(
caches.keys().then((keys) => {
return Promise.all(
keys.map((key) => {
if (key !== CACHE_NAME) {
return caches.delete(key);
}
})
);
})
);
self.skipWaiting();
self.clients.claim();
});

self.addEventListener('fetch', (event) => {
event.respondWith(
fetch(event.request).catch(() => caches.match(event.request))
);
});