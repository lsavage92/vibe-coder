import { create } from 'zustand';
import dayjs from 'dayjs';
import type { AIModel, Business, GameState } from '../types/game';

interface GameActions {
  generateBusiness: () => void
  updateBusinessPrice: (id: string, price: number) => void
  shutdownBusiness: (id: string) => void
  upgradeAIModel: () => void
  processTimeStep: () => void
  initializeGame: () => void
  startTimeProgression: () => void
  stopTimeProgression: () => void
}

interface GameStore extends GameState, GameActions {
  timeProgressionInterval: number | null;
}

const SLOPPY_COPY_AI: AIModel = {
  id: 'sloppy-copy',
  name: 'Sloppy Copy',
  monthlyCost: 10,
  qualityLevel: 20,
  cooldownSeconds: 60,
  failureRate: 30
};

const MAX_BUSINESS_PRICE = 1000000000; // 1 billion

const createInitialState = (): GameState => {
  const now = dayjs();
  const nextPayment = now.add(1, 'month');

  return {
    cash: 40,
    currentDate: now,
    gameStartDate: now,
    lastPaymentDate: now,
    nextPaymentDate: nextPayment,
    currentAIModel: SLOPPY_COPY_AI,
    businesses: [],
    generationCooldown: 0,
    lastGenerationTime: now
  };
};

const generateBusinessName = (): string => {
  const prefixes = ['Quick', 'Smart', 'Easy', 'Super', 'Ultra', 'Mega', 'Pro', 'Fast'];
  const suffixes = ['Hub', 'Pro', 'Plus', 'Max', 'Zone', 'Spot', 'Lab', 'Works'];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  return `${prefix}${suffix}`;
};

const generateBusinessDescription = (name: string): string => {
  const templates = [
    `${name} revolutionizes how you manage your daily tasks`,
    `Experience the future of productivity with ${name}`,
    `${name} makes complex workflows simple and efficient`,
    `Transform your business operations with ${name}`,
    `${name} - the all-in-one solution for modern professionals`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
};

const calculateMAUs = (business: Business, qualityMultiplier: number): number => {
  const baseGrowthRate = (business.usefulness + business.fun) / 2;
  const priceImpact = Math.max(0.1, 1 - (business.price / 100));
  const growth = baseGrowthRate * priceImpact * qualityMultiplier;
  
  return Math.floor(growth * 10);
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...createInitialState(),
  timeProgressionInterval: null,

  initializeGame: () => {
    const state = get();
    if (state.timeProgressionInterval) {
      clearInterval(state.timeProgressionInterval);
    }
    set({ ...createInitialState(), timeProgressionInterval: null });
  },

  startTimeProgression: () => {
    const state = get();
    if (state.timeProgressionInterval) {
      clearInterval(state.timeProgressionInterval);
    }
    
    const interval = setInterval(() => {
      get().processTimeStep();
    }, 1000);
    
    set({ timeProgressionInterval: interval });
  },

  stopTimeProgression: () => {
    const state = get();
    if (state.timeProgressionInterval) {
      clearInterval(state.timeProgressionInterval);
      set({ timeProgressionInterval: null });
    }
  },

  generateBusiness: () => {
    const state = get();
    const now = dayjs();
    
    if (state.generationCooldown > 0) {
      return;
    }

    const failureRoll = Math.random() * 100;
    if (failureRoll < state.currentAIModel.failureRate) {
      set({
        generationCooldown: state.currentAIModel.cooldownSeconds,
        lastGenerationTime: now
      });
      return;
    }

    const qualityMultiplier = state.currentAIModel.qualityLevel / 100;
    const businessName = generateBusinessName();
    
    const newBusiness: Business = {
      id: crypto.randomUUID(),
      name: businessName,
      description: generateBusinessDescription(businessName),
      usefulness: Math.floor(Math.random() * 50) + 25 + (qualityMultiplier * 25),
      fun: Math.floor(Math.random() * 50) + 25 + (qualityMultiplier * 25),
      operatingCost: Math.floor(Math.random() * 200) + 50,
      price: 10,
      maus: 0,
      createdAt: now,
      isActive: true
    };

    newBusiness.maus = calculateMAUs(newBusiness, qualityMultiplier);

    set({
      businesses: [...state.businesses, newBusiness],
      generationCooldown: state.currentAIModel.cooldownSeconds,
      lastGenerationTime: now
    });
  },

  updateBusinessPrice: (id: string, price: number) => {
    const state = get();
    const validatedPrice = Math.max(1, Math.min(MAX_BUSINESS_PRICE, price));
    
    const updatedBusinesses = state.businesses.map(business => {
      if (business.id === id) {
        const updatedBusiness = { ...business, price: validatedPrice };
        const qualityMultiplier = state.currentAIModel.qualityLevel / 100;
        updatedBusiness.maus = calculateMAUs(updatedBusiness, qualityMultiplier);
        return updatedBusiness;
      }
      return business;
    });

    set({ businesses: updatedBusinesses });
  },

  shutdownBusiness: (id: string) => {
    const state = get();
    const updatedBusinesses = state.businesses.map(business =>
      business.id === id ? { ...business, isActive: false } : business
    );
    
    set({ businesses: updatedBusinesses });
  },

  upgradeAIModel: () => {
    console.log('AI model upgrade not implemented in Task 2')
  },

  processTimeStep: () => {
    const state = get();
    const now = dayjs();
    
    let newCash = state.cash;
    let newNextPaymentDate = state.nextPaymentDate;
    let newLastPaymentDate = state.lastPaymentDate;
    
    if (now.isAfter(state.nextPaymentDate) || now.isSame(state.nextPaymentDate)) {
      newCash -= state.currentAIModel.monthlyCost;
      newLastPaymentDate = now;
      newNextPaymentDate = now.add(1, 'month');
    }

    const activeBusinesses = state.businesses.filter(b => b.isActive);
    const totalRevenue = activeBusinesses.reduce((sum, business) => {
      return sum + (business.maus * business.price);
    }, 0);
    
    const totalOperatingCosts = activeBusinesses.reduce((sum, business) => {
      return sum + business.operatingCost;
    }, 0);

    const monthlyProfit = totalRevenue - totalOperatingCosts;
    const dailyProfit = monthlyProfit / 30;
    
    newCash += dailyProfit;

    const timeSinceLastGeneration = now.diff(state.lastGenerationTime, 'second');
    const newCooldown = Math.max(0, state.generationCooldown - timeSinceLastGeneration);

    set({
      currentDate: now,
      cash: Math.max(0, newCash),
      nextPaymentDate: newNextPaymentDate,
      lastPaymentDate: newLastPaymentDate,
      generationCooldown: newCooldown
    });
  }
}));

export { SLOPPY_COPY_AI, MAX_BUSINESS_PRICE };