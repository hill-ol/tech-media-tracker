import { useMemo } from 'react';
import { useMediaStore } from '../store/mediaStore';
import { startOfWeek, endOfWeek, format } from 'date-fns';
import '../styles/Dashboard.css';

interface WeeklyProgressProps {
    current: number;
    target: number;
}

function WeeklyProgress({ current, target }: WeeklyProgressProps) {
    const entries = useMediaStore((state) => state.entries);
    const percentage = Math.min((current / target) * 100, 100);
    const isComplete = current >= target;

    const weekStats = useMemo(() => {
        const now = new Date();
        const weekStart = startOfWeek(now, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

        const thisWeekEntries = entries.filter((entry) => {
            const entryDate = new Date(entry.date);
            return entryDate >= weekStart && entryDate <= weekEnd;
        });

        const podcastCount = thisWeekEntries.filter((e) => e.type === 'podcast').length;
        const newsletterCount = thisWeekEntries.filter((e) => e.type === 'newsletter').length;
        const videoCount = thisWeekEntries.filter((e) => e.type === 'video').length;

        return {
            weekRange: `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d')}`,
            breakdown: [
                { icon: '🎧', count: podcastCount, label: 'Podcasts' },
                { icon: '📰', count: newsletterCount, label: 'Newsletters' },
                { icon: '🎥', count: videoCount, label: 'Videos' },
            ].filter((item) => item.count > 0),
        };
    }, [entries]);

    const remaining = Math.max(target - current, 0);

    return (
        <div className="weekly-progress">
            <div className="progress-header">
                <div>
                    <span className="progress-label">Weekly Progress</span>
                    <span className="progress-week-range">{weekStats.weekRange}</span>
                </div>
                <span className={`progress-count ${isComplete ? 'complete' : ''}`}>
          {current}/{target} {isComplete && '✓'}
        </span>
            </div>

            <div className="progress-bar">
                <div
                    className={`progress-fill ${isComplete ? 'complete' : ''}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            {isComplete ? (
                <p className="progress-message">
                    🎉 Weekly goal complete! Keep up the great work!
                </p>
            ) : (
                <p className="progress-message">
                    {remaining === 1 ? '1 more to go!' : `${remaining} more to reach your goal`}
                </p>
            )}

            {weekStats.breakdown.length > 0 && (
                <div className="week-breakdown">
                    <h4>This Week</h4>
                    <div className="breakdown-items">
                        {weekStats.breakdown.map((item, idx) => (
                            <div key={idx} className="breakdown-item">
                                <span className="breakdown-icon">{item.icon}</span>
                                <span className="breakdown-count">{item.count}</span>
                                <span className="breakdown-label">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default WeeklyProgress;