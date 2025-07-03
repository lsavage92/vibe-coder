# Vibe Coder - Product Requirements Document

## 1. Game Overview

### Theme
An incremental idler game where you play as a "vibe coder" using AI models to generate profitable internet businesses. Balance cash flow, manage subscriptions, and survive escalating AI costs while building a business empire.

### Core Objective
Generate and manage profitable businesses using AI models while maintaining positive cash flow to avoid bankruptcy.

### Target Audience
Players familiar with incremental games like Universal Paperclips, Cookie Clicker, and similar idle games.

## 2. Core Game Loop

1. **Monitor Cash Flow** - Track current funds and upcoming expenses
2. **Generate Business** - Use current AI model to create new business (cooldown applies)
3. **Set Pricing** - Adjust business subscription price (only player-controlled variable)
4. **Evaluate Performance** - Monitor business profitability metrics
5. **Manage Portfolio** - Shut down unprofitable businesses
6. **Upgrade AI Model** - Purchase better models when affordable
7. **Survive Payment Cycles** - Maintain positive cash flow through 2-month payment cycles

## 3. Game Mechanics

### 3.1 Resources
- **Primary Resource**: Money (USD)
- **Starting Amount**: $40 (covers 2 months of lowest tier AI)
- **Failure State**: Reaching $0 = Game Over

### 3.2 AI Model Tiers
| Tier | Name | Monthly Cost | Quality Level | Cooldown | Failure Rate |
|------|------|-------------|---------------|----------|--------------|
| 1 | Sloppy Copy | $20 | 10% | 60s | 40% |
| 2 | Jank Bot | $75 | 25% | 45s | 30% |
| 3 | Generic AI | $200 | 40% | 30s | 20% |
| 4 | Smart Stack | $500 | 60% | 20s | 15% |
| 5 | Neural Nexus | $1,200 | 75% | 15s | 10% |
| 6 | Quantum Mind | $3,000 | 90% | 10s | 5% |
| 7 | Vibe Oracle | $7,500 | 98% | 5s | 1% |

### 3.3 Business Generation
- **Cooldown System**: Based on AI model tier (prevents spam generation)
- **Failure Rate**: Higher tier models have lower failure rates
- **Generation Cost**: No upfront cost, only subscription fees
- **Business Limit**: Unlimited initially (can be constrained later)

### 3.4 Business Mechanics
Each business has 5 core traits:

#### Fixed Traits (AI-Generated)
- **Usefulness**: 0-100% (pseudorandom, influenced by model quality)
- **Fun**: 0-100% (pseudorandom, influenced by model quality)
- **Operating Cost**: Base monthly cost (scales with MAUs)

#### Player-Controlled Traits
- **Price**: Monthly subscription price (player sets)

#### Dynamic Traits
- **Monthly Active Users (MAUs)**: Based on usefulness, fun, and price
- **Revenue**: MAUs × Price
- **Profit**: Revenue - Operating Costs

### 3.5 MAU Growth Formula
```
Base MAU Growth = (Usefulness + Fun) / 2
Price Impact = 1 - (Price / MaxReasonablePrice)
MAU Growth Rate = Base Growth × Price Impact × Quality Multiplier
MAU Plateau = Model Quality × MaxMAUCap
```

### 3.6 Time Mechanics
- **Real-time progression**: Game continues when not active
- **Payment Cycles**: Every 2 months, AI subscription costs increase
- **Auto-save**: Continuous saving to localStorage

## 4. Technical Architecture

### 4.1 Technology Stack
- **Frontend**: React 18+ with TypeScript
- **State Management**: Zustand
- **Styling**: CSS-in-JS or styled-components (for vaporwave evolution)
- **Build Tool**: Vite
- **Storage**: localStorage for save data

### 4.2 Project Structure
```
src/
├── components/
│   ├── ui/
│   │   ├── Header.tsx
│   │   ├── BusinessTabs.tsx
│   │   ├── BusinessCard.tsx
│   │   └── GenerateButton.tsx
│   ├── game/
│   │   ├── GameStats.tsx
│   │   ├── AIModelSelector.tsx
│   │   └── BusinessManager.tsx
│   └── layout/
│       └── GameLayout.tsx
├── stores/
│   ├── gameStore.ts
│   └── uiStore.ts
├── types/
│   ├── game.ts
│   └── business.ts
├── utils/
│   ├── gameLogic.ts
│   ├── businessGenerator.ts
│   └── saveSystem.ts
└── App.tsx
```

