const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const DIR = process.env.BRAINSTORM_DIR || '/tmp/brainstorm';
const HOST = process.env.BRAINSTORM_HOST || '127.0.0.1';
const URL_HOST = process.env.BRAINSTORM_URL_HOST || HOST;

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === '/' ? 'frame-template.html' : req.url);
  
  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end();
    return;
  }

  const ext = path.extname(filePath);
  const contentType = ext === '.html' ? 'text/html' : ext === '.js' ? 'text/javascript' : 'text/plain';
  
  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    const eventFile = path.join(DIR, `event-${Date.now()}.json`);
    fs.writeFileSync(eventFile, JSON.stringify(data, null, 2));
  });
});

server.listen(0, HOST, () => {
  const port = server.address().port;
  console.log(JSON.stringify({
    type: "server-started",
    url: `http://${URL_HOST}:${port}`,
    dir: DIR
  }));
});
