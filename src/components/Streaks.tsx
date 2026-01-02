import { useMemo } from 'react';
import { useMediaStore } from '../store/mediaStore';
import { startOfDay, differenceInDays, format } from 'date-fns';
import '../styles/Streaks.css';

function Streaks() {
    const entries = useMediaStore((state) => state.entries);

    const streakData = useMemo(() => {
        if (entries.length === 0) {
            return {
                currentStreak: 0,
                longestStreak: 0,
                lastEntryDate: null,
                weeklyActivity: []
            };
        }

        // Sort entries by date (oldest first)
        const sortedEntries = [...entries].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        // Get unique days with entries
        const daysWithEntries = new Set(
            sortedEntries.map((entry) =>
                startOfDay(new Date(entry.date)).getTime()
            )
        );

        const sortedDays = Array.from(daysWithEntries).sort((a, b) => a - b);

        // Calculate current streak
        let currentStreak = 0;
        const today = startOfDay(new Date()).getTime();
        const yesterday = today - 86400000; // 24 hours in ms

        if (daysWithEntries.has(today) || daysWithEntries.has(yesterday)) {
            let checkDate = daysWithEntries.has(today) ? today : yesterday;

            while (daysWithEntries.has(checkDate)) {
                currentStreak++;
                checkDate -= 86400000; // Go back one day
            }
        }

        // Calculate longest streak
        let longestStreak = 0;
        let tempStreak = 1;

        for (let i = 1; i < sortedDays.length; i++) {
            const dayDiff = differenceInDays(sortedDays[i], sortedDays[i - 1]);

            if (dayDiff === 1) {
                tempStreak++;
            } else {
                longestStreak = Math.max(longestStreak, tempStreak);
                tempStreak = 1;
            }
        }
        longestStreak = Math.max(longestStreak, tempStreak);

        // Get last 7 days activity
        const weeklyActivity = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dayStart = startOfDay(date).getTime();

            const count = entries.filter(
                (entry) => startOfDay(new Date(entry.date)).getTime() === dayStart
            ).length;

            weeklyActivity.push({
                date: format(date, 'EEE'),
                fullDate: format(date, 'MMM d'),
                count,
                isToday: i === 0
            });
        }

        return {
            currentStreak,
            longestStreak,
            lastEntryDate: sortedEntries[sortedEntries.length - 1].date,
            weeklyActivity
        };
    }, [entries]);

    const getStreakMessage = () => {
        if (streakData.currentStreak === 0) {
            return "Start your streak today! 💪";
        } else if (streakData.currentStreak === 1) {
            return "Keep it going! 🔥";
        } else if (streakData.currentStreak < 7) {
            return `${streakData.currentStreak} days strong! 🔥`;
        } else if (streakData.currentStreak < 30) {
            return `Amazing ${streakData.currentStreak} day streak! 🔥🔥`;
        } else {
            return `Incredible ${streakData.currentStreak} day streak! 🔥🔥🔥`;
        }
    };

    return (
        <div className="streaks-widget">
            <div className="streak-header">
                <div className="streak-main">
                    <div className="streak-flame">
                        {streakData.currentStreak > 0 ? '🔥' : '💤'}
                    </div>
                    <div className="streak-info">
                        <div className="streak-count">{streakData.currentStreak}</div>
                        <div className="streak-label">Day Streak</div>
                    </div>
                </div>
                <div className="streak-message">{getStreakMessage()}</div>
            </div>

            <div className="streak-stats">
                <div className="streak-stat">
                    <div className="stat-value">🏆 {streakData.longestStreak}</div>
                    <div className="stat-name">Longest Streak</div>
                </div>
                <div className="streak-stat">
                    <div className="stat-value">📚 {entries.length}</div>
                    <div className="stat-name">Total Entries</div>
                </div>
            </div>

            <div className="weekly-activity-chart">
                <h4>Last 7 Days</h4>
                <div className="activity-bars">
                    {streakData.weeklyActivity.map((day, idx) => (
                        <div key={idx} className="activity-day">
                            <div className="activity-bar-container">
                                <div
                                    className={`activity-bar ${day.count > 0 ? 'has-activity' : ''} ${
                                        day.isToday ? 'is-today' : ''
                                    }`}
                                    style={{ height: `${Math.min((day.count / 5) * 100, 100)}%` }}
                                    title={`${day.fullDate}: ${day.count} entries`}
                                >
                                    {day.count > 0 && <span className="activity-count">{day.count}</span>}
                                </div>
                            </div>
                            <div className={`activity-label ${day.isToday ? 'today' : ''}`}>
                                {day.date}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Streaks;