### 4.3 State Management Structure

#### GameStore (Zustand)
```typescript
interface GameState {
  // Core Game State
  cash: number;
  currentDate: Date;
  gameStartDate: Date;
  currentAIModel: AIModel;
  businesses: Business[];
  
  // Time Management
  lastPaymentDate: Date;
  nextPaymentDate: Date;
  
  // Generation
  generationCooldown: number;
  lastGenerationTime: Date;
  
  // Actions
  generateBusiness: () => void;
  updateBusinessPrice: (id: string, price: number) => void;
  shutdownBusiness: (id: string) => void;
  upgradeAIModel: (modelId: string) => void;
  processTimeStep: () => void;
}
```

#### UIStore (Zustand)
```typescript
interface UIState {
  // UI State
  vibeLevel: number; // 0-100, drives visual evolution
  activeTab: string;
  showUpgradeModal: boolean;
  
  // Actions
  setActiveTab: (tab: string) => void;
  updateVibeLevel: (level: number) => void;
}
```

### 4.4 Core Types
```typescript
interface AIModel {
  id: string;
  name: string;
  monthlyCost: number;
  qualityLevel: number; // 0-100
  cooldownSeconds: number;
  failureRate: number; // 0-100
}

interface Business {
  id: string;
  name: string;
  description: string;
  usefulness: number; // 0-100
  fun: number; // 0-100
  operatingCost: number;
  price: number; // player-controlled
  maus: number;
  createdAt: Date;
  isActive: boolean;
}

interface GameConfig {
  startingCash: number;
  paymentCycleMonths: number;
  maxBusinessLimit?: number;
  vibeThresholds: number[];
}
```

## 5. User Interface Design

### 5.1 Visual Evolution
- **Level 0 (Broke)**: Plain HTML, minimal styling
- **Level 1 ($1K+)**: Subtle gradients, basic colors
- **Level 2 ($10K+)**: More vibrant colors, simple animations
- **Level 3 ($100K+)**: Full vaporwave aesthetic, complex animations
- **Level 4 ($1M+)**: Premium effects, particles, advanced animations

### 5.2 Layout Structure
```
┌─────────────────────────────────────────────────────────────┐
│ Header: Cash | AI Model | Date | Next Payment | Generate    │
├─────────────────────────────────────────────────────────────┤
│ Business Tabs: [Business 1] [Business 2] [+] [...overflow]  │
├─────────────────────────────────────────────────────────────┤
│ Business Details Panel:                                     │
│   Name: "Cool App Name"                                     │
│   Usefulness: 75% | Fun: 60% | MAUs: 1,234                 │
│   Price: [$50] | Revenue: $61,700 | Costs: $12,340         │
│   Profit: $49,360 | [Shutdown]                             │
└─────────────────────────────────────────────────────────────┘
```

### 5.3 Responsive Design
- **Mobile**: Single column, stacked tabs
- **Tablet**: Two-column layout
- **Desktop**: Multi-pane tmux-style layout

## 6. Development Phases

### Phase 1: MVP Core (Week 1-2)
**Goal**: Basic playable game with core mechanics

#### Tasks:
1. **Project Setup & Base Components**
   - Initialize React + TypeScript + Vite project
   - Set up basic folder structure
   - Create main game layout component

2. **Core State Management**
   - Implement Zustand game store
   - Create basic game state (cash, date, AI model)
   - Add time progression system

3. **Business Generation System**
   - Create business generator utility
   - Implement cooldown system
   - Add failure rate mechanics

4. **Basic UI Components**
   - Header with game stats
   - Generate business button
   - Simple business list view

5. **Save System**
   - localStorage save/load functionality
   - Auto-save every 10 seconds

### Phase 2: Business Management (Week 3-4)
**Goal**: Full business lifecycle management

#### Tasks:
1. **Business Components**
   - Business card component
   - Price adjustment controls
   - Shutdown functionality

2. **Performance Calculations**
   - MAU growth algorithms
   - Revenue/cost calculations
   - Profit tracking

3. **AI Model System**
   - Model selection/upgrade UI
   - Cost validation
   - Model tier effects

4. **Enhanced UI**
   - Tabbed business interface
   - Better stat visualization
   - Payment deadline warnings

