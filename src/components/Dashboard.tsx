import { useState } from 'react';
import { useMediaStore } from '../store/mediaStore';
import { getDailyRecommendations } from '../utils/recommendations';
import MediaCard from './MediaCard';
import WeeklyProgress from './WeeklyProgress';
import AddEntryForm from './AddEntryForm';
import LogEntry from './LogEntry';
import InterviewArsenal from './InterviewArsenal';
import '../styles/Dashboard.css';

type View = 'recommendations' | 'log' | 'add' | 'arsenal';

function Dashboard() {
    const [view, setView] = useState<View>('recommendations');
    const entries = useMediaStore((state) => state.entries);
    const getWeekProgress = useMediaStore((state) => state.getWeekProgress);

    const weekProgress = getWeekProgress();
    const recommendations = getDailyRecommendations(entries, weekProgress);

    const getIcon = (type: string) => {
        switch(type) {
            case 'podcast': return '🎧';
            case 'newsletter': return '📰';
            case 'video': return '🎥';
            case 'article': return '📝';
            default: return '📚';
        }
    };

    return (
        <div className="dashboard">
            <WeeklyProgress current={weekProgress} target={3} />

            <nav className="dashboard-nav">
                <button
                    className={view === 'recommendations' ? 'active' : ''}
                    onClick={() => setView('recommendations')}
                >
                    Today's Picks
                </button>
                <button
                    className={view === 'log' ? 'active' : ''}
                    onClick={() => setView('log')}
                >
                    My Log ({entries.length})
                </button>
                <button
                    className={view === 'arsenal' ? 'active' : ''}
                    onClick={() => setView('arsenal')}
                >
                    Interview Arsenal
                </button>
                <button
                    className={view === 'add' ? 'active' : ''}
                    onClick={() => setView('add')}
                >
                    + Add Entry
                </button>
            </nav>

            <div className="dashboard-content">
                {view === 'recommendations' && (
                    <div className="recommendations-section">
                        <h2>Recommended for Today</h2>
                        {recommendations.length > 0 ? (
                            <div className="media-grid">
                                {recommendations.map((rec) => (
                                    <MediaCard
                                        key={rec.source.id}
                                        source={rec.source}
                                        reason={rec.reason}
                                        onMarkComplete={() => setView('add')}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <p>🎉 You've consumed all recommended content for today!</p>
                                <p>Check back tomorrow for new recommendations.</p>
                            </div>
                        )}

                        {entries.length > 0 && (
                            <div className="recent-activity">
                                <h3>Recent Activity</h3>
                                <ul>
                                    {entries.slice(-3).reverse().map((entry) => (
                                        <li key={entry.id}>
                      <span className="activity-icon">
                        {getIcon(entry.type)}
                      </span>
                                            <span className="activity-text">
                        "{entry.title}" from {entry.sourceName}
                      </span>
                                            <span className="activity-date">
                        {new Date(entry.date).toLocaleDateString()}
                      </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {view === 'log' && (
                    <div className="log-section">
                        <h2>Consumption Log</h2>
                        {entries.length > 0 ? (
                            <div className="log-entries">
                                {entries
                                    .slice()
                                    .reverse()
                                    .map((entry) => (
                                        <LogEntry key={entry.id} entry={entry} />
                                    ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <p>No entries yet. Start tracking your tech media consumption!</p>
                                <button onClick={() => setView('add')} className="cta-button">
                                    Add Your First Entry
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {view === 'arsenal' && <InterviewArsenal />}

                {view === 'add' && (
                    <div className="add-section">
                        <h2>Add Entry</h2>
                        <AddEntryForm onSuccess={() => setView('recommendations')} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;