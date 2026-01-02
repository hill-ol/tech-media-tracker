import { useEffect } from 'react';
import { useMediaStore } from './store/mediaStore';
import Dashboard from './components/Dashboard';
import './styles/App.css';

function App() {
    const resetWeekIfNeeded = useMediaStore((state) => state.resetWeekIfNeeded);

    useEffect(() => {
        // Check if we need to reset weekly progress
        resetWeekIfNeeded();
    }, [resetWeekIfNeeded]);

    return (
        <div className="app">
            <header className="app-header">
                <h1>📚 Tech Media Tracker</h1>
                <p className="subtitle">Stay current, land the co-op</p>
            </header>

            <main className="app-main">
                <Dashboard />
            </main>

            <footer className="app-footer">
                <p>Built by Olivia • Jan 2026</p>
            </footer>
        </div>
    );
}

export default App;