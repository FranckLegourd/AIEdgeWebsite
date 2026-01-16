# Contributing to AI Edge International Website

Thank you for your interest in contributing to the AI Edge International website! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

---

## Code of Conduct

By participating in this project, you agree to maintain a welcoming and inclusive environment. Please:

- Be respectful and considerate
- Use welcoming and inclusive language
- Accept constructive criticism gracefully
- Focus on what is best for the project

---

## Getting Started

### Prerequisites

- Node.js 20+ (24.x recommended)
- npm
- Git
- A code editor (VS Code recommended)

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/AIEdgeWebsite.git
   cd AIEdgeWebsite
   ```

3. **Add the upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/AIEdgeWebsite.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Create your `.env` file**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

---

## Development Workflow

### Branching Strategy

We use a simplified Git flow:

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `fix/*` - Bug fixes
- `docs/*` - Documentation updates

### Creating a Feature Branch

```bash
# Sync with upstream
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/your-feature-name
```

### Making Changes

1. Make your changes in small, focused commits
2. Test your changes locally
3. Ensure the build passes: `npm run build`
4. Run type checking: `npm run check`

---

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Enable strict mode
- Define explicit types for function parameters and return values
- Avoid `any` type; use `unknown` if type is truly unknown

```typescript
// Good
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Avoid
function greet(name: any): any {
  return `Hello, ${name}!`;
}
```

### React Components

- Use functional components with hooks
- Place components in appropriate directories:
  - `components/ui/` - Reusable UI primitives
  - `components/` - Application-specific components
  - `pages/` - Page-level components

```tsx
// Good - Functional component with TypeScript
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button className={variant} onClick={onClick}>
      {children}
    </button>
  );
}
```

### File Naming

- **Components**: PascalCase for component files (`Button.tsx`, `Navigation.tsx`)
- **Pages**: kebab-case for page files (`home-page.tsx`, `contact-page.tsx`)
- **Utilities**: camelCase for utility files (`queryClient.ts`, `utils.ts`)
- **Hooks**: camelCase with `use-` prefix (`use-auth.tsx`, `use-theme.tsx`)

### CSS/Styling

- Use TailwindCSS utility classes
- Group related classes logically
- Use custom CSS variables for theming
- Keep animations performant

```tsx
// Good
<div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">

// Avoid inline styles where Tailwind suffices
<div style={{ display: 'flex', padding: '16px' }}>
```

### Imports

Order imports as follows:

1. React and external libraries
2. Internal components and hooks
3. Types and utilities
4. Styles

```typescript
// External
import { useState, useEffect } from "react";
import { Link } from "wouter";

// Internal components
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";

// Hooks and utilities
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

// Types
import type { User } from "@shared/schema";
```

---

## Internationalization (i18n)

### Adding New Text

All user-facing text **must** be added to translations:

1. Add the text to `client/src/lib/translations.ts`
2. Add both English and French translations
3. Use the `useTranslation` hook to access translations

```typescript
// In translations.ts
export const translations = {
  en: {
    myNewSection: {
      title: "My Title",
      description: "My description"
    }
  },
  fr: {
    myNewSection: {
      title: "Mon Titre",
      description: "Ma description"
    }
  }
};

// In component
const { t } = useTranslation();
return <h1>{t("myNewSection.title")}</h1>;
```

---

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting, etc.) |
| `refactor` | Code refactoring |
| `test` | Adding or updating tests |
| `chore` | Maintenance tasks |

### Examples

```bash
# Feature
git commit -m "feat(contact): add phone number field to contact form"

# Bug fix
git commit -m "fix(auth): resolve session timeout issue"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Style
git commit -m "style(components): format button component"
```

---

## Pull Request Process

### Before Submitting

1. **Sync with upstream**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run checks**
   ```bash
   npm run check    # TypeScript
   npm run build    # Build test
   ```

3. **Test your changes** thoroughly

### Submitting a Pull Request

1. Push your branch to your fork
   ```bash
   git push origin feature/your-feature-name
   ```

2. Open a Pull Request on GitHub

3. Fill out the PR template:
   - Describe what changes you made
   - Explain why the changes were needed
   - Link any related issues
   - Include screenshots for UI changes

### PR Requirements

- [ ] All checks pass
- [ ] Code follows project standards
- [ ] Translations added for new text
- [ ] Documentation updated if needed
- [ ] No merge conflicts

### Review Process

1. A maintainer will review your PR
2. Address any requested changes
3. Once approved, the PR will be merged

---

## Testing

### Running Type Checks

```bash
npm run check
```

### Manual Testing Checklist

- [ ] Feature works in development mode
- [ ] Feature works after production build
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Dark mode support
- [ ] Both English and French translations
- [ ] No console errors

---

## Documentation

### When to Update Documentation

- Adding new features
- Changing API endpoints
- Modifying environment variables
- Updating dependencies
- Changing project structure

### Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Project overview and setup |
| `docs/API.md` | API endpoint documentation |
| `CONTRIBUTING.md` | Contribution guidelines |
| `RUN_LOCAL.md` | Quick start for local development |

---

## Need Help?

- Check existing issues for similar problems
- Open a new issue with a clear description
- Tag issues appropriately

---

## Recognition

Contributors will be recognized in:
- Pull request acknowledgments
- Release notes
- README.md (for significant contributions)

---

Thank you for contributing! 🎉
