# Knowledge Base Application

## Overview

This is a comprehensive knowledge base application built with React and Node.js that allows users to organize and manage hierarchical information through sections, subsections, and articles. The application features a sidebar navigation system for browsing content, search functionality, and administrative capabilities for content management. It's designed as a utility-focused, information-dense application that prioritizes efficiency and content organization.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Components**: Radix UI primitives with custom shadcn/ui component library following Material Design principles
- **Styling**: Tailwind CSS with custom design system featuring light/dark mode support
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation for type-safe form handling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with structured error handling and request logging
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Validation**: Zod schemas for runtime type validation on both client and server

### Data Storage
- **Database**: PostgreSQL with Neon serverless connection
- **Schema Design**: Three main entities:
  - **kb_sections**: Hierarchical sections with parent-child relationships
  - **kb_articles**: Content articles linked to sections
  - **users**: Basic user authentication (placeholder for future features)
- **Migrations**: Drizzle Kit for database schema management

### Design System
- **Color Palette**: Professional blue primary colors with neutral grays
- **Typography**: Inter font family with defined weight hierarchy
- **Layout**: Fixed sidebar (300px) with responsive breakpoints
- **Component Strategy**: Consistent spacing units and Material Design principles
- **Theme Support**: CSS variables for seamless light/dark mode switching

### Authentication & Authorization
- **Admin System**: Simple password-based admin authentication stored in localStorage
- **Session Management**: Basic client-side session persistence
- **Access Control**: Admin-only features for creating, editing, and deleting content

### Content Management
- **Hierarchical Organization**: Sections can have parent-child relationships with unlimited nesting
- **Article Management**: Rich text articles associated with specific sections
- **Search Functionality**: Real-time search across article titles and content
- **CRUD Operations**: Full create, read, update, delete capabilities for both sections and articles

### User Interface Features
- **Responsive Sidebar**: Collapsible navigation with hierarchical section display
- **Content Viewer**: Dedicated article viewing area with inline editing capabilities
- **Search Integration**: Global search with real-time results
- **Admin Controls**: Contextual admin buttons for content management when authenticated

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM with PostgreSQL dialect
- **@tanstack/react-query**: Server state management and caching
- **express**: Node.js web application framework
- **react**: UI library with TypeScript support

### UI Component Libraries
- **@radix-ui/react-***: Comprehensive set of accessible UI primitives
- **class-variance-authority**: Component variant management
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library for consistent iconography

### Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Static type checking
- **tsx**: TypeScript execution for development
- **@replit/vite-plugin-runtime-error-modal**: Development error handling

### Validation & Forms
- **zod**: Runtime type validation and schema definition
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Form validation resolvers

### Utility Libraries
- **date-fns**: Date manipulation and formatting
- **clsx**: Conditional class name composition
- **cmdk**: Command palette functionality
- **wouter**: Lightweight routing solution