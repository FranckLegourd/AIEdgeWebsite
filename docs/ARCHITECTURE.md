# Architecture Documentation

This document describes the architecture and design decisions of the AI Edge International website.

## Table of Contents

- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Frontend Architecture](#frontend-architecture)
- [Backend Architecture](#backend-architecture)
- [Data Flow](#data-flow)
- [Security](#security)
- [Performance](#performance)
- [Scalability Considerations](#scalability-considerations)

---

## Overview

The AI Edge International website is a full-stack TypeScript application following a modern monorepo structure. It combines a React single-page application (SPA) with an Express.js API server.

### Key Design Principles

1. **Type Safety** - TypeScript throughout the stack
2. **Simplicity** - No database required (in-memory storage)
3. **Performance** - Optimized builds with Vite and esbuild
4. **Accessibility** - Radix UI primitives for accessible components
5. **Internationalization** - Built-in multi-language support

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Browser                        │
├─────────────────────────────────────────────────────────────┤
│                    React SPA (Vite)                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Pages     │  │ Components  │  │     Hooks           │  │
│  │             │  │             │  │                     │  │
│  │ - Home      │  │ - UI Kit    │  │ - useAuth           │  │
│  │ - Services  │  │ - Nav       │  │ - useTranslation    │  │
│  │ - Contact   │  │ - Footer    │  │ - useTheme          │  │
│  │ - Dashboard │  │ - etc.      │  │ - useCookieConsent  │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│                           │                                  │
│                    TanStack Query                            │
│                     (Data Fetching)                          │
└─────────────────────────────────────────────────────────────┘
                            │
                      HTTP/REST API
                            │
┌─────────────────────────────────────────────────────────────┐
│                    Express.js Server                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Routes    │  │    Auth     │  │     Storage         │  │
│  │             │  │             │  │                     │  │
│  │ /api/auth   │  │ Passport.js │  │ In-Memory Maps      │  │
│  │ /api/users  │  │ Sessions    │  │ - users             │  │
│  │ /api/projects│ │             │  │ - projects          │  │
│  │ /api/inquiries│ │            │  │ - inquiries         │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│                           │                                  │
│                      Nodemailer                              │
│                   (Email Notifications)                      │
└─────────────────────────────────────────────────────────────┘
                            │
                       SMTP Server
                      (Hostinger)
```

---

## Frontend Architecture

### Component Hierarchy

```
App
├── Providers
│   ├── QueryClientProvider (TanStack Query)
│   ├── AuthProvider
│   ├── ThemeProvider
│   └── TooltipProvider
├── Router (Wouter)
│   ├── Public Routes
│   │   ├── HomePage
│   │   ├── ServicesPage
│   │   ├── AboutPage
│   │   ├── BlogPage / BlogDetailPage
│   │   ├── ContactPage
│   │   ├── PrivacyPolicyPage
│   │   ├── TermsOfServicePage
│   │   └── AuthPage
│   └── Protected Routes
│       ├── ClientDashboard
│       └── AdminDashboard
└── Global Components
    ├── Toaster
    ├── ScrollToTop
    ├── CookieConsentBanner
    └── CookieSettingsButton
```

### State Management

| Type | Solution | Use Case |
|------|----------|----------|
| Server State | TanStack Query | API data fetching and caching |
| Auth State | React Context | User authentication state |
| Theme State | React Context | Dark/light mode |
| Form State | React Hook Form | Form handling and validation |
| Local State | useState | Component-specific state |

### Routing

We use **Wouter** instead of React Router for its simplicity and smaller bundle size:

```typescript
// Public routes - accessible to all
<Route path="/" component={HomePage} />
<Route path="/services" component={ServicesPage} />

// Protected routes - require authentication
<ProtectedRoute path="/dashboard" component={ClientDashboard} />
<ProtectedRoute path="/admin" component={AdminDashboard} />
```

### Component Library

The UI is built on **shadcn/ui** which provides:

- Pre-built accessible components based on Radix UI
- Customizable with Tailwind CSS
- Copy-paste architecture (components live in your codebase)

Components are located in `client/src/components/ui/`.

---

## Backend Architecture

### Server Structure

```
server/
├── index.ts      # Entry point, middleware setup
├── routes.ts     # API route definitions
├── auth.ts       # Passport.js configuration
├── storage.ts    # In-memory data store
└── vite.ts       # Vite dev server integration
```

### Request Processing Pipeline

```
Request → Express Middleware → Route Handler → Storage → Response

Middleware Stack:
1. JSON body parser
2. URL-encoded body parser
3. Request logging (API routes)
4. Session middleware
5. Passport authentication
6. Route handlers
7. Error handler
8. Static file server (production) / Vite (development)
```

### Storage Architecture

The application uses an in-memory storage system:

```typescript
class MemoryStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private inquiries: Map<number, Inquiry>;
  
  // CRUD operations for each entity
  async createUser(data: InsertUser): Promise<User>;
  async getUser(id: number): Promise<User | undefined>;
  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;
  // ... etc
}
```

**Benefits:**
- Zero database setup required
- Fast read/write operations
- Simple to understand and modify

**Limitations:**
- Data lost on server restart
- Not suitable for high-traffic production
- No data persistence

---

## Data Flow

### Authentication Flow

```
┌──────────┐         ┌──────────┐         ┌──────────┐
│  Client  │         │  Server  │         │ Storage  │
└────┬─────┘         └────┬─────┘         └────┬─────┘
     │                    │                    │
     │  POST /api/login   │                    │
     │───────────────────>│                    │
     │                    │  getUser(username) │
     │                    │───────────────────>│
     │                    │                    │
     │                    │<──────────────────-│
     │                    │   User data        │
     │                    │                    │
     │                    │  Verify password   │
     │                    │  Create session    │
     │<───────────────────│                    │
     │  Set-Cookie + User │                    │
     │                    │                    │
```

### Data Fetching with TanStack Query

```typescript
// Component requests data
const { data, isLoading, error } = useQuery({
  queryKey: ['projects'],
  queryFn: fetchProjects
});

// Query flow:
// 1. Check cache for ['projects'] key
// 2. If stale or missing, call fetchProjects()
// 3. Cache response for future requests
// 4. Re-render component with data
```

### Form Submission Flow

```
┌──────────┐         ┌──────────┐         ┌──────────┐
│  Form    │         │  Server  │         │  Email   │
└────┬─────┘         └────┬─────┘         └────┬─────┘
     │                    │                    │
     │ POST /api/inquiries│                    │
     │───────────────────>│                    │
     │                    │                    │
     │                    │  Validate (Zod)    │
     │                    │  Save to storage   │
     │                    │  Send email        │
     │                    │───────────────────>│
     │                    │                    │
     │<───────────────────│                    │
     │   201 Created      │                    │
     │                    │                    │
```

---

## Security

### Authentication

- **Session-based auth** with Passport.js
- **Password hashing** using scrypt
- **HTTP-only cookies** for session storage

### Authorization

Role-based access control (RBAC):

```typescript
// Middleware pattern
if (req.user?.role !== "admin") {
  return res.status(403).json({ message: "Access denied" });
}
```

### Input Validation

All inputs validated with Zod schemas:

```typescript
const insertInquirySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Invalid email address"),
  // ...
});
```

### XSS Prevention

- React's automatic escaping
- Content-Type headers on API responses

### CSRF Protection

- Same-origin policy
- Credentials included in fetch requests

---

## Performance

### Build Optimization

| Optimization | Tool | Description |
|--------------|------|-------------|
| Tree shaking | Vite/Rollup | Remove unused code |
| Code splitting | Vite | Dynamic imports |
| Minification | esbuild | Compress bundle |
| Asset hashing | Vite | Cache busting |

### Runtime Performance

- **TanStack Query caching** - Reduces API calls
- **React memoization** - Prevents unnecessary re-renders
- **Lazy loading** - Load components on demand
- **CSS-in-JS avoided** - No runtime style computation

### Image Optimization

Images are served from the public directory. Consider:
- WebP format for better compression
- Responsive images with `srcset`
- Lazy loading for below-fold images

---

## Scalability Considerations

### Current Limitations

1. **In-memory storage** - Data lost on restart
2. **Single server** - No horizontal scaling
3. **Session storage** - Memory-based

### Production Recommendations

#### Database

Replace in-memory storage with a database:

```typescript
// Option 1: PostgreSQL with Drizzle ORM
// Option 2: MongoDB with Mongoose
// Option 3: SQLite for simple deployments
```

#### Session Storage

Use Redis for session storage:

```typescript
import RedisStore from "connect-redis";
import { createClient } from "redis";

const redisClient = createClient();
app.use(session({
  store: new RedisStore({ client: redisClient }),
  // ...
}));
```

#### Horizontal Scaling

- Containerize with Docker
- Deploy to Kubernetes or cloud platforms
- Use load balancer for multiple instances
- Externalize state (Redis, database)

### Infrastructure Diagram (Production)

```
                    ┌───────────────┐
                    │ Load Balancer │
                    └───────┬───────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
        ┌─────▼─────┐ ┌─────▼─────┐ ┌─────▼─────┐
        │ Instance 1│ │ Instance 2│ │ Instance 3│
        └─────┬─────┘ └─────┬─────┘ └─────┬─────┘
              │             │             │
              └─────────────┼─────────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
        ┌─────▼─────┐ ┌─────▼─────┐ ┌─────▼─────┐
        │  Redis    │ │ PostgreSQL│ │    S3     │
        │ (Sessions)│ │   (Data)  │ │ (Assets)  │
        └───────────┘ └───────────┘ └───────────┘
```

---

## Directory Structure Rationale

```
├── client/               # Frontend SPA
│   └── src/
│       ├── components/   # Reusable components
│       │   └── ui/       # Base UI kit
│       ├── hooks/        # Custom React hooks
│       ├── lib/          # Utilities
│       └── pages/        # Route components
├── server/               # Backend API
├── shared/               # Shared types/schemas
└── dist/                 # Build output
```

**Why this structure?**

1. **Monorepo** - Single repo for frontend + backend simplifies deployment
2. **Shared schemas** - Zod schemas used by both client and server
3. **Clear separation** - `/client`, `/server`, `/shared` directories
4. **Component colocation** - Components with their styles and hooks

---

## Future Considerations

1. **Testing** - Add Jest/Vitest for unit tests, Playwright for E2E
2. **CI/CD** - GitHub Actions for automated testing and deployment
3. **Monitoring** - Add error tracking (Sentry) and analytics
4. **CDN** - Serve static assets from a CDN
5. **PWA** - Add service worker for offline support
