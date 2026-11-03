const C='phim-v3',I='phim-img',A=['./','./index.html','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(A)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x!==I).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
async function trim(c){const k=await c.keys();if(k.length>300)await Promise.all(k.slice(0,k.length-300).map(x=>c.delete(x)))}
self.addEventListener('fetch',e=>{
  const rq=e.request;if(rq.method!=='GET')return;
  if(rq.destination==='image'){
    e.respondWith(caches.open(I).then(async c=>{
      const h=await c.match(rq);if(h)return h;
      try{const r=await fetch(rq.url,{mode:'cors',credentials:'omit'});if(r.ok){c.put(rq,r.clone());trim(c);return r}}catch(x){}
      return fetch(rq);
    }));return;
  }
  const u=new URL(rq.url);
  if(u.origin!==location.origin||u.pathname==='/proxy')return;
  e.respondWith(fetch(rq).then(r=>{if(r.ok)caches.open(C).then(c=>c.put(rq,r.clone()));return r}).catch(()=>caches.match(rq)));
});
