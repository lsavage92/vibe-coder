import { useEffect } from 'react'
import './App.css'
import { GenerateButton } from './components/ui/GenerateButton'
import { useGameStore } from './stores/gameStore'

function App() {
    const { initializeGame, startTimeProgression, stopTimeProgression } = useGameStore()

    useEffect(() => {
        initializeGame()
        startTimeProgression()
        
        return () => {
            stopTimeProgression()
        }
    }, [initializeGame, startTimeProgression, stopTimeProgression])

    return (
        <div className="app" data-testid="app">
            <h1 data-testid="app-title">Vibe Coder</h1>
            <GenerateButton />
        </div>
    )
}

export default App
