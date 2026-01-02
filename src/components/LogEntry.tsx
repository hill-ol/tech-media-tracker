import type {ConsumptionEntry} from '../types';
import { useMediaStore } from '../store/mediaStore';
import { format } from 'date-fns';
import '../styles/Dashboard.css';

interface LogEntryProps {
    entry: ConsumptionEntry;
}

function LogEntry({ entry }: LogEntryProps) {
    const deleteEntry = useMediaStore((state) => state.deleteEntry);

    const getIcon = (type: string) => {
        switch(type) {
            case 'podcast': return '🎧';
            case 'newsletter': return '📰';
            case 'video': return '🎥';
            case 'article': return '📝';
            default: return '📚';
        }
    };

    const icon = getIcon(entry.type);

    return (
        <div className="log-entry">
            <div className="log-entry-header">
                <span className="log-icon">{icon}</span>
                <div className="log-meta">
                    <h4 className="log-title">{entry.title}</h4>
                    <p className="log-source">{entry.sourceName}</p>
                    <span className="log-date">
            {format(new Date(entry.date), 'MMM d, yyyy')}
          </span>
                </div>
                <button
                    className="delete-btn"
                    onClick={() => deleteEntry(entry.id)}
                    aria-label="Delete entry"
                >
                    🗑️
                </button>
            </div>

            <div className="log-entry-content">
                <div className="log-insight">
                    <strong>Key Insight:</strong>
                    <p>{entry.keyInsight}</p>
                </div>

                {entry.interviewAngle && (
                    <div className="log-interview">
                        <strong>Interview Angle:</strong>
                        <p>{entry.interviewAngle}</p>
                    </div>
                )}

                <div className="log-topics">
                    {entry.topics.slice(0, 4).map((topic) => (
                        <span key={topic} className="topic-tag-small">
              {topic}
            </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LogEntry;