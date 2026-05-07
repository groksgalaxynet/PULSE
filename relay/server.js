/**
 * PULSE — Self-Hosted Relay
 * ─────────────────────────
 * This is the mesh handshake point. Run it anywhere.
 * Once peers find each other, the relay can go down
 * and existing connections persist.
 *
 * INSTALL:   npm install gun
 * RUN:       node server.js
 *            node server.js --port 9000
 *
 * CONNECT:   In Pulse UI → relay field → ws://your-ip:8765
 *
 * NOTES:
 *   - file:false — nothing writes to disk. Ever.
 *   - No auth. Public mesh. Run with that in mind.
 *   - For WSS (HTTPS), run nginx in front. See README.
 */

const Gun  = require('gun');
const http = require('http');

const PORT = (() => {
    const i = process.argv.indexOf('--port');
    return i !== -1 ? parseInt(process.argv[i + 1]) : 8765;
})();

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end([
        'PULSE RELAY — ONLINE',
        '',
        `Port    : ${PORT}`,
        `Started : ${new Date().toISOString()}`,
        '',
        'This node routes mesh traffic and stores nothing.',
        'The network exists only as long as people do.',
        '',
        'Download the client: https://github.com/YOUR_USERNAME/pulse',
    ].join('\n'));
});

// Attach Gun — file:false means zero disk writes
Gun({ web: server, file: false });

server.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════╗
║           PULSE RELAY — ONLINE           ║
╠══════════════════════════════════════════╣
║                                          ║
║  Port    : ${String(PORT).padEnd(30)}║
║  Started : ${new Date().toISOString().substr(0,19).padEnd(30)}║
║                                          ║
║  Connect clients to:                     ║
║  ws://YOUR-IP-OR-DOMAIN:${PORT}          ║
║                                          ║
║  Stores nothing. Routes everything.      ║
║  The network exists only as long         ║
║  as people do.                           ║
║                                          ║
╚══════════════════════════════════════════╝
`);
});

process.on('SIGINT',  () => { console.log('\n// Relay offline. The mesh rests.'); process.exit(0); });
process.on('SIGTERM', () => { console.log('\n// Relay offline. The mesh rests.'); process.exit(0); });
