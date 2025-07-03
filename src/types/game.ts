import type { Dayjs } from 'dayjs';

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
  createdAt: Dayjs;
  isActive: boolean;
}

export interface GameState {
  cash: number;
  currentDate: Dayjs;
  gameStartDate: Dayjs;
  lastPaymentDate: Dayjs;
  nextPaymentDate: Dayjs;
  currentAIModel: AIModel;
  businesses: Business[];
  generationCooldown: number;
  lastGenerationTime: Dayjs;
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
  code: string
  message: string
  context?: Record<string, unknown>
  timestamp: Date
}

export interface BusinessGenerationError extends GameError {
  aiModel: AIModel;
  attemptCount: number;
  cooldownRemaining: number;
}

export const GamePhase = {
  EARLY: 'early',
  GROWING: 'growing',
  SCALING: 'scaling',
  ENDGAME: 'endgame'
} as const

export type GamePhase = typeof GamePhase[keyof typeof GamePhase]

export const VibeLevel = {
  BROKE: 0,
  BASIC: 1,
  COLORFUL: 2,
  VAPORWAVE: 3,
  PREMIUM: 4
} as const

export type VibeLevel = typeof VibeLevel[keyof typeof VibeLevel]