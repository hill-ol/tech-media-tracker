import { useEffect } from 'react';
import { useMediaStore } from './store/mediaStore';
import Dashboard from './components/Dashboard';
import './styles/App.css';

function App() {
    const resetWeekIfNeeded = useMediaStore((state) => state.resetWeekIfNeeded);

    useEffect(() => {
        resetWeekIfNeeded();
    }, [resetWeekIfNeeded]);

    return (
        <div className="app">
            <header className="app-header">
                <h1>Tech Media Tracker</h1>
            </header>

            <main className="app-main">
                <Dashboard />
            </main>
        </div>
    );
}

export default App;