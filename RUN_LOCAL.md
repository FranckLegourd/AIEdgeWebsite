# Running This Project Locally

## Prerequisites

1. **Node.js** - Version 18 or higher (the project uses ES modules)
2. **npm** - Comes with Node.js
3. **PostgreSQL database** - The app uses PostgreSQL for data storage

## Environment Variables Required

Create a `.env` file in the project root with:

```
DATABASE_URL=postgresql://username:password@localhost:5432/your_database
SESSION_SECRET=your_secret_key_here
PGHOST=localhost
PGPORT=5432
PGUSER=your_username
PGPASSWORD=your_password
PGDATABASE=your_database_name
```

## Installation Steps

1. Clone the repository from GitHub
2. Run `npm install` to install all dependencies
3. Set up your PostgreSQL database
4. Create your `.env` file with the database credentials
5. Run `npm run db:push` to push the database schema

## Commands

| Command | Purpose |
|---------|---------|
| `npm install` | Install all dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run db:push` | Push database schema changes |
| `npm run check` | TypeScript type checking |

## Tech Stack Summary

- **Frontend**: React 18, Vite, TailwindCSS, Radix UI components
- **Backend**: Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js with local strategy
- **State Management**: TanStack Query

## Notes

- The dev server runs both frontend and backend together on port 5000
- The project uses TypeScript throughout
- Two Replit-specific Vite plugins (`@replit/vite-plugin-cartographer` and `@replit/vite-plugin-runtime-error-modal`) are included but won't affect local development
