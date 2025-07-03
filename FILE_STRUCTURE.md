# File Structure - Vibe Coder

## Current Directory Structure

```
vibe-coder/
├── public/
│   └── vite.svg                    # Vite logo (default)
├── src/
│   ├── components/                 # React components organized by feature
│   │   ├── ui/                     # Reusable UI components
│   │   │   ├── Header.tsx          # (Future) Game header with stats
│   │   │   ├── BusinessTabs.tsx    # (Future) Business tab navigation
│   │   │   ├── BusinessCard.tsx    # (Future) Individual business display
│   │   │   └── GenerateButton.tsx  # (Future) Business generation button
│   │   ├── game/                   # Game-specific components
│   │   │   ├── GameStats.tsx       # (Future) Game statistics display
│   │   │   ├── AIModelSelector.tsx # (Future) AI model upgrade UI
│   │   │   └── BusinessManager.tsx # (Future) Business management panel
│   │   └── layout/                 # Layout components
│   │       └── GameLayout.tsx      # (Future) Main game layout
│   ├── stores/                     # Zustand store definitions
│   │   ├── gameStore.ts            # (Future) Main game state store
│   │   └── uiStore.ts              # (Future) UI state store
│   ├── types/                      # TypeScript type definitions
│   │   ├── game.ts                 # (Future) Game-related types
│   │   └── business.ts             # (Future) Business-related types
│   ├── utils/                      # Utility functions
│   │   ├── gameLogic.ts            # (Future) Game calculation logic
│   │   ├── businessGenerator.ts    # (Future) Business generation logic
│   │   └── saveSystem.ts           # (Future) Save/load functionality
│   ├── assets/                     # Static assets
│   │   └── react.svg               # React logo (default)
│   ├── App.tsx                     # Main application component
│   ├── App.test.tsx                # Tests for App component
│   ├── App.css                     # App-specific styles
│   ├── index.css                   # Global styles
│   ├── main.tsx                    # Application entry point
│   ├── setupTests.ts               # Test configuration
│   └── vite-env.d.ts               # Vite environment types
├── .prettierrc                     # Prettier configuration
├── eslint.config.js                # ESLint configuration
├── jest.config.js                  # Jest testing configuration
├── tsconfig.json                   # TypeScript configuration
├── tsconfig.app.json               # TypeScript app configuration
├── tsconfig.node.json              # TypeScript Node.js configuration
├── vite.config.ts                  # Vite build configuration
├── package.json                    # Project dependencies and scripts
├── package-lock.json               # Dependency lock file
├── index.html                      # HTML entry point
├── README.md                       # Project documentation
├── PROJECT_STATE.md                # Current implementation status
├── ARCHITECTURE_DECISIONS.md       # Technical decisions log
├── ESSENTIAL_TYPES.md              # Core TypeScript interfaces
└── FILE_STRUCTURE.md               # This file
```

## File Responsibilities

### Root Configuration Files
- **package.json**: Project metadata, dependencies, and npm scripts
- **tsconfig.json**: TypeScript compiler configuration
- **vite.config.ts**: Vite build tool configuration
- **jest.config.js**: Jest testing framework configuration
- **eslint.config.js**: ESLint code quality configuration
- **.prettierrc**: Prettier code formatting configuration

### Source Code Organization

#### `/src/components/`
Component organization follows feature-based architecture:

- **`/ui/`**: Reusable UI components that could be used across features
  - Generic buttons, inputs, modals, cards
  - Not game-specific, could be extracted to a UI library

- **`/game/`**: Game-specific components containing business logic
  - Components that understand game state and rules
  - Integrate with stores and handle game actions

- **`/layout/`**: Layout and structural components
  - Page layouts, headers, footers
  - Responsive design components

#### `/src/stores/`
Zustand store definitions for state management:

- **`gameStore.ts`**: Main game state (cash, businesses, AI models, time)
- **`uiStore.ts`**: UI state (active tabs, modals, vibe level)

#### `/src/types/`
TypeScript type definitions organized by domain:

- **`game.ts`**: Core game types (GameState, AIModel, GameConfig)
- **`business.ts`**: Business-related types (Business, BusinessMetrics)

#### `/src/utils/`
Pure utility functions with no dependencies on React or stores:

- **`gameLogic.ts`**: Game calculation logic (MAU growth, profit calculations)
- **`businessGenerator.ts`**: Business generation algorithms
- **`saveSystem.ts`**: Save/load functionality for localStorage

### Current Implementation Status

#### ✅ Implemented Files
- **`App.tsx`**: Basic placeholder component with "Vibe Coder" title
- **`App.test.tsx`**: Tests for App component using data-testid selectors
- **`setupTests.ts`**: Test environment configuration
- **All configuration files**: Properly configured and tested

#### 📋 Planned Files (Not Yet Created)
All files in `/components/`, `/stores/`, `/types/`, and `/utils/` directories are planned but not yet implemented.

## Development Workflow

### Adding New Features
1. **Define Types**: Add TypeScript interfaces in `/src/types/`
2. **Create Utilities**: Add pure logic functions in `/src/utils/`
3. **Build Components**: Create React components in appropriate `/src/components/` subfolder
4. **Add Tests**: Create `.test.tsx` files alongside components
5. **Update Stores**: Modify Zustand stores if needed

### Testing Strategy
- **Unit Tests**: Each component has a corresponding `.test.tsx` file
- **Integration Tests**: Test component interactions with stores
- **Utility Tests**: Test pure functions in isolation
- **E2E Tests**: (Future) Test complete user workflows

### Code Organization Principles
- **Single Responsibility**: Each file has one clear purpose
- **Feature Grouping**: Related functionality is co-located
- **Dependency Direction**: Components depend on stores, stores depend on utils
- **Test Proximity**: Tests are located near the code they test

## Future Expansions

### Potential New Directories
- **`/src/hooks/`**: Custom React hooks for shared logic
- **`/src/constants/`**: Game constants and configuration
- **`/src/services/`**: External API integrations (if needed)
- **`/src/styles/`**: Shared styling utilities and themes
- **`/src/assets/images/`**: Game images and icons

### Scalability Considerations
- **Component Splitting**: Large components can be split into smaller ones
- **Store Splitting**: Game store can be split by feature if it grows too large
- **Utility Modules**: Utils can be further organized by domain
- **Barrel Exports**: Index files can be added for cleaner imports

### Performance Optimizations
- **Code Splitting**: Dynamic imports for large features
- **Asset Optimization**: Image compression and lazy loading
- **Bundle Analysis**: Regular bundle size monitoring
- **Memoization**: React.memo and useMemo for expensive operations

## Import Conventions

### Current Import Style
```typescript
// Relative imports from same directory
import App from './App'

// Relative imports from parent directories
import { render, screen } from '@testing-library/react'
```

### Future Import Style (When Needed)
```typescript
// Absolute imports with path mapping
import { GameStore } from '@/stores/gameStore'
import { Business } from '@/types/business'
import { generateBusiness } from '@/utils/businessGenerator'
```

## File Naming Conventions
- **Components**: PascalCase (e.g., `BusinessCard.tsx`)
- **Utilities**: camelCase (e.g., `gameLogic.ts`)
- **Types**: camelCase (e.g., `business.ts`)
- **Tests**: Same as source + `.test.tsx` (e.g., `BusinessCard.test.tsx`)
- **Stores**: camelCase + Store suffix (e.g., `gameStore.ts`)

## Configuration Management
- **Development**: All configs optimized for development experience
- **Production**: Vite handles production optimizations automatically
- **Testing**: Jest configured for jsdom environment with TypeScript
- **Linting**: ESLint + Prettier for consistent code quality