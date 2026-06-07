# DevConnect

A social platform for developers to share projects, write technical articles, and connect with others in the community.

![DevConnect](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Technical Articles** - Write and publish with full Markdown support
- **Developer Profiles** - Showcase projects and connect GitHub
- **Community Feed** - Personalized feed from developers you follow
- **Comments & Discussion** - Threaded comments with Markdown
- **Bookmarks** - Save articles to read later
- **Tags & Discovery** - Browse content by technology tags

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Database | PostgreSQL |
| ORM | Prisma |
| Styling | Tailwind CSS |
| Auth | NextAuth.js (GitHub OAuth) |
| Language | TypeScript |

## Getting Started

```bash
git clone https://github.com/hannan-rizwan/DevConnect.git
cd DevConnect
npm install
cp .env.example .env
npx prisma db push
npm run dev
```

## License

MIT
