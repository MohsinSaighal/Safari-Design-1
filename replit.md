# SafariQ - Web3 Travel Platform

## Overview

SafariQ is a full-stack Web3 travel platform that combines AI-powered travel services with blockchain rewards and NFT utility. The application is built as a modern single-page web application with a React frontend and Express.js backend, utilizing PostgreSQL for data persistence and integrating Web3 functionality for token rewards and NFT minting.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with a dark theme and neon accent colors (cyan, violet, green)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: Zustand for global application state with persistence
- **Animations**: Framer Motion for smooth page transitions and component animations
- **HTTP Client**: TanStack Query (React Query) for server state management and caching

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API design with typed request/response handling
- **Middleware**: Custom logging, JSON parsing, and error handling middleware
- **Development**: Hot reload with Vite integration in development mode

### Data Storage Solutions
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with connection pooling
- **Schema**: Typed schema definitions with Zod validation
- **Migrations**: Drizzle Kit for database schema management
- **Tables**: Users, NFTs, Referrals, Newsletter subscriptions

## Key Components

### User Management System
- User registration with email, name, country, and optional wallet address
- Referral code generation and tracking system
- Rank progression (Explorer → Trailblazer → Ambassador) based on invite counts
- SED token earning and leaderboard functionality

### Web3 Integration
- NFT minting system for "Key" NFTs with different tiers (Explorer, Trailblazer, Ambassador)
- Wallet connection handling (prepared for Web3 integration)
- Token reward system tied to referral activities
- Smart contract interaction preparation

### UI/UX Features
- Responsive design with mobile-first approach
- Dark theme with neon accent colors for Web3 aesthetic
- Smooth animations and transitions using Framer Motion
- Toast notifications for user feedback
- Loading states and error handling

### Content Management
- Static content sections: Hero, Ecosystem, Web3 Vision, Roadmap, Community
- Newsletter subscription functionality
- Legal pages for terms, privacy policy, and cookies
- Social media integration links

## Data Flow

### User Registration Flow
1. User submits registration form with personal details
2. Backend validates data using Zod schemas
3. System generates unique referral code
4. User data stored in PostgreSQL database
5. Frontend updates global state and redirects to dashboard

### NFT Minting Flow
1. User selects NFT tier and initiates minting
2. System checks availability and user eligibility
3. Mock Web3 transaction processing (prepared for real blockchain integration)
4. NFT record created in database with metadata
5. User's NFT collection updated in frontend state

### Referral System Flow
1. User shares referral code with friends
2. New user registers using referral code
3. System creates referral relationship in database
4. Both users receive SED token rewards
5. Leaderboard rankings updated automatically

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for serverless environments
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management and caching
- **framer-motion**: Animation library for smooth user interactions
- **zustand**: Lightweight state management solution

### UI Dependencies
- **@radix-ui/***: Headless UI components for accessibility
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe component variants
- **lucide-react**: Icon library with consistent design

### Development Dependencies
- **vite**: Fast build tool and development server
- **typescript**: Static type checking
- **tsx**: TypeScript execution for Node.js

## Deployment Strategy

### Development Environment
- Vite development server with hot module replacement
- Express server with middleware integration
- Database migrations using Drizzle Kit
- Environment variable configuration for database connection

### Production Build Process
1. Frontend built using Vite with optimized asset bundling
2. Backend compiled using ESBuild for Node.js target
3. Static assets served from Express server
4. Database schema pushed using Drizzle migrations

### Environment Configuration
- **Development**: Local development with hot reload
- **Production**: Optimized builds with static asset serving
- **Database**: PostgreSQL URL configuration via environment variables

The application is designed to be scalable and maintainable, with clear separation of concerns between frontend and backend, type safety throughout the stack, and preparation for real Web3 integration when ready to deploy to blockchain networks.

## Recent Changes

### Migration to Replit (July 30, 2025)
- ✅ Successfully migrated project from Replit Agent to standard Replit environment
- ✅ Enhanced integration cards with improved vertical separation and smooth stacking animation on scroll
- ✅ Added robust backend security with input validation middleware and rate limiting (100 requests/minute)
- ✅ Improved user authentication flow with enhanced dashboard navigation showing user status and rank
- ✅ Implemented proper client/server separation with security best practices
- ✅ Added comprehensive error handling and request validation using Zod schemas

### Technical Improvements
- **Integration Cards Animation**: Cards now start vertically separated and smoothly stack as user scrolls, creating a more engaging visual experience
- **Backend Security**: Added input validation middleware, rate limiting, and proper error handling to prevent common vulnerabilities
- **User Experience**: Enhanced navigation to show user status when logged in, including name and rank badges
- **Type Safety**: Maintained strict TypeScript usage throughout the stack with proper validation at API boundaries