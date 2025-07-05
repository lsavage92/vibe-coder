import React, { useCallback, useState, useEffect } from 'react'
import { useGameStore } from '../../stores/gameStore'
import './GenerateButton.css'

interface GenerateButtonProps {
  className?: string
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({ className }) => {
  const {
    generateBusiness,
    generationCooldown,
    currentAIModel,
    cash,
    businesses
  } = useGameStore()
  
  const [lastBusinessCount, setLastBusinessCount] = useState(0)
  const [generationFeedback, setGenerationFeedback] = useState<string>('')

  const canGenerate = generationCooldown === 0
  const cooldownText = generationCooldown > 0 ? `${generationCooldown}s` : 'Ready'
  const cooldownProgress = generationCooldown > 0 ? (currentAIModel.cooldownSeconds - generationCooldown) / currentAIModel.cooldownSeconds : 1

  const handleGenerate = useCallback(() => {
    if (canGenerate) {
      const prevCount = businesses.length
      generateBusiness()
      setLastBusinessCount(prevCount)
    }
  }, [canGenerate, generateBusiness, businesses.length])
  
  // Show generation feedback
  useEffect(() => {
    if (businesses.length > lastBusinessCount) {
      setGenerationFeedback('✓ Business generated!')
      const timer = setTimeout(() => setGenerationFeedback(''), 2000)
      return () => clearTimeout(timer)
    } else if (generationCooldown === currentAIModel.cooldownSeconds && businesses.length === lastBusinessCount) {
      setGenerationFeedback('✗ Generation failed')
      const timer = setTimeout(() => setGenerationFeedback(''), 2000)
      return () => clearTimeout(timer)
    }
  }, [businesses.length, lastBusinessCount, generationCooldown, currentAIModel.cooldownSeconds])

  const progressBarStyle: React.CSSProperties = {
    width: `${cooldownProgress * 100}%`
  }

  return (
    <div data-testid="generate-button-container" className={`generate-button-container ${className || ''}`}>
      <div className="generate-button-wrapper">
        <button
          data-testid="generate-button"
          onClick={handleGenerate}
          disabled={!canGenerate}
          className={`generate-button ${canGenerate ? 'enabled' : 'disabled'}`}
          aria-label={canGenerate ? 'Generate new business' : `Cooldown: ${cooldownText}`}
          aria-describedby="generation-info"
        >
          {canGenerate ? 'Generate Business' : `Cooldown: ${cooldownText}`}
          {!canGenerate && <div className="progress-bar" style={progressBarStyle} />}
        </button>
        {generationFeedback && (
          <div 
            data-testid="generation-feedback"
            className={`generation-feedback ${generationFeedback.includes('✓') ? 'success' : 'failure'}`}
          >
            {generationFeedback}
          </div>
        )}
      </div>
      
      <div 
        id="generation-info"
        data-testid="generation-info" 
        className="generation-info"
      >
        <div data-testid="ai-model-info" className="ai-model-info">
          Model: {currentAIModel.name} | Failure Rate: {currentAIModel.failureRate}%
        </div>
        <div data-testid="cooldown-info" className="cooldown-info">
          Cooldown: {currentAIModel.cooldownSeconds}s | Quality: {currentAIModel.qualityLevel}%
        </div>
        <div data-testid="cash-info" className="cash-info">
          Cash: ${cash.toFixed(2)}
        </div>
        <div data-testid="business-count" className="business-count">
          Businesses: {businesses.length}
        </div>
      </div>
    </div>
  )
}

export default GenerateButton