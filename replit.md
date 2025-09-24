# Overview

This is a full-stack web application built with React (frontend) and Express.js (backend) using TypeScript. The project appears to be designed for a software consultancy company called "Roya Systems Ltd" and includes a modern tech stack with shadcn/ui components, TailwindCSS for styling, and Drizzle ORM for database operations. The application is structured as a monorepo with shared schema definitions and follows modern development practices.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: TailwindCSS with custom CSS variables for theming
- **State Management**: TanStack React Query for server state management
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation via @hookform/resolvers

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **API Structure**: RESTful API with routes prefixed under `/api`
- **Development**: Hot reload with Vite integration in development mode

## Project Structure
- **Monorepo Layout**: Separate `client/`, `server/`, and `shared/` directories
- **Shared Schema**: Common database schema and validation types in `shared/schema.ts`
- **Component Organization**: UI components in `client/src/components/ui/` with consistent patterns
- **Build Process**: Vite for frontend bundling, esbuild for backend compilation

## Data Storage
- **Database**: PostgreSQL with Neon Database serverless connection
- **ORM**: Drizzle ORM with type-safe database operations
- **Migrations**: Drizzle Kit for database schema migrations
- **Session Storage**: PostgreSQL-backed session storage using connect-pg-simple

## Authentication & Authorization
- **Session-based Authentication**: Using Express sessions with PostgreSQL storage
- **User Schema**: Basic user model with username/password authentication
- **Security**: Password hashing and session management (implementation details in progress)

## Development Workflow
- **Development Server**: Integrated Vite dev server with Express backend
- **TypeScript**: Strict type checking across the entire application
- **Hot Reload**: Full-stack hot reload in development
- **Build Process**: Production builds with optimized client and server bundles

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React 18 with TypeScript support
- **Component Library**: Radix UI primitives with shadcn/ui wrapper components
- **Styling**: TailwindCSS with PostCSS for processing
- **State Management**: TanStack React Query for server state
- **Form Management**: React Hook Form with Zod schema validation
- **Icons**: Lucide React icon library
- **Utilities**: Class Variance Authority (CVA) for component variants, clsx for conditional classes

### Backend Dependencies
- **Runtime**: Node.js with Express.js framework
- **Database**: Neon Database (serverless PostgreSQL)
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: Express sessions with connect-pg-simple
- **Development**: tsx for TypeScript execution, esbuild for production builds

### Development Tools
- **Build Tools**: Vite for frontend, esbuild for backend
- **TypeScript**: Comprehensive type checking and IDE support
- **Linting & Formatting**: TypeScript compiler for type checking
- **Database Migrations**: Drizzle Kit for schema management

### Third-party Integrations
- **Neon Database**: Serverless PostgreSQL hosting
- **Replit Integration**: Development environment plugins for Replit IDE
- **Font Loading**: Google Fonts integration for Inter typography