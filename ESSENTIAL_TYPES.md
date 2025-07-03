# Essential Types - Vibe Coder

## Core Game Types (Implemented)

### AIModel Interface
```typescript
interface AIModel {
    id: string                    // Unique identifier (e.g., "sloppy-copy")
    name: string                  // Display name (e.g., "Sloppy Copy")
    monthlyCost: number          // Monthly subscription cost in USD
    qualityLevel: number         // 0-100, affects business generation quality
    cooldownSeconds: number      // Time between business generations
    failureRate: number          // 0-100, chance of generation failure
}
```

### Business Interface
```typescript
import type { Dayjs } from 'dayjs'

interface Business {
    id: string                   // Unique identifier
    name: string                 // Business name (AI-generated)
    description: string          // Business description (AI-generated)
    
    // Fixed traits (AI-generated)
    usefulness: number           // 0-100, affects user adoption
    fun: number                  // 0-100, affects user retention
    operatingCost: number        // Base monthly operating cost
    
    // Player-controlled traits
    price: number                // Monthly subscription price ($1 - $1B)
    
    // Dynamic traits (calculated)
    maus: number                 // Monthly Active Users
    createdAt: Dayjs            // When business was created (dayjs object)
    isActive: boolean           // Whether business is running
}
```

### GameState Interface
```typescript
import type { Dayjs } from 'dayjs'

interface GameState {
    // Core resources
    cash: number                 // Current money (USD) - starts at $40
    
    // Time management (all dayjs objects)
    currentDate: Dayjs          // Current game date
    gameStartDate: Dayjs        // When game started
    lastPaymentDate: Dayjs      // Last AI subscription payment
    nextPaymentDate: Dayjs      // Next AI subscription payment
    
    // AI and businesses
    currentAIModel: AIModel     // Currently active AI model (Sloppy Copy)
    businesses: Business[]       // Array of all businesses
    
    // Generation mechanics
    generationCooldown: number  // Remaining cooldown (seconds)
    lastGenerationTime: Dayjs   // When last generation occurred
}
```

### GameStore Interface (Complete Implementation)
```typescript
interface GameStore extends GameState {
    // Real-time system
    timeProgressionInterval: number | null
    
    // Core actions
    generateBusiness: () => void
    updateBusinessPrice: (id: string, price: number) => void
    shutdownBusiness: (id: string) => void
    upgradeAIModel: () => void               // Placeholder for Task 4
    processTimeStep: () => void
    
    // Lifecycle actions
    initializeGame: () => void
    startTimeProgression: () => void
    stopTimeProgression: () => void
}
```

### Constants (Implemented)
```typescript
const SLOPPY_COPY_AI: AIModel = {
    id: 'sloppy-copy',
    name: 'Sloppy Copy',
    monthlyCost: 10,
    qualityLevel: 20,
    cooldownSeconds: 60,
    failureRate: 30
}

const MAX_BUSINESS_PRICE = 1000000000 // 1 billion
```

## Business Logic Types (Implemented)

### BusinessCalculations Interface
```typescript
interface BusinessCalculations {
    baseGrowthRate: number      // (usefulness + fun) / 2
    priceImpact: number         // Price sensitivity factor
    qualityMultiplier: number   // AI model quality effect
    targetMAUs: number          // Calculated MAU target
    monthlyRevenue: number      // MAUs * price
    monthlyProfit: number       // Revenue - operating costs
}
```

### Revenue Calculation Logic
```typescript
// Implemented in gameStore.ts
const calculateMAUs = (business: Business, qualityMultiplier: number): number => {
    const baseGrowthRate = (business.usefulness + business.fun) / 2
    const priceImpact = Math.max(0.1, 1 - (business.price / 100))
    const growth = baseGrowthRate * priceImpact * qualityMultiplier
    return Math.floor(growth * 10)
}

// Daily profit calculation
const monthlyProfit = totalRevenue - totalOperatingCosts
const dailyProfit = monthlyProfit / 30
```

## Testing Types (Global Setup)

### Math Mock Configuration
```typescript
// setupTests.ts - Global test configuration
const mockMath = Object.create(globalThis.Math)
mockMath.random = () => 0.5 // Ensures generation succeeds (50% > 30% failure rate)
globalThis.Math = mockMath
```

## Validation Types (Implemented)

### Price Validation Logic
```typescript
// Implemented in gameStore.ts
const validatedPrice = Math.max(1, Math.min(MAX_BUSINESS_PRICE, price))

// Price bounds
const MIN_PRICE = 1              // $1 minimum
const MAX_PRICE = 1000000000     // $1 billion maximum
```

## Game Mechanics (Implemented)

### Time Progression System
- **Interval**: 1 second updates
- **Revenue**: Daily profit added each tick (monthly profit / 30)
- **Payments**: Monthly AI subscription costs
- **Cooldowns**: Generation cooldown decreases over time

### Business Generation Rules
- **Failure Rate**: 30% chance to fail (Sloppy Copy AI)
- **Cooldown**: 60 seconds between attempts
- **Quality Impact**: AI quality affects business traits
- **Random Traits**: usefulness, fun, operating costs vary by AI quality

## Future Types (Pending Implementation)

### UIState Interface (Task 3)
```typescript
interface UIState {
    vibeLevel: number           // 0-100, drives visual styling
    activeTab: string           // Currently selected business tab
    showUpgradeModal: boolean   // Whether upgrade modal is open
    setActiveTab: (tab: string) => void
    updateVibeLevel: (level: number) => void
    setShowUpgradeModal: (show: boolean) => void
}
```

