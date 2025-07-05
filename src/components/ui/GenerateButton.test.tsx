import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { GenerateButton } from './GenerateButton'
import { useGameStore } from '../../stores/gameStore'

// Mock the gameStore
jest.mock('../../stores/gameStore', () => ({
  useGameStore: jest.fn()
}))

const mockUseGameStore = useGameStore as jest.MockedFunction<typeof useGameStore>

describe('GenerateButton', () => {
  const mockGenerateBusiness = jest.fn()
  
  const defaultStoreState = {
    generateBusiness: mockGenerateBusiness,
    generationCooldown: 0,
    currentAIModel: {
      id: 'sloppy-copy',
      name: 'Sloppy Copy',
      monthlyCost: 10,
      qualityLevel: 20,
      cooldownSeconds: 60,
      failureRate: 30
    },
    cash: 40,
    businesses: []
  }

  beforeEach(() => {
    cleanup()
    jest.clearAllMocks()
    mockUseGameStore.mockReturnValue(defaultStoreState)
  })

  afterEach(() => {
    cleanup()
  })

  describe('Button Rendering', () => {
    it('renders generate button when cooldown is 0', () => {
      render(<GenerateButton />)
      
      const button = screen.getByTestId('generate-button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Generate Business')
      expect(button).not.toBeDisabled()
    })

    it('renders cooldown button when cooldown is active', () => {
      mockUseGameStore.mockReturnValue({
        ...defaultStoreState,
        generationCooldown: 45
      })
      
      render(<GenerateButton />)
      
      const button = screen.getByTestId('generate-button')
      expect(button).toHaveTextContent('Cooldown: 45s')
      expect(button).toBeDisabled()
    })

    it('displays AI model information correctly', () => {
      render(<GenerateButton />)
      
      const aiModelInfo = screen.getByTestId('ai-model-info')
      expect(aiModelInfo).toHaveTextContent('Model: Sloppy Copy | Failure Rate: 30%')
      
      const cooldownInfo = screen.getByTestId('cooldown-info')
      expect(cooldownInfo).toHaveTextContent('Cooldown: 60s | Quality: 20%')
    })

    it('displays cash information correctly', () => {
      render(<GenerateButton />)
      
      const cashInfo = screen.getByTestId('cash-info')
      expect(cashInfo).toHaveTextContent('Cash: $40.00')
    })

    it('displays cash with decimal precision', () => {
      mockUseGameStore.mockReturnValue({
        ...defaultStoreState,
        cash: 123.456
      })
      
      render(<GenerateButton />)
      
      const cashInfo = screen.getByTestId('cash-info')
      expect(cashInfo).toHaveTextContent('Cash: $123.46')
    })
  })

  describe('Button Interactions', () => {
    it('calls generateBusiness when button is clicked and cooldown is 0', () => {
      render(<GenerateButton />)
      
      const button = screen.getByTestId('generate-button')
      fireEvent.click(button)
      
      expect(mockGenerateBusiness).toHaveBeenCalledTimes(1)
    })

    it('does not call generateBusiness when button is clicked during cooldown', () => {
      mockUseGameStore.mockReturnValue({
        ...defaultStoreState,
        generationCooldown: 30
      })
      
      render(<GenerateButton />)
      
      const button = screen.getByTestId('generate-button')
      fireEvent.click(button)
      
      expect(mockGenerateBusiness).not.toHaveBeenCalled()
    })

    it('handles multiple clicks when cooldown is 0', () => {
      render(<GenerateButton />)
      
      const button = screen.getByTestId('generate-button')
      fireEvent.click(button)
      fireEvent.click(button)
      fireEvent.click(button)
      
      expect(mockGenerateBusiness).toHaveBeenCalledTimes(3)
    })
  })

  describe('Button States', () => {
    it('shows enabled state when ready', () => {
      render(<GenerateButton />)
      
      const button = screen.getByTestId('generate-button')
      expect(button).toHaveClass('generate-button enabled')
      expect(button).not.toBeDisabled()
    })

    it('shows disabled state during cooldown', () => {
      mockUseGameStore.mockReturnValue({
        ...defaultStoreState,
        generationCooldown: 15
      })
      
      render(<GenerateButton />)
      
      const button = screen.getByTestId('generate-button')
      expect(button).toHaveClass('generate-button disabled')
      expect(button).toBeDisabled()
    })
  })

  describe('Cooldown Display', () => {
    it('shows "Ready" when cooldown is 0', () => {
      render(<GenerateButton />)
      
      const button = screen.getByTestId('generate-button')
      expect(button).toHaveTextContent('Generate Business')
      expect(button).not.toHaveTextContent('Ready')
    })

    it('shows seconds remaining during cooldown', () => {
      const testCases = [1, 5, 30, 59, 60]
      
      testCases.forEach(cooldown => {
        cleanup() // Clean up before each render
        
        mockUseGameStore.mockReturnValue({
          ...defaultStoreState,
          generationCooldown: cooldown
        })
        
        render(<GenerateButton />)
        
        const button = screen.getByTestId('generate-button')
        expect(button).toHaveTextContent(`Cooldown: ${cooldown}s`)
        
        cleanup() // Clean up after each test
      })
    })
  })

  describe('AI Model Information Display', () => {
    it('displays different AI model stats correctly', () => {
      const customAIModel = {
        id: 'test-model',
        name: 'Test Model',
        monthlyCost: 100,
        qualityLevel: 75,
        cooldownSeconds: 30,
        failureRate: 15
      }
      
      mockUseGameStore.mockReturnValue({
        ...defaultStoreState,
        currentAIModel: customAIModel
      })
      
      render(<GenerateButton />)
      
      const aiModelInfo = screen.getByTestId('ai-model-info')
      expect(aiModelInfo).toHaveTextContent('Model: Test Model | Failure Rate: 15%')
      
      const cooldownInfo = screen.getByTestId('cooldown-info')
      expect(cooldownInfo).toHaveTextContent('Cooldown: 30s | Quality: 75%')
    })
  })

  describe('Component Structure', () => {
    it('renders all required test elements', () => {
      render(<GenerateButton />)
      
      expect(screen.getByTestId('generate-button-container')).toBeInTheDocument()
      expect(screen.getByTestId('generate-button')).toBeInTheDocument()
      expect(screen.getByTestId('generation-info')).toBeInTheDocument()
      expect(screen.getByTestId('ai-model-info')).toBeInTheDocument()
      expect(screen.getByTestId('cooldown-info')).toBeInTheDocument()
      expect(screen.getByTestId('cash-info')).toBeInTheDocument()
      expect(screen.getByTestId('business-count')).toBeInTheDocument()
    })
  })

  describe('Business Count Display', () => {
    it('displays current business count', () => {
      mockUseGameStore.mockReturnValue({
        ...defaultStoreState,
        businesses: [
          { id: '1', name: 'Test Business 1' },
          { id: '2', name: 'Test Business 2' }
        ]
      })
      
      render(<GenerateButton />)
      
      const businessCount = screen.getByTestId('business-count')
      expect(businessCount).toHaveTextContent('Businesses: 2')
    })

    it('displays zero businesses when none exist', () => {
      render(<GenerateButton />)
      
      const businessCount = screen.getByTestId('business-count')
      expect(businessCount).toHaveTextContent('Businesses: 0')
    })
  })

  describe('Progress Bar', () => {
    it('shows progress bar during cooldown', () => {
      mockUseGameStore.mockReturnValue({
        ...defaultStoreState,
        generationCooldown: 30 // 30 seconds remaining out of 60
      })
      
      render(<GenerateButton />)
      
      const progressBar = screen.getByTestId('generate-button').querySelector('.progress-bar')
      expect(progressBar).toBeInTheDocument()
      expect(progressBar).toHaveStyle({ width: '50%' }) // (60-30)/60 = 50%
    })

    it('does not show progress bar when ready', () => {
      render(<GenerateButton />)
      
      const progressBar = screen.getByTestId('generate-button').querySelector('.progress-bar')
      expect(progressBar).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<GenerateButton />)
      
      const button = screen.getByTestId('generate-button')
      expect(button).toHaveAttribute('aria-label', 'Generate new business')
      expect(button).toHaveAttribute('aria-describedby', 'generation-info')
    })

    it('updates ARIA label during cooldown', () => {
      mockUseGameStore.mockReturnValue({
        ...defaultStoreState,
        generationCooldown: 30
      })
      
      render(<GenerateButton />)
      
      const button = screen.getByTestId('generate-button')
      expect(button).toHaveAttribute('aria-label', 'Cooldown: 30s')
    })
  })
})