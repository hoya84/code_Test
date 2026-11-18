/* MD 에디터 서비스 워커 - 앱 셸을 캐시해 오프라인에서도 실행되게 한다.
 * 전략: 캐시 우선 + 백그라운드 갱신(stale-while-revalidate). 내비게이션은 index.html 로 대체. */
const VERSION = 'mwm27ika';
const CACHE = 'md-editor-' + VERSION;

const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './renderer.js',
  './web-shim.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './maskable-192.png',
  './maskable-512.png',
  './apple-touch-icon.png',
  './marked.umd.js',
  './codemirror.js',
  './codemirror.css',
  './cm-overlay.js',
  './cm-xml.js',
  './cm-meta.js',
  './cm-markdown.js',
  './cm-continuelist.js',
  './cm-closebrackets.js',
  './cm-activeline.js',
  './highlight.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('md-editor-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(req, { ignoreSearch: true });
      const network = fetch(req)
        .then((res) => {
          if (res && res.ok) cache.put(req, res.clone());
          return res;
        })
        .catch(() => null);
      if (cached) {
        event.waitUntil(network); // 백그라운드 갱신
        return cached;
      }
      const res = await network;
      if (res) return res;
      if (req.mode === 'navigate') return cache.match('./index.html');
      return new Response('오프라인 상태입니다.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    })
  );
});
