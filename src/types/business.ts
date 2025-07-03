export interface BusinessCalculations {
  baseGrowthRate: number;
  priceImpact: number;
  qualityMultiplier: number;
  targetMAUs: number;
  monthlyRevenue: number;
  monthlyProfit: number;
}

export interface TimeCalculations {
  daysSinceStart: number;
  daysSinceLastPayment: number;
  daysUntilNextPayment: number;
  cooldownRemaining: number;
  canGenerate: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface PriceValidation extends ValidationResult {
  suggestedPrice?: number;
  priceRange: {
    min: number;
    max: number;
  };
}