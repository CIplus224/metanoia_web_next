# Classroom Management Frontend

A modern, offline-first classroom management application built with Next.js 15, designed for educational institutions to manage textbooks, attendance, and classroom activities.

## Features

### 🏫 **Multi-Role Dashboard**

- **Teachers**: Manage lesson plans, textbooks, and attendance
- **Principals**: School-wide oversight and reporting
- **Inspectors**: Cross-school monitoring and evaluation

### 📚 **Textbook Management**

- Rich text editor with Quill for lesson content creation
- Session scheduling with date and time management
- Offline content creation and synchronization
- Content organization by subject and class

### 📊 **Attendance Tracking**

- Student presence recording (present, absent, late, excused)
- Offline attendance capture with sync capabilities
- Historical attendance reports and analytics

### 🔄 **Offline-First Architecture**

- IndexedDB-based local storage with Dexie
- Automatic background synchronization
- Conflict resolution for concurrent edits
- Robust retry mechanisms for failed syncs

### 🌐 **Progressive Web App (PWA)**

- Service worker for offline functionality
- Installable on mobile and desktop
- Background sync and caching strategies
- Offline fallback pages

### 🌍 **Internationalization**

- Multi-language support (French/English)
- Browser language detection
- Dynamic language switching

## Tech Stack

### Core Framework

- **Next.js 15** with App Router
- **React 19** with latest features
- **TypeScript** for type safety

### State Management & Data

- **Zustand** for client state management
- **Dexie** for IndexedDB operations
- **TanStack Query** for server state
- **React Hook Form** with Zod validation

### UI & Styling

- **Tailwind CSS** for styling
- **Radix UI** components library
- **Lucide React** for icons
- **React Quill** for rich text editing

### Offline & PWA

- **next-pwa** for service worker
- **Workbox** for caching strategies
- Custom sync manager for data synchronization

### Development Tools

- **ESLint** for code linting
- **Prettier** for code formatting
- **Turbopack** for fast development builds

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd classroom-frontend
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Configure your API endpoints and other environment variables.

4. Start the development server:

```bash
pnpm run dev
```

The application will be available at [http://localhost:3004](http://localhost:3004).

## Development Commands

```bash
# Start development server with Turbopack
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm run start

# Run ESLint
pnpm run lint

# Format code with Prettier
pnpm run format
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Main application routes
│   │   ├── attendance/    # Attendance management
│   │   ├── classes/       # Class management
│   │   ├── inspector/     # Inspector-specific views
│   │   ├── principal/     # Principal-specific views
│   │   ├── reports/       # Reporting interface
│   │   ├── settings/      # User settings
│   │   └── textbooks/     # Textbook management
│   └── login/             # Authentication pages
├── components/            # Reusable React components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components (Header, Sidebar)
│   ├── providers/        # Context providers
│   └── ui/               # Base UI components (Radix)
├── lib/                  # Utility libraries
│   ├── api/              # API functions
│   ├── api-client.ts     # Axios configuration
│   ├── offlineStorage.ts # IndexedDB wrapper
│   └── syncManager.ts    # Sync logic
├── stores/               # Zustand stores
├── types/                # TypeScript type definitions
├── context/              # React contexts
├── i18n/                 # Internationalization setup
├── messages/             # Translation files
└── styles/               # Global styles and Quill themes
```

## Architecture Overview

### Offline-First Design

The application prioritizes offline functionality with a sophisticated synchronization system:

1. **Local Storage**: All data is stored in IndexedDB using Dexie
2. **Sync Manager**: Handles bidirectional sync with conflict resolution
3. **Connection Awareness**: Automatically syncs when online, queues when offline
4. **Conflict Resolution**: Merge strategies for concurrent edits

### Authentication & Authorization

- Cookie-based session management
- Role-based access control in middleware
- Zustand store for auth state management

### Data Flow

1. User interactions → Local IndexedDB storage
2. Background sync → Server API
3. Conflict detection → User resolution prompts
4. Real-time updates → UI state updates

## API Integration

The application expects a REST API with the following endpoints:

- `POST /api/auth/login` - User authentication
- `GET /api/textbooks` - Fetch textbooks
- `POST /api/textbooks` - Create textbook entry
- `PUT /api/textbooks/:id` - Update textbook entry
- `DELETE /api/textbooks/:id` - Delete textbook entry
- `GET /api/attendance` - Fetch attendance records
- `POST /api/attendance` - Create attendance record

## Environment Variables

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_URL=http://localhost:3004
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