### Phase 3: Polish & Features (Week 5-6)
**Goal**: Complete game experience

#### Tasks:
1. **Visual Evolution System**
   - Vibe level calculation
   - Dynamic styling based on success
   - Vaporwave aesthetic implementation

2. **Game Balance**
   - Tune difficulty curve
   - Balance AI model costs/benefits
   - Optimize business generation

3. **Advanced Features**
   - Business portfolio analytics
   - Historical performance tracking
   - Achievement system (optional)

4. **Performance Optimization**
   - Efficient re-rendering
   - Memory management for long play sessions
   - Background tab handling

## 7. Implementation Tasks for Claude Code

**Testing Requirements**: For each task, write comprehensive tests that verify all described functionality. Use Jest and React Testing Library. After implementing features, run all tests and fix any failures immediately. If linting errors occur, resolve them completely before proceeding. Re-run tests after fixes to ensure everything passes. Do not consider a task complete until all tests pass and code has no linting errors.

### Task 1: Project Foundation
```
Create a new React + TypeScript project with Vite. Set up the basic folder structure with components, stores, types, and utils directories. Install Zustand for state management and testing dependencies (Jest, React Testing Library, @testing-library/jest-dom). Configure ESLint and Prettier. Create a basic App.tsx that renders "Vibe Coder" as a placeholder. Write tests for App component rendering. Run all tests and fix any setup issues.
```

### Task 2: Core Game Store
```
Implement the main Zustand game store with initial state for cash ($40), current date, AI model (Sloppy Copy), and empty businesses array. Add a time progression system that updates the current date in real-time and processes business revenue/costs. Create comprehensive tests for store initialization, state updates, and time progression. Ensure all store actions work correctly and state persists as expected.
```

### Task 3: Business Generation
```
Create a business generator that creates random businesses with usefulness, fun, and operating costs based on the current AI model quality. Implement cooldown system and failure rate mechanics. Add a generate button that respects cooldowns and shows remaining time. Write tests for business generation logic, cooldown mechanics, failure rate calculations, and button states. Verify that generated businesses have correct properties based on AI model quality.
```

### Task 4: Business Management UI
```
Create components for displaying businesses in a tabbed interface. Each business should show its stats, allow price adjustment, and have a shutdown button. Calculate and display MAUs, revenue, and profit in real-time. Write tests for component rendering, user interactions (price changes, shutdown), calculations accuracy, and real-time updates. Test edge cases like empty business lists and invalid price inputs.
```

### Task 5: AI Model System
```
Implement the AI model upgrade system with the 7-tier structure. Add validation to ensure player can afford upgrades. Update generation mechanics to use current model's quality, cooldown, and failure rate. Create tests for model upgrade validation, cost checking, property updates, and integration with business generation. Verify that model changes affect generation behavior correctly.
```

### Task 6: Save System
```
Implement localStorage save/load functionality that automatically saves game state every 10 seconds. Handle edge cases like corrupted saves and version compatibility. Write tests for save/load operations, auto-save timing, error handling with corrupted data, and state restoration accuracy. Mock localStorage for testing and verify graceful degradation when storage is unavailable.
```

### Task 7: Visual Evolution
```
Create a vibe level system that increases based on total profit/cash. Implement dynamic styling that evolves from plain HTML to vaporwave aesthetics as the player becomes more successful. Write tests for vibe level calculations, style changes at different thresholds, and visual progression. Test that styling updates correctly when game state changes and verify performance of style transitions.
```

## 8. Success Metrics

### Core Metrics
- **Time to First Profitable Business**: Target < 2 minutes
- **Failure Rate**: Target 60% reach $1K, 30% reach $10K

### Balancing Targets
- **Starting Difficulty**: Player should struggle initially but feel progression
- **Mid-Game Scaling**: Exponential growth without becoming trivial
- **End-Game Content**: Meaningful progression even at high levels

## 9. Future Enhancements

### Potential Features
- **Prestige System**: Reset progress for permanent bonuses
- **Business Categories**: Different types of internet businesses
- **Market Events**: Random events that affect all businesses
- **Achievements**: Goals and milestones for progression
- **Multiplayer**: Leaderboards or competitive elements

### Technical Improvements
- **Performance**: Handle 100+ businesses efficiently

---

**Document Version**: 1.0  
**Last Updated**: July 3, 2025  
**Status**: Ready for Development