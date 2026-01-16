# Running This Project Locally

## Prerequisites

1. **Node.js** - Version 20 or higher (24.x recommended, tested with 24.13.0)
2. **npm** - Comes with Node.js

## Environment Variables Required

Create a `.env` file in the project root with:

```
SESSION_SECRET=your_secret_key_here

# Mail Configuration (for contact form emails)
MAIL_HOST=smtp.hostinger.com
MAIL_PORT=465
MAIL_USERNAME=your_email@yourdomain.com
MAIL_PASSWORD=your_email_password
```

## Installation Steps

1. Clone the repository from GitHub
2. Run `npm install` to install all dependencies
3. Create your `.env` file with the required variables
4. Run `npm run dev` to start the development server

## Commands

| Command | Purpose |
|---------|---------|
| `npm install` | Install all dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run check` | TypeScript type checking |

## Tech Stack Summary

- **Frontend**: React 18, Vite, TailwindCSS, Radix UI components
- **Backend**: Express.js, TypeScript
- **Storage**: In-memory (no database required)
- **Authentication**: Passport.js with local strategy
- **State Management**: TanStack Query

## Notes

- The dev server runs on port 3000 by default
- The project uses TypeScript throughout
- Uses ES modules (`"type": "module"` in package.json)
