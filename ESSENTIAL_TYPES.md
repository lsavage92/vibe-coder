# Essential Types - Vibe Coder

## Core Game Types

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
interface Business {
    id: string                   // Unique identifier
    name: string                 // Business name (AI-generated)
    description: string          // Business description (AI-generated)
    
    // Fixed traits (AI-generated)
    usefulness: number           // 0-100, affects user adoption
    fun: number                  // 0-100, affects user retention
    operatingCost: number        // Base monthly operating cost
    
    // Player-controlled traits
    price: number                // Monthly subscription price
    
    // Dynamic traits (calculated)
    maus: number                 // Monthly Active Users
    createdAt: Date             // When business was created
    isActive: boolean           // Whether business is running
}
```

### GameState Interface
```typescript
interface GameState {
    // Core resources
    cash: number                 // Current money (USD)
    
    // Time management
    currentDate: Date           // Current game date
    gameStartDate: Date         // When game started
    lastPaymentDate: Date       // Last AI subscription payment
    nextPaymentDate: Date       // Next AI subscription payment
    
    // AI and businesses
    currentAIModel: AIModel     // Currently active AI model
    businesses: Business[]       // Array of all businesses
    
    // Generation mechanics
    generationCooldown: number  // Remaining cooldown (seconds)
    lastGenerationTime: Date    // When last generation occurred
    
    // Game actions
    generateBusiness: () => void
    updateBusinessPrice: (id: string, price: number) => void
    shutdownBusiness: (id: string) => void
    upgradeAIModel: (modelId: string) => void
    processTimeStep: () => void
}
```

## UI State Types

### UIState Interface
```typescript
interface UIState {
    // Visual evolution
    vibeLevel: number           // 0-100, drives visual styling
    
    // Interface state
    activeTab: string           // Currently selected business tab
    showUpgradeModal: boolean   // Whether upgrade modal is open
    
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