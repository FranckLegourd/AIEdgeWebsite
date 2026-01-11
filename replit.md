# AI Edge International

## Overview

AI Edge International is a full-stack web application for an AI consulting and development company. The platform provides a marketing website showcasing AI services (lead generation, voice agents, RAG systems, NLP, computer vision, and AI agents), along with a client portal for project management and an admin dashboard for business operations. The application supports multi-language translations (English, French, Spanish) and includes light/dark theme switching.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state, React Context for auth/theme/translations
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style)
- **Build Tool**: Vite with path aliases (@/, @shared/, @assets/)

The frontend follows a page-based structure with shared components. Protected routes redirect unauthenticated users to the auth page. The application uses a provider pattern for cross-cutting concerns (auth, theme, translations).

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Authentication**: Passport.js with local strategy, session-based auth using express-session
- **Password Security**: scrypt hashing with random salt
- **API Design**: RESTful JSON APIs under /api prefix

The server handles authentication, project management, user management, and inquiry submissions. Admin and client roles have different access levels to resources.

### Data Storage
- **Database**: PostgreSQL via Neon serverless driver
- **ORM**: Drizzle ORM with drizzle-zod for schema validation
- **Session Store**: connect-pg-simple for PostgreSQL session storage
- **Schema Location**: shared/schema.ts (shared between client and server)

### Key Design Patterns
- **Monorepo Structure**: Client code in /client, server in /server, shared types in /shared
- **Type Safety**: Shared schema types between frontend and backend via @shared imports
- **Component Library**: shadcn/ui components in /client/src/components/ui with Radix UI primitives

## External Dependencies

### Database
- **Neon PostgreSQL**: Serverless PostgreSQL database (requires DATABASE_URL environment variable)
- **Drizzle Kit**: Database migrations stored in /migrations directory

### Authentication
- **Session Secret**: Requires SESSION_SECRET environment variable for session encryption

### UI/UX Libraries
- **Radix UI**: Comprehensive primitive component library for accessibility
- **Tailwind CSS**: Utility-first styling with CSS variables for theming
- **Lucide React**: Icon library

### Build & Development
- **Vite**: Development server with HMR and production bundling
- **esbuild**: Server-side TypeScript bundling for production
- **Replit Plugins**: Runtime error overlay and cartographer for development