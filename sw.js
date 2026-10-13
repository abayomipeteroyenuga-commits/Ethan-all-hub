/* Ethan Hub root PWA shell — v12.7 */
const C='ethan-hub-v12-7';
const CORE=['/','/manifest.webmanifest','/pwa/icon-192.png','/pwa/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('ethan-hub-')&&k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==self.location.origin)return;e.respondWith(fetch(r).then(res=>{if(res&&res.ok&&res.type==='basic')caches.open(C).then(c=>c.put(r,res.clone()));return res}).catch(()=>caches.match(r).then(saved=>saved||caches.match('/'))));});
