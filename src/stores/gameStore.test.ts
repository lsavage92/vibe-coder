import { renderHook, act } from '@testing-library/react';
import dayjs from 'dayjs';
import { useGameStore, SLOPPY_COPY_AI, MAX_BUSINESS_PRICE } from './gameStore';

jest.useFakeTimers();

describe('GameStore', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useGameStore());
    act(() => {
      result.current.initializeGame();
    });
  });

  afterEach(() => {
    const { result } = renderHook(() => useGameStore());
    act(() => {
      result.current.stopTimeProgression();
    });
  });

  describe('Store Initialization', () => {
    it('should initialize with correct initial state', () => {
      const { result } = renderHook(() => useGameStore());
      
      expect(result.current.cash).toBe(40);
      expect(result.current.currentAIModel).toEqual(SLOPPY_COPY_AI);
      expect(result.current.businesses).toEqual([]);
      expect(result.current.generationCooldown).toBe(0);
      expect(dayjs.isDayjs(result.current.currentDate)).toBe(true);
      expect(dayjs.isDayjs(result.current.gameStartDate)).toBe(true);
      expect(dayjs.isDayjs(result.current.lastPaymentDate)).toBe(true);
      expect(dayjs.isDayjs(result.current.nextPaymentDate)).toBe(true);
      expect(dayjs.isDayjs(result.current.lastGenerationTime)).toBe(true);
    });

    it('should set next payment date to one month from start', () => {
      const { result } = renderHook(() => useGameStore());
      
      const gameStart = result.current.gameStartDate;
      const nextPayment = result.current.nextPaymentDate;
      const expectedDate = gameStart.add(1, 'month');
      
      expect(nextPayment.month()).toBe(expectedDate.month());
    });

    it('should reset game state when initializeGame is called', () => {
      const { result } = renderHook(() => useGameStore());
      
      act(() => {
        result.current.generateBusiness();
      });
      
      expect(result.current.businesses.length).toBeGreaterThan(0);
      
      act(() => {
        result.current.initializeGame();
      });
      
      expect(result.current.cash).toBe(40);
      expect(result.current.businesses).toEqual([]);
      expect(result.current.generationCooldown).toBe(0);
    });
  });

  describe('Business Generation', () => {
    it('should generate a business with valid properties', () => {
      const { result } = renderHook(() => useGameStore());
      
      act(() => {
        result.current.generateBusiness();
      });
      
      expect(result.current.businesses.length).toBeGreaterThan(0);
      
      const business = result.current.businesses[0];
      expect(business.id).toBeDefined();
      expect(business.name).toBeDefined();
      expect(business.description).toBeDefined();
      expect(business.usefulness).toBeGreaterThan(0);
      expect(business.fun).toBeGreaterThan(0);
      expect(business.operatingCost).toBeGreaterThan(0);
      expect(business.price).toBe(10);
      expect(business.maus).toBeGreaterThanOrEqual(0);
      expect(business.isActive).toBe(true);
      expect(dayjs.isDayjs(business.createdAt)).toBe(true);
    });

    it('should set cooldown after generation', () => {
      const { result } = renderHook(() => useGameStore());
      
      act(() => {
        result.current.generateBusiness();
      });
      
      expect(result.current.generationCooldown).toBe(SLOPPY_COPY_AI.cooldownSeconds);
    });

    it('should not generate business when on cooldown', () => {
      const { result } = renderHook(() => useGameStore());
      
      act(() => {
        result.current.generateBusiness();
      });
      
      const initialBusinessCount = result.current.businesses.length;
      
      act(() => {
        result.current.generateBusiness();
      });
      
      expect(result.current.businesses.length).toBe(initialBusinessCount);
    });
  });

  describe('Business Management', () => {
    it('should update business price correctly', () => {
      const { result } = renderHook(() => useGameStore());
      
      act(() => {
        result.current.generateBusiness();
      });
      
      expect(result.current.businesses.length).toBeGreaterThan(0);
      
      const businessId = result.current.businesses[0].id;
      const newPrice = 25;
      
      act(() => {
        result.current.updateBusinessPrice(businessId, newPrice);
      });
      
      const updatedBusiness = result.current.businesses.find(b => b.id === businessId);
      expect(updatedBusiness).toBeDefined();
      expect(updatedBusiness?.price).toBe(newPrice);
    });

    it('should validate price bounds', () => {
      const { result } = renderHook(() => useGameStore());
      
      act(() => {
        result.current.generateBusiness();
      });
      
      expect(result.current.businesses.length).toBeGreaterThan(0);
      
      const businessId = result.current.businesses[0].id;
      
      act(() => {
        result.current.updateBusinessPrice(businessId, -10);
      });
      
      let updatedBusiness = result.current.businesses.find(b => b.id === businessId);
      expect(updatedBusiness).toBeDefined();
      expect(updatedBusiness?.price).toBe(1);
      
      act(() => {
        result.current.updateBusinessPrice(businessId, MAX_BUSINESS_PRICE + 1000);
      });
      
      updatedBusiness = result.current.businesses.find(b => b.id === businessId);
      expect(updatedBusiness).toBeDefined();
      expect(updatedBusiness?.price).toBe(MAX_BUSINESS_PRICE);
    });

    it('should shutdown business correctly', () => {
      const { result } = renderHook(() => useGameStore());
      
      act(() => {
        result.current.generateBusiness();
      });
      
      expect(result.current.businesses.length).toBeGreaterThan(0);
      
      const businessId = result.current.businesses[0].id;
      
      act(() => {
        result.current.shutdownBusiness(businessId);
      });
      
      const shutdownBusiness = result.current.businesses.find(b => b.id === businessId);
      expect(shutdownBusiness).toBeDefined();
      expect(shutdownBusiness?.isActive).toBe(false);
    });
  });

  describe('Time Progression', () => {
    it('should update current date when processTimeStep is called', () => {
      const { result } = renderHook(() => useGameStore());
      
      const initialDate = result.current.currentDate;
      
      act(() => {
        jest.advanceTimersByTime(1000);
        result.current.processTimeStep();
      });
      
      expect(result.current.currentDate.isAfter(initialDate)).toBe(true);
    });

    it('should reduce cooldown over time', () => {
      const { result } = renderHook(() => useGameStore());
      
      act(() => {
        result.current.generateBusiness();
      });
      
      const initialCooldown = result.current.generationCooldown;
      
      act(() => {
        jest.advanceTimersByTime(5000);
        result.current.processTimeStep();
      });
      
      expect(result.current.generationCooldown).toBeLessThan(initialCooldown);
    });

    it('should calculate revenue from active businesses', () => {
      const { result } = renderHook(() => useGameStore());
      
      act(() => {
        result.current.generateBusiness();
      });
      
      expect(result.current.businesses.length).toBeGreaterThan(0);
      
      const initialCash = result.current.cash;
      const business = result.current.businesses[0];
      
      act(() => {
        jest.advanceTimersByTime(1000);
        result.current.processTimeStep();
      });
      
      const expectedRevenue = business.maus * business.price;
      const expectedOperatingCost = business.operatingCost;
      const expectedDailyProfit = (expectedRevenue - expectedOperatingCost) / 30;
      const expectedCash = initialCash + expectedDailyProfit;
      
      expect(result.current.cash).toBe(expectedCash);
    });

    it('should process AI model payments', () => {
      const { result } = renderHook(() => useGameStore());
      
      const futureDate = dayjs().add(2, 'month');
      
      act(() => {
        result.current.initializeGame();
      });
      
      const initialCash = result.current.cash;
      
      jest.setSystemTime(futureDate.toDate());
      
      act(() => {
        result.current.processTimeStep();
      });
      
      expect(result.current.cash).toBe(initialCash - SLOPPY_COPY_AI.monthlyCost);
    });
  });

  describe('Time Progression System', () => {
    it('should start and stop time progression', () => {
      const { result } = renderHook(() => useGameStore());
      
      act(() => {
        result.current.startTimeProgression();
      });
      
      expect(result.current.timeProgressionInterval).not.toBeNull();
      
      act(() => {
        result.current.stopTimeProgression();
      });
      
      expect(result.current.timeProgressionInterval).toBeNull();
    });

    it('should automatically call processTimeStep when time progression is active', () => {
      const { result } = renderHook(() => useGameStore());
      
      const initialDate = result.current.currentDate;
      
      act(() => {
        result.current.startTimeProgression();
      });
      
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      
      expect(result.current.currentDate.isAfter(initialDate)).toBe(true);
      
      act(() => {
        result.current.stopTimeProgression();
      });
    });
  });

  describe('State Persistence', () => {
    it('should maintain state between store calls', () => {
      const { result: result1 } = renderHook(() => useGameStore());
      
      act(() => {
        result1.current.generateBusiness();
      });
      
      const businessCount = result1.current.businesses.length;
      
      const { result: result2 } = renderHook(() => useGameStore());
      
      expect(result2.current.businesses.length).toBe(businessCount);
    });

    it('should maintain cash value between actions', () => {
      const { result } = renderHook(() => useGameStore());
      
      const initialCash = result.current.cash;
      
      act(() => {
        result.current.generateBusiness();
      });
      
      expect(result.current.cash).toBe(initialCash);
      
      act(() => {
        result.current.processTimeStep();
      });
      
      expect(typeof result.current.cash).toBe('number');
    });
  });

  describe('Date Handling', () => {
    it('should use dayjs objects for all date fields', () => {
      const { result } = renderHook(() => useGameStore());
      
      expect(dayjs.isDayjs(result.current.currentDate)).toBe(true);
      expect(dayjs.isDayjs(result.current.gameStartDate)).toBe(true);
      expect(dayjs.isDayjs(result.current.lastPaymentDate)).toBe(true);
      expect(dayjs.isDayjs(result.current.nextPaymentDate)).toBe(true);
      expect(dayjs.isDayjs(result.current.lastGenerationTime)).toBe(true);
    });

    it('should handle business createdAt as dayjs object', () => {
      const { result } = renderHook(() => useGameStore());
      
      act(() => {
        result.current.generateBusiness();
      });
      
      expect(result.current.businesses.length).toBeGreaterThan(0);
      expect(dayjs.isDayjs(result.current.businesses[0].createdAt)).toBe(true);
    });

    it('should properly compare dates in payment processing', () => {
      const { result } = renderHook(() => useGameStore());
      
      const futureDate = dayjs().add(1, 'month').add(1, 'day');
      jest.setSystemTime(futureDate.toDate());
      
      const initialCash = result.current.cash;
      
      act(() => {
        result.current.processTimeStep();
      });
      
      expect(result.current.cash).toBe(initialCash - SLOPPY_COPY_AI.monthlyCost);
      expect(dayjs.isDayjs(result.current.lastPaymentDate)).toBe(true);
      expect(dayjs.isDayjs(result.current.nextPaymentDate)).toBe(true);
    });
  });

  describe('Price Validation', () => {
    it('should enforce minimum price of 1', () => {
      const { result } = renderHook(() => useGameStore());
      
      act(() => {
        result.current.generateBusiness();
      });
      
      expect(result.current.businesses.length).toBeGreaterThan(0);
      
      const businessId = result.current.businesses[0].id;
      
      act(() => {
        result.current.updateBusinessPrice(businessId, 0);
      });
      
      const updatedBusiness = result.current.businesses.find(b => b.id === businessId);
      expect(updatedBusiness).toBeDefined();
      expect(updatedBusiness?.price).toBe(1);
    });

    it('should enforce maximum price of 1 billion', () => {
      const { result } = renderHook(() => useGameStore());
      
      act(() => {
        result.current.generateBusiness();
      });
      
      expect(result.current.businesses.length).toBeGreaterThan(0);
      
      const businessId = result.current.businesses[0].id;
      
      act(() => {
        result.current.updateBusinessPrice(businessId, MAX_BUSINESS_PRICE);
      });
      
      const updatedBusiness = result.current.businesses.find(b => b.id === businessId);
      expect(updatedBusiness).toBeDefined();
      expect(updatedBusiness?.price).toBe(MAX_BUSINESS_PRICE);
    });
  });
});