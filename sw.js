const C='phim-v1',A=['./','./index.html','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A))));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin||e.request.url.includes('/proxy'))return;
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});
