# cow-bot

A Discord bot with cow-themed features.

## Features

- **`cowsay <text>`** — Renders your message as ASCII art with a cow. The original message is deleted and replaced with the cow output.
- **`<type>pic`** — Fetches a random image from [Pixabay](https://pixabay.com) for the given search term. Examples: `cowpic`, `dogpic`, `catpic`. The original message is deleted after posting.
- **Random cow reactions** — The bot reacts with 🐮 to messages with a 20% probability.

## Setup

### Prerequisites

- Node.js 20+
- A [Discord bot token](https://discord.com/developers/applications)

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with your Discord bot token:
   ```
   TOKEN=your_discord_bot_token_here
   ```

3. Start the bot:
   ```bash
   npm start
   ```

## Deployment

### Docker

Build and run with Docker Compose:

```bash
TOKEN=your_token docker-compose up -d
```

### Kubernetes

Deployment is managed with [Helm](https://helm.sh) and [Helmfile](https://helmfile.readthedocs.io). Secrets are encrypted using [SOPS](https://github.com/getsops/sops) with age.

```bash
cd deployment
helmfile apply
```

## Dependencies

- [discord.js](https://discord.js.org) — Discord bot framework
- [cowsay](https://github.com/piuccio/cowsay) — ASCII art cow generator
- [axios](https://axios-http.com) — HTTP client for image fetching
