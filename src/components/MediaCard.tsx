import type {MediaSource} from '../types';
import '../styles/MediaCard.css';

interface MediaCardProps {
    source: MediaSource;
    reason: string;
    onMarkComplete: () => void;
}

function MediaCard({ source, reason, onMarkComplete }: MediaCardProps) {
    const icon = source.type === 'podcast' ? '🎧' : '📰';

    return (
        <div className="media-card">
            <div className="media-card-header">
                <span className="media-icon">{icon}</span>
                <div className="media-info">
                    <h3 className="media-name">{source.name}</h3>
                    <span className="media-duration">{source.duration}</span>
                </div>
            </div>

            <p className="media-reason">{reason}</p>

            <div className="media-topics">
                {source.topics.slice(0, 3).map((topic) => (
                    <span key={topic} className="topic-tag">
            {topic}
          </span>
                ))}
            </div>

            <div className="media-footer">
                <span className="media-frequency">{source.frequency}</span>
            </div>

            <div className="media-actions">
                {source.url && (
                    <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                    >
                        Open
                    </a>
                )}
                <button onClick={onMarkComplete} className="btn-primary">
                    Mark Complete
                </button>
            </div>
        </div>
    );
}

export default MediaCard;