### Save System Types (Task 5)
```typescript
interface SaveData {
    version: string             // Save file version
    gameState: GameState        // Complete game state
    uiState: UIState           // UI preferences
    timestamp: Dayjs           // When save was created
    checksum?: string          // Optional data integrity check
}
```

### AI Model Tiers (Task 4)
```typescript
interface AIModelTier {
    tier: number                // 1-7 tier number
    model: AIModel             // The AI model for this tier
    unlockRequirement?: number  // Cash required to unlock
}
```
    
    // UI actions
    setActiveTab: (tab: string) => void
    updateVibeLevel: (level: number) => void
    setShowUpgradeModal: (show: boolean) => void
}
```

## Configuration Types

### GameConfig Interface
```typescript
interface GameConfig {
    // Starting conditions
    startingCash: number        // Initial money amount
    paymentCycleMonths: number  // How often AI costs are charged
    
    // Game limits
    maxBusinessLimit?: number   // Optional limit on total businesses
    
    // Visual evolution thresholds
    vibeThresholds: number[]    // Cash amounts that trigger visual upgrades
}
```

### AIModelTier Type
```typescript
interface AIModelTier {
    tier: number                // 1-7 tier number
    model: AIModel             // The AI model for this tier
    unlockRequirement?: number  // Cash required to unlock
}
```

## Utility Types

### BusinessMetrics Interface
```typescript
interface BusinessMetrics {
    revenue: number             // Monthly revenue (MAUs * price)
    profit: number              // Monthly profit (revenue - operating costs)
    growthRate: number          // MAU growth rate percentage
    profitMargin: number        // Profit margin percentage
}
```

### GameEvent Type
```typescript
type GameEvent = 
    | { type: 'BUSINESS_GENERATED'; business: Business }
    | { type: 'BUSINESS_SHUTDOWN'; businessId: string }
    | { type: 'AI_MODEL_UPGRADED'; newModel: AIModel }
    | { type: 'PAYMENT_PROCESSED'; amount: number }
    | { type: 'GAME_OVER'; reason: string }
```

### SaveData Interface
```typescript
interface SaveData {
    version: string             // Save file version
    gameState: GameState        // Complete game state
    uiState: UIState           // UI preferences
    timestamp: Date            // When save was created
    checksum?: string          // Optional data integrity check
}
```

## Calculated Types

### BusinessCalculations Interface
```typescript
interface BusinessCalculations {
    // MAU calculation factors
    baseGrowthRate: number      // (usefulness + fun) / 2
    priceImpact: number         // Price sensitivity factor
    qualityMultiplier: number   // AI model quality effect
    
    // Results
    targetMAUs: number          // Calculated MAU target
    monthlyRevenue: number      // MAUs * price
    monthlyProfit: number       // Revenue - operating costs
}
```

### TimeCalculations Interface
```typescript
interface TimeCalculations {
    // Time differences
    daysSinceStart: number      // Days since game started
    daysSinceLastPayment: number // Days since last AI payment
    daysUntilNextPayment: number // Days until next AI payment
    
    // Cooldown status
    cooldownRemaining: number   // Seconds until next generation allowed
    canGenerate: boolean        // Whether generation is available
}
```

## Validation Types

### ValidationResult Interface
```typescript
interface ValidationResult {
    isValid: boolean            // Whether validation passed
    errors: string[]           // Array of error messages
    warnings: string[]         // Array of warning messages
}
```

### PriceValidation Interface
```typescript
interface PriceValidation extends ValidationResult {
    suggestedPrice?: number     // Recommended price if invalid
    priceRange: {
        min: number             // Minimum viable price
        max: number             // Maximum reasonable price
    }
}
```

## Constants and Enums

### GamePhase Enum
```typescript
enum GamePhase {
    EARLY = 'early',           // Starting phase
    GROWING = 'growing',       // Building portfolio
    SCALING = 'scaling',       // Optimizing operations
    ENDGAME = 'endgame'        // High-level play
}
```

### VibeLevel Enum
```typescript
enum VibeLevel {
    BROKE = 0,                 // Plain HTML styling
    BASIC = 1,                 // Subtle gradients
    COLORFUL = 2,              // Vibrant colors
    VAPORWAVE = 3,             // Full aesthetic
    PREMIUM = 4                // Advanced effects
}
```

## Error Types

### GameError Interface
```typescript
interface GameError {
    code: string               // Error code (e.g., 'INSUFFICIENT_FUNDS')
    message: string            // Human-readable error message
    context?: Record<string, any> // Additional error context
    timestamp: Date            // When error occurred
}
```

### BusinessGenerationError extends GameError
```typescript
interface BusinessGenerationError extends GameError {
    aiModel: AIModel           // Which AI model failed
    attemptCount: number       // How many times generation was attempted
    cooldownRemaining: number  // Remaining cooldown time
}
```

## Future Extension Types

### Achievement Interface (Future)
```typescript
interface Achievement {
    id: string                 // Unique identifier
    name: string               // Achievement name
    description: string        // Achievement description
    icon: string               // Icon identifier
    unlockedAt?: Date         // When achievement was unlocked
    progress: number           // 0-100 progress percentage
    requirements: Record<string, any> // Achievement requirements
}
```

### MarketEvent Interface (Future)
```typescript
interface MarketEvent {
    id: string                 // Unique identifier
    name: string               // Event name
    description: string        // Event description
    effects: {
        revenueMultiplier?: number     // Revenue impact
        costMultiplier?: number        // Cost impact
        mauMultiplier?: number         // MAU impact
    }
    duration: number           // Duration in days
    startDate: Date           // When event starts
}
```