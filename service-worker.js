// Versão do cache — quando mudar algo grande, incremente aqui:
const CACHE = "missaohacker-v1";

// Liste aqui tudo que precisa funcionar offline:
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  // avatares (ajuste os nomes se forem outros)
  "./assets/avatars/avatar1.png",
  "./assets/avatars/avatar2.png",
  "./assets/avatars/avatar3.png",
  // ícones do PWA (crie-os na pasta indicada)
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});