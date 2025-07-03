import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
    it('renders Vibe Coder title', () => {
        render(<App />)
        expect(screen.getByRole('heading', { name: /vibe coder/i })).toBeInTheDocument()
    })

    it('renders with correct CSS class', () => {
        render(<App />)
        expect(screen.getByTestId('app')).toHaveClass('app')
    })
})