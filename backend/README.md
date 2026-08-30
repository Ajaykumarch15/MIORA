# MIORA Backend

Node.js + Express + PostgreSQL + Prisma backend for MIORA.

## Setup

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your database credentials

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed development data
npm run db:seed

# Start development server
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/people` | List active people |
| GET | `/people/archived` | List archived people |
| POST | `/people` | Create a person |
| GET | `/people/:id` | Get a person |
| PATCH | `/people/:id` | Update a person |
| POST | `/people/:id/archive` | Archive a person |
| POST | `/people/:id/restore` | Restore a person |
| POST | `/people/:id/deletion` | Request deletion |
| DELETE | `/people/:id/deletion` | Cancel deletion |
| GET | `/people/:personId/remembrances` | List remembrances |
| POST | `/people/:personId/remembrances` | Create a remembrance |
| GET | `/people/:personId/contexts` | List contexts |
| POST | `/people/:personId/contexts` | Create a context |
| GET | `/settings` | Get settings |
| PATCH | `/settings` | Update settings |
| GET | `/timeline` | Get unified timeline |

## Database Schema

- **users** — Prepared for future authentication
- **people** — People the user wants to remember
- **remembrances** — When a person was remembered
- **contexts** — Additional context about a remembrance
- **settings** — User preferences (thought cooldown)

## Architecture

```
src/
├── index.ts          # Express app entry point
├── config.ts         # Environment configuration
├── database.ts       # Prisma client connection
└── api/
    ├── health.ts     # Health check endpoint
    ├── people.ts     # People CRUD + archive/restore/deletion
    ├── remembrances.ts  # Remembrance CRUD
    ├── contexts.ts   # Context CRUD
    ├── settings.ts   # Settings CRUD
    └── timeline.ts   # Derived timeline endpoint
```
