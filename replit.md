# Shri Shrree Asttro Consultancy

## Overview

This is a full-stack web application for Shri Shrree Asttro Consultancy, a professional astrology and spiritual services business. The application provides a modern, mystical-themed website showcasing various astrology services including Vedic astrology, numerology, tarot reading, and name correction services.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom mystical theme
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL (via Neon Database)
- **ORM**: Drizzle ORM for type-safe database operations
- **Development**: tsx for TypeScript execution in development

### Database Schema
- **Users Table**: Basic user authentication structure with username/password
- **Schema Location**: `shared/schema.ts` for shared types between frontend and backend
- **Migrations**: Drizzle Kit for database migrations in `migrations/` directory

## Key Components

### Frontend Components
- **Navigation**: Fixed header with smooth scrolling navigation
- **HeroSection**: Landing area with 3D background effects and mystical animations
- **ServicesSection**: Grid layout showcasing all astrology services with pricing
- **AboutSection**: Company background and credentials
- **TestimonialsSection**: Client testimonials with rating system
- **ContactSection**: Contact form with form validation
- **Footer**: Site footer with quick links and company information

### Backend Components
- **Storage Interface**: Abstracted storage layer with in-memory implementation
- **Routes**: RESTful API endpoints (to be implemented)
- **Middleware**: Request logging and error handling
- **Development Server**: Vite integration for hot module replacement

### UI System
- **Design System**: Custom mystical theme with gold/navy color palette
- **Typography**: Playfair Display for headings, Inter for body text
- **Animations**: CSS-based animations for smooth user experience
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

## Data Flow

1. **Client Requests**: Frontend makes API calls to `/api/*` endpoints
2. **Request Processing**: Express middleware handles logging and validation
3. **Data Layer**: Storage interface abstracts database operations
4. **Response**: JSON responses with proper error handling
5. **State Management**: TanStack Query manages client-side caching and updates

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React, ReactDOM, React Hook Form
- **Styling**: Tailwind CSS, Radix UI components
- **Development**: Vite, TypeScript, ESBuild
- **Database**: Drizzle ORM, Neon Database, PostgreSQL adapter
- **Validation**: Zod for schema validation
- **Utilities**: date-fns, clsx, class-variance-authority

### Development Tools
- **Build**: Vite for frontend, ESBuild for backend
- **TypeScript**: Full type safety across the stack
- **Database Tools**: Drizzle Kit for migrations and schema management

## Deployment Strategy

### Production Build
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations ensure schema consistency

### Environment Configuration
- **Development**: `npm run dev` starts both frontend and backend with HMR
- **Production**: `npm run build` creates optimized bundles
- **Database**: `npm run db:push` syncs schema changes

### Hosting
- **Platform**: Configured for Replit deployment with autoscale
- **Port**: Server runs on port 5000, proxied to port 80
- **Static Files**: Served from `dist/public` in production

## Changelog

```
Changelog:
- June 26, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```