import '../styles/Dashboard.css';

interface WeeklyProgressProps {
    current: number;
    target: number;
}

function WeeklyProgress({ current, target }: WeeklyProgressProps) {
    const percentage = Math.min((current / target) * 100, 100);
    const isComplete = current >= target;

    return (
        <div className="weekly-progress">
            <div className="progress-header">
        <span className="progress-label">
          Weekly Progress
        </span>
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

            {isComplete && (
                <p className="progress-message">
                    🎉 Weekly goal complete! Keep up the great work!
                </p>
            )}
        </div>
    );
}

export default WeeklyProgress;