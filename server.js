// Chạy: node server.js  (cần Node 18+). Không cần cài thêm thư viện.
const http=require('http'),fs=require('fs'),path=require('path');
const PORT=process.env.PORT||3000;
const ALLOW=(process.env.ALLOW||'phimapi.com,ophim1.com').split(',');
const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.png':'image/png','.svg':'image/svg+xml'};
http.createServer(async(req,res)=>{
  const u=new URL(req.url,'http://x');
  if(u.pathname==='/proxy'){
    try{
      const t=new URL(u.searchParams.get('url'));
      if(!/^https?:$/.test(t.protocol)||!ALLOW.some(h=>t.hostname===h||t.hostname.endsWith('.'+h)))throw new Error('Host không được phép');
      const r=await fetch(t,{headers:{'user-agent':'Mozilla/5.0'}});
      res.writeHead(r.status,{'content-type':r.headers.get('content-type')||'application/json','access-control-allow-origin':'*'});
      return res.end(Buffer.from(await r.arrayBuffer()));
    }catch(e){res.writeHead(400);return res.end(String(e.message))}
  }
  const f=path.join(__dirname,u.pathname==='/'?'index.html':path.normalize(u.pathname).replace(/^(\.\.[\/\\])+/,''));
  fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);return res.end('Not found')}res.writeHead(200,{'content-type':T[path.extname(f)]||'application/octet-stream'});res.end(d)});
}).listen(PORT,()=>console.log('Phim chạy tại http://localhost:'+PORT));
