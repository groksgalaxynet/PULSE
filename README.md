# PULSE
**Ephemeral Mesh Social. No servers. No algorithm. No receipts.**

```
The network exists only as long as people do.
```

---

## What is it?

PULSE is a decentralized social platform distributed as a set of HTML files.

- **No account required.** Pick a handle or stay anonymous.
- **No central server.** The mesh lives in your browser and the browsers of your peers.
- **No algorithm.** You see what people say, in order, in real time.
- **No data collection.** Close the tab — everything is gone.
- **No corporation.** Fork it. Host it. Build on it. Break it.

The relay is only a handshake point. Once peers are connected, the relay can go offline and existing sessions continue. Anyone can run one. Anyone can point their client at one.

---

## Structure

```
pulse/
├── index.html       ← Global mesh. The town square. Start here.
├── games.html       ← Games category — chat + live game nodes
├── ai.html          ← AI category — models, agents, experiments
├── 3d.html          ← 3D / VR category — spatial builds and rooms
├── dev.html         ← Dev category — tools, code, open builds
├── music.html       ← Music category — streams, samples, sound nodes
├── nodes.html       ← Node directory — all live nodes across all categories
└── relay/
    ├── server.js    ← Self-hosted Gun relay (~50 lines Node.js)
    └── package.json
```

---

## How It Works

### The Global Mesh (`index.html`)
The main chat. Everyone connected to the same relay sees the same feed.
Categories are listed in the sidebar — each is a separate HTML file, a separate mesh, a separate world.

### Categories (`games.html`, `ai.html`, etc.)
Each category is its own isolated mesh. Own feed, own user list, own node sidebar.
Users switch categories by opening the corresponding file.

### Nodes
Inside each category, anyone can **register a node** — a URL to something they're hosting.
Could be a local AI model. A game session. A 3D space. A Pi cluster running something interesting.
The node entry broadcasts to the mesh and appears in the sidebar for everyone in that category.
Go offline → the node vanishes. No central registry. No approval process.

### The Node Directory (`nodes.html`)
Aggregates live nodes from all categories in one view. What's alive right now, across the whole mesh.

---

## Get Started (User)

1. **Download** the HTML files from this repo (or just `index.html` to start)
2. Open `index.html` in your browser
3. Click **no relay** → enter a live relay URL (e.g. `ws://someones-relay.com:8765`)
4. Start talking
5. Navigate to category rooms via the sidebar

No install. No signup. No bullshit.

---

## Host a Relay

A relay helps peers find each other. That's all it does. It stores nothing.

**Requirements:** Node.js v16+

```bash
# Clone the repo
git clone https://github.com/groks galaxy net/pulse
cd pulse/relay

# Install
npm install

# Run (default port 8765)
node server.js

# Custom port
node server.js --port 9000
```

Your relay address: `ws://YOUR-IP:8765`

Share that URL. That's your mesh.

### Keep it running (Linux/VPS)

```bash
npm install -g pm2
pm2 start server.js --name pulse-relay
pm2 save && pm2 startup
```

### HTTPS / WSS (recommended for public relays)

Run nginx in front:

```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate     /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:8765;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

Connect clients to `wss://your-domain.com`

---

## Build a Node

Anyone can register a node in any category. A node is just a URL to something you're hosting.

Examples:
- A local LLM running via llama.cpp or LM Studio
- A Three.js 3D room you built
- A game session finder
- A Pi cluster doing something interesting
- A music stream
- Literally anything served over HTTP

In the category room sidebar → **⊕ register your node** → name + URL + optional description.

Your node broadcasts to the mesh. Everyone in that category sees it while you're online.
Shut it down → gone. No trace.

---

## Privacy & Data

| What | Reality |
|------|---------|
| Relay stores messages | ❌ Never. `file: false` is set explicitly. |
| Browser stores messages | ❌ Not by default. Use Save/Export if you want them. |
| Messages persist after tab close | ❌ Gone. Ephemeral by design. |
| What the relay sees | WebSocket traffic in transit. |
| What your localStorage holds | Your handle preference + last relay URL. Nothing else. |
| Burn All | Wipes localStorage entirely. Clean slate. |

**There is nothing to subpoena.** That's the point.

---

## Building on PULSE

PULSE is intentionally minimal. The category files are templates — take one, change the color, change the room key, add whatever backend functionality you want. The mesh is the foundation.

The node system is the extension point. If you can serve an HTTP URL, you can plug into the mesh.

Future directions (community-driven, no roadmap promises):
- Named subcategories within rooms
- Optional keypair-based identity (no central authority)
- Relay discovery (peer-of-peer relay listing)
- File sharing via IPFS bridge
- XR/spatial layer integration

---

## Rules

The only rules are the laws that apply to you wherever you are. No sexual content. No illegal content. Beyond that: build what you want.

---

## Contributing

Fork it. Improve it. Open a PR. No CLA. No contributor agreement. No corporate overhead.

---

## License

MIT. Do whatever you want. Just don't build the thing we're running from.

---

*Built on [Gun.js](https://gun.eco) — the decentralized graph database.*
