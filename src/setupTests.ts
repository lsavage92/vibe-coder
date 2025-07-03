import '@testing-library/jest-dom'

// Mock Math.random for predictable test results
const mockMath = Object.create(globalThis.Math)
mockMath.random = () => 0.5 // This ensures generation succeeds (50% > 30% failure rate)
globalThis.Math = mockMath