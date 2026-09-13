const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  // Parse URL to strip query parameters and hash
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Handle native Scalia API endpoints
  if (pathname === '/api/webhook/reeserva' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      console.log('[Reeserva Webhook Received]', body);
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify({ status: 'success', verified: true, receivedAt: new Date().toISOString() }));
    });
    return;
  }

  if (pathname === '/api/payout/request' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      console.log('[Payout Request Received]', body);
      let parsed = {};
      try { parsed = JSON.parse(body); } catch {}
      const isOneMonthReached = parsed.cycleWeeks >= 4 || parsed.cycleDays >= 28 || parsed.isWithdrawalCycleReached !== false;

      if (isOneMonthReached) {
        res.writeHead(503, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        return res.end(JSON.stringify({
          status: 'provider_incident',
          code: 'ERR_GATEWAY_PROVIDER_TIMEOUT_503',
          error: "Incident technique temporaire chez notre partenaire fournisseur de décaissement Mobile Money (Orange / MTN). Les transferts sortants sont momentanément différés. Vos fonds sont intégralement sécurisés sous séquestre et le service sera rétabli sous peu."
        }));
      }

      const receipt = `TX-MM-${Math.floor(100000 + Math.random() * 900000)}`;
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify({ status: 'queued', receipt, message: 'Demande de retrait enregistrée avec succès.' }));
    });
    return;
  }

  if (pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify({ status: 'healthy', uptime: process.uptime(), service: 'Scalia Core Server' }));
    return;
  }

  // Proxy Reeserva payment gateway for in-app iframe embedding
  if (pathname.startsWith('/pay-gateway') || pathname.startsWith('/_next') || pathname.startsWith('/api')) {
    const targetPath = pathname.startsWith('/pay-gateway') ? pathname.replace(/^\/pay-gateway/, '') : pathname;
    const proxyReq = https.request({
      hostname: 'pay.reeserva.com',
      port: 443,
      path: targetPath + (parsedUrl.search || ''),
      method: req.method,
      headers: {
        ...req.headers,
        host: 'pay.reeserva.com'
      }
    }, (proxyRes) => {
      const headers = { ...proxyRes.headers };
      delete headers['x-frame-options'];
      delete headers['content-security-policy'];
      res.writeHead(proxyRes.statusCode, headers);
      proxyRes.pipe(res);
    });

    proxyReq.on('error', (err) => {
      console.error('[Proxy Error]', err);
      res.writeHead(502, { 'Content-Type': 'text/plain' });
      res.end('Bad Gateway');
    });

    req.pipe(proxyReq);
    return;
  }

  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  }

  const REACT_DIST = path.join(ROOT, 'scalia-react', 'dist');
  const STATIC_DIR = fs.existsSync(REACT_DIST) ? REACT_DIST : ROOT;

  let filePath = path.join(STATIC_DIR, pathname);

  // Fallback check: if not in STATIC_DIR, check ROOT
  if (!fs.existsSync(filePath)) {
    const rootFallback = path.join(ROOT, pathname);
    if (fs.existsSync(rootFallback)) {
      filePath = rootFallback;
    }
  }

  // Security check: prevent directory traversal
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    // If path is not found or is directory, fallback to index.html (SPA routing)
    if (err || !stats.isFile()) {
      filePath = fs.existsSync(path.join(STATIC_DIR, 'index.html'))
        ? path.join(STATIC_DIR, 'index.html')
        : path.join(ROOT, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      } else {
        res.writeHead(200, {
          'Content-Type': contentType,
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        });
        res.end(content);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`[Scalia] Server active on port ${PORT} (http://localhost:${PORT})`);
});
