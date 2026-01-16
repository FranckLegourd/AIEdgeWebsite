# AI Edge International Website

A modern, full-stack web application for **AI Edge International**, an AI consulting company providing artificial intelligence solutions and services to businesses.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-20%2B-green.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.6-blue.svg)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Internationalization](#internationalization)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Overview

AI Edge International is a comprehensive web platform for an AI consulting company offering:

- **AI Process Automation** - Streamlining business workflows
- **Machine Learning Solutions** - Custom ML model development
- **Data Analytics** - Advanced data insights and analytics
- **Natural Language Processing** - Text and language AI solutions
- **Computer Vision** - Image and video analysis capabilities
- **AI Agents** - Autonomous intelligent agent development

The website includes a public-facing marketing site, client dashboard for project tracking, and an admin dashboard for managing clients and inquiries.

---

## Features

### 🌐 Public Website
- **Homepage** - Hero section, services overview, partner showcase, and CTAs
- **Services Page** - Detailed AI service offerings with features and benefits
- **About Page** - Company information and team details
- **Blog** - Articles and news with detail pages
- **Contact Page** - Contact form with email notifications
- **Privacy Policy & Terms of Service** - Legal pages

### 👤 Client Dashboard
- View assigned projects and their statuses
- Track project progress and milestones
- Secure authentication

### 👨‍💼 Admin Dashboard
- Manage all projects across clients
- View and respond to inquiries
- User management capabilities
- Create and update projects

### 🎨 UI/UX Features
- **Dark/Light Theme** - Toggle between themes
- **Responsive Design** - Mobile-first approach
- **Multi-language Support** - English and French translations
- **Cookie Consent** - GDPR-compliant cookie banner
- **Smooth Animations** - Framer Motion powered transitions

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI library |
| **TypeScript** | Type safety |
| **Vite** | Build tool and dev server |
| **TailwindCSS** | Utility-first styling |
| **Radix UI** | Accessible component primitives |
| **TanStack Query** | Server state management |
| **Wouter** | Lightweight routing |
| **Framer Motion** | Animations |
| **Lucide React** | Icon library |
| **React Hook Form + Zod** | Form handling and validation |

### Backend
| Technology | Purpose |
|------------|---------|
| **Express.js** | Web server framework |
| **TypeScript** | Type safety |
| **Passport.js** | Authentication |
| **Nodemailer** | Email notifications |
| **Zod** | Request validation |

### Storage
- **In-memory storage** - No database required (data persists in memory)

---

## Project Structure

```
AIEdgeWebsite/
├── client/                    # Frontend React application
│   └── src/
│       ├── components/        # Reusable UI components
│       │   ├── ui/            # Shadcn/Radix UI components (47 components)
│       │   ├── navigation.tsx # Main navigation bar
│       │   ├── footer.tsx     # Site footer
│       │   └── ...
│       ├── hooks/             # Custom React hooks
│       │   ├── use-auth.tsx   # Authentication hook
│       │   ├── use-theme.tsx  # Theme management
│       │   ├── use-translation.tsx  # i18n hook
│       │   ├── use-toast.ts   # Toast notifications
│       │   ├── use-mobile.tsx # Mobile detection
│       │   └── use-cookie-consent.tsx
│       ├── lib/               # Utilities and configurations
│       │   ├── translations.ts # Translation strings
│       │   ├── queryClient.ts # TanStack Query config
│       │   ├── protected-route.tsx # Auth route wrapper
│       │   └── utils.ts
│       ├── pages/             # Page components
│       │   ├── home-page.tsx
│       │   ├── services-page.tsx
│       │   ├── about-page.tsx
│       │   ├── blog-page.tsx
│       │   ├── blog-detail-page.tsx
│       │   ├── contact-page.tsx
│       │   ├── auth-page.tsx
│       │   ├── client-dashboard.tsx
│       │   ├── admin-dashboard.tsx
│       │   ├── privacy-policy-page.tsx
│       │   ├── terms-of-service-page.tsx
│       │   └── not-found.tsx
│       ├── App.tsx            # Main application component
│       ├── main.tsx           # Entry point
│       └── index.css          # Global styles
├── server/                    # Backend Express application
│   ├── index.ts               # Server entry point
│   ├── routes.ts              # API route definitions
│   ├── auth.ts                # Authentication setup
│   ├── storage.ts             # In-memory data storage
│   └── vite.ts                # Vite integration for dev
├── shared/                    # Shared code between client/server
│   └── schema.ts              # Zod schemas and TypeScript types
├── dist/                      # Production build output
├── attached_assets/           # Static assets
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
└── .env                       # Environment variables (not committed)
```

---

## Getting Started

### Prerequisites

- **Node.js** version 20 or higher (v24.x recommended)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AIEdgeWebsite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your configuration (see [Environment Variables](#environment-variables))

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Required
SESSION_SECRET=your_secure_random_string_here

# Email Configuration (for contact form notifications)
MAIL_HOST=smtp.hostinger.com
MAIL_PORT=465
MAIL_USERNAME=your_email@yourdomain.com
MAIL_PASSWORD=your_email_password

# Optional
PORT=3000                    # Server port (default: 3000)
NODE_ENV=development         # Environment (development/production)
```

### Variable Descriptions

| Variable | Required | Description |
|----------|----------|-------------|
| `SESSION_SECRET` | ✅ | Secret key for session encryption |
| `MAIL_HOST` | ✅ | SMTP server hostname |
| `MAIL_PORT` | ✅ | SMTP port (465 for SSL, 587 for TLS) |
| `MAIL_USERNAME` | ✅ | Email account username |
| `MAIL_PASSWORD` | ✅ | Email account password |
| `PORT` | ❌ | Server port (default: 3000) |
| `NODE_ENV` | ❌ | Environment mode |

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (client + server) |
| `npm start` | Run production build |
| `npm run check` | Run TypeScript type checking |

### Build Process

The build script performs two steps:
1. **Vite build** - Compiles the React frontend to `dist/client`
2. **esbuild** - Bundles the server to `dist/index.js`

---

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/register` | Register new user | ❌ |
| `POST` | `/api/login` | User login | ❌ |
| `POST` | `/api/logout` | User logout | ✅ |
| `GET` | `/api/user` | Get current user | ✅ |

### Projects

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/projects` | Get all projects (admin) or user's projects (client) | ✅ |
| `GET` | `/api/projects/:id` | Get project by ID | ✅ |
| `POST` | `/api/projects` | Create new project | ✅ (Admin) |
| `PATCH` | `/api/projects/:id` | Update project | ✅ (Admin) |
| `DELETE` | `/api/projects/:id` | Delete project | ✅ (Admin) |

### Inquiries

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/inquiries` | Get all inquiries | ✅ (Admin) |
| `POST` | `/api/inquiries` | Submit new inquiry | ❌ |
| `PATCH` | `/api/inquiries/:id` | Update inquiry status | ✅ (Admin) |

### Users (Admin Only)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/users` | Get all users | ✅ (Admin) |
| `PATCH` | `/api/users/:id` | Update user | ✅ (Admin) |

---

## Authentication

The application uses **Passport.js** with a local strategy for authentication.

### User Roles

| Role | Permissions |
|------|-------------|
| `client` | View own projects, access client dashboard |
| `admin` | Full access to all features, manage users/projects/inquiries |

### Session Management

Sessions are stored in memory using `memorystore`. In production, consider using a persistent session store like Redis.

---

## Internationalization

The application supports multiple languages:

- 🇬🇧 **English** (default)
- 🇫🇷 **French**

### Translation Files

Translations are stored in `client/src/lib/translations.ts`.

### Usage

```tsx
import { useTranslation } from "@/hooks/use-translation";

function MyComponent() {
  const { t, language, setLanguage } = useTranslation();
  
  return (
    <div>
      <h1>{t("hero.title")}</h1>
      <button onClick={() => setLanguage("fr")}>Français</button>
    </div>
  );
}
```

---

## Data Models

### User

```typescript
interface User {
  id: number;
  username: string;
  email: string;
  password: string;      // Hashed
  firstName: string;
  lastName: string;
  company: string | null;
  role: "client" | "admin";
  isActive: boolean;
  createdAt: Date;
}
```

### Project

```typescript
interface Project {
  id: number;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed" | "on_hold";
  serviceType: string;
  clientId: number;
  assignedTo: number | null;
  budget: number | null;
  startDate: Date | null;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
```

### Inquiry

```typescript
interface Inquiry {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  serviceInterest: string;
  message: string | null;
  status: "new" | "contacted" | "closed";
  createdAt: Date;
}
```

---

## Deployment

### Production Build

```bash
npm run build
npm start
```

### Hostinger Deployment

1. Build the project locally
2. Upload the `dist` folder to your hosting
3. Configure Node.js application in Hostinger panel
4. Set environment variables
5. Point the entry point to `dist/index.js`

### Railway Deployment

1. Connect your GitHub repository
2. Set environment variables in Railway dashboard
3. Railway will auto-detect and deploy

### Environment Considerations

- Set `NODE_ENV=production`
- Use a strong `SESSION_SECRET`
- Configure SMTP settings for email notifications
- Consider using external session storage for scalability

---

## Component Library

The project uses **shadcn/ui** components built on **Radix UI** primitives. Available components include:

- Accordion, Alert Dialog, Avatar
- Button, Card, Checkbox, Collapsible
- Dialog, Dropdown Menu, Hover Card
- Input, Label, Menubar, Navigation Menu
- Popover, Progress, Radio Group
- Scroll Area, Select, Separator, Slider
- Switch, Tabs, Toast, Toggle, Tooltip
- And more...

### Adding New Components

```bash
# Components are in client/src/components/ui/
# Follow the existing patterns for consistency
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow existing naming conventions
- Add translations for any user-facing text
- Ensure responsive design for all UI changes

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Support

For questions or support, contact: **agent@aiedgeinternational.com**

---

<div align="center">
  Built with ❤️ by <strong>AI Edge International</strong>
</div>
