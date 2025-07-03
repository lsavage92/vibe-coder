export interface AIModel {
  id: string;
  name: string;
  monthlyCost: number;
  qualityLevel: number;
  cooldownSeconds: number;
  failureRate: number;
}

export interface Business {
  id: string;
  name: string;
  description: string;
  usefulness: number;
  fun: number;
  operatingCost: number;
  price: number;
  maus: number;
  createdAt: Date;
  isActive: boolean;
}

export interface GameState {
  cash: number;
  currentDate: Date;
  gameStartDate: Date;
  lastPaymentDate: Date;
  nextPaymentDate: Date;
  currentAIModel: AIModel;
  businesses: Business[];
  generationCooldown: number;
  lastGenerationTime: Date;
}

export interface GameConfig {
  startingCash: number;
  paymentCycleMonths: number;
  maxBusinessLimit?: number;
  vibeThresholds: number[];
}

export interface AIModelTier {
  tier: number;
  model: AIModel;
  unlockRequirement?: number;
}

export interface BusinessMetrics {
  revenue: number;
  profit: number;
  growthRate: number;
  profitMargin: number;
}

export type GameEvent = 
  | { type: 'BUSINESS_GENERATED'; business: Business }
  | { type: 'BUSINESS_SHUTDOWN'; businessId: string }
  | { type: 'AI_MODEL_UPGRADED'; newModel: AIModel }
  | { type: 'PAYMENT_PROCESSED'; amount: number }
  | { type: 'GAME_OVER'; reason: string };

export interface GameError {
  code: string;
  message: string;
  context?: Record<string, any>;
  timestamp: Date;
}

export interface BusinessGenerationError extends GameError {
  aiModel: AIModel;
  attemptCount: number;
  cooldownRemaining: number;
}

export enum GamePhase {
  EARLY = 'early',
  GROWING = 'growing',
  SCALING = 'scaling',
  ENDGAME = 'endgame'
}

export enum VibeLevel {
  BROKE = 0,
  BASIC = 1,
  COLORFUL = 2,
  VAPORWAVE = 3,
  PREMIUM = 4
}