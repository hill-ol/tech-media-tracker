import { useMemo } from 'react';
import { useMediaStore } from '../store/mediaStore';
import { format } from 'date-fns';
import '../styles/InterviewArsenal.css';

interface GroupedInsights {
    [topic: string]: Array<{
        title: string;
        source: string;
        insight: string;
        interviewAngle?: string;
        date: Date;
    }>;
}

function InterviewArsenal() {
    const entries = useMediaStore((state) => state.entries);

    // Group entries by topic
    const groupedInsights = useMemo(() => {
        const grouped: GroupedInsights = {};

        entries.forEach((entry) => {
            entry.topics.forEach((topic) => {
                if (!grouped[topic]) {
                    grouped[topic] = [];
                }
                grouped[topic].push({
                    title: entry.title,
                    source: entry.sourceName,
                    insight: entry.keyInsight,
                    interviewAngle: entry.interviewAngle,
                    date: entry.date,
                });
            });
        });

        return grouped;
    }, [entries]);

    // Get entries with interview angles
    const interviewReady = useMemo(() => {
        return entries.filter((e) => e.interviewAngle);
    }, [entries]);

    // Get recent trends (topics from last 2 weeks)
    const recentTopics = useMemo(() => {
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

        const topics: { [key: string]: number } = {};
        entries
            .filter((e) => new Date(e.date) >= twoWeeksAgo)
            .forEach((entry) => {
                entry.topics.forEach((topic) => {
                    topics[topic] = (topics[topic] || 0) + 1;
                });
            });

        return Object.entries(topics)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([topic]) => topic);
    }, [entries]);

    const copyToClipboard = () => {
        let text = '📚 MY TECH MEDIA INSIGHTS - INTERVIEW PREP\n\n';

        text += '🎯 INTERVIEW-READY TALKING POINTS:\n\n';
        interviewReady.forEach((entry, i) => {
            text += `${i + 1}. ${entry.title} (${entry.sourceName})\n`;
            text += `   Insight: ${entry.keyInsight}\n`;
            text += `   Interview Angle: ${entry.interviewAngle}\n\n`;
        });

        text += '\n📊 TOPICS I\'VE BEEN EXPLORING:\n';
        Object.keys(groupedInsights).forEach((topic) => {
            text += `\n• ${topic} (${groupedInsights[topic].length} entries)\n`;
        });

        navigator.clipboard.writeText(text);
        alert('Copied to clipboard! 📋');
    };

    if (entries.length === 0) {
        return (
            <div className="interview-arsenal">
                <div className="empty-state">
                    <p>Start adding entries to build your interview arsenal!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="interview-arsenal">
            <div className="arsenal-header">
                <div>
                    <h2>🎯 Interview Arsenal</h2>
                    <p className="arsenal-subtitle">
                        Your tech insights, ready for interviews
                    </p>
                </div>
                <button onClick={copyToClipboard} className="btn-primary">
                    📋 Copy All
                </button>
            </div>

            <div className="arsenal-stats">
                <div className="stat-card">
                    <div className="stat-number">{entries.length}</div>
                    <div className="stat-label">Total Entries</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">{interviewReady.length}</div>
                    <div className="stat-label">Interview-Ready</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">{Object.keys(groupedInsights).length}</div>
                    <div className="stat-label">Topics Covered</div>
                </div>
            </div>

            {recentTopics.length > 0 && (
                <div className="recent-trends">
                    <h3>📈 Recent Focus Areas</h3>
                    <div className="trend-tags">
                        {recentTopics.map((topic) => (
                            <span key={topic} className="trend-tag">
                {topic}
              </span>
                        ))}
                    </div>
                </div>
            )}

            {interviewReady.length > 0 && (
                <div className="arsenal-section">
                    <h3>💬 Interview Talking Points</h3>
                    <p className="section-subtitle">
                        Insights you've specifically prepared for interviews
                    </p>
                    <div className="talking-points">
                        {interviewReady.map((entry) => (
                            <div key={entry.id} className="talking-point">
                                <div className="talking-point-header">
                                    <h4>{entry.title}</h4>
                                    <span className="source-badge">{entry.sourceName}</span>
                                </div>
                                <div className="talking-point-content">
                                    <div className="insight-block">
                                        <strong>Key Insight:</strong>
                                        <p>{entry.keyInsight}</p>
                                    </div>
                                    <div className="interview-block">
                                        <strong>💡 Interview Angle:</strong>
                                        <p>{entry.interviewAngle}</p>
                                    </div>
                                </div>
                                <div className="talking-point-footer">
                  <span className="date-badge">
                    {format(new Date(entry.date), 'MMM d, yyyy')}
                  </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="arsenal-section">
                <h3>📚 Knowledge by Topic</h3>
                <p className="section-subtitle">
                    Your learning organized by technology and concept
                </p>
                <div className="topics-grid">
                    {Object.entries(groupedInsights)
                        .sort((a, b) => b[1].length - a[1].length)
                        .map(([topic, insights]) => (
                            <div key={topic} className="topic-card">
                                <div className="topic-header">
                                    <h4>{topic}</h4>
                                    <span className="count-badge">{insights.length}</span>
                                </div>
                                <div className="topic-insights">
                                    {insights.slice(0, 3).map((insight, idx) => (
                                        <div key={idx} className="mini-insight">
                                            <div className="mini-insight-title">"{insight.title}"</div>
                                            <div className="mini-insight-source">{insight.source}</div>
                                        </div>
                                    ))}
                                    {insights.length > 3 && (
                                        <div className="more-insights">
                                            +{insights.length - 3} more
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <div className="arsenal-section quick-reference">
                <h3>⚡ Quick Reference</h3>
                <div className="quick-tips">
                    <div className="tip">
                        <strong>Before an interview:</strong> Review your talking points and
                        pick 2-3 that relate to the company/role
                    </div>
                    <div className="tip">
                        <strong>During an interview:</strong> When asked "What have you been
                        learning?", reference specific sources and insights
                    </div>
                    <div className="tip">
                        <strong>Example:</strong> "I've been following Hard Fork and recently
                        learned about [topic]. It made me think about..."
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InterviewArsenal;