import { useState, type FormEvent } from 'react';
import { useMediaStore } from '../store/mediaStore';
import { mediaSources } from '../data/mediaSources';
import '../styles/Forms.css';

interface AddEntryFormProps {
    onSuccess: () => void;
}

function AddEntryForm({ onSuccess }: AddEntryFormProps) {
    const addEntry = useMediaStore((state) => state.addEntry);

    const [sourceId, setSourceId] = useState('');
    const [title, setTitle] = useState('');
    const [keyInsight, setKeyInsight] = useState('');
    const [interviewAngle, setInterviewAngle] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const source = mediaSources.find((s) => s.id === sourceId);
        if (!source) return;

        addEntry({
            sourceId: source.id,
            sourceName: source.name,
            type: source.type,
            title,
            keyInsight,
            interviewAngle: interviewAngle || undefined,
            topics: source.topics,
            date: new Date()
        });

        setSourceId('');
        setTitle('');
        setKeyInsight('');
        setInterviewAngle('');

        onSuccess();
    };

    return (
        <form className="entry-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="source">Source *</label>
                <select
                    id="source"
                    value={sourceId}
                    onChange={(e) => setSourceId(e.target.value)}
                    required
                >
                    <option value="">Select a source...</option>
                    <optgroup label="Podcasts">
                        {mediaSources
                            .filter((s) => s.type === 'podcast')
                            .map((source) => (
                                <option key={source.id} value={source.id}>
                                    {source.name}
                                </option>
                            ))}
                    </optgroup>
                    <optgroup label="Newsletters">
                        {mediaSources
                            .filter((s) => s.type === 'newsletter')
                            .map((source) => (
                                <option key={source.id} value={source.id}>
                                    {source.name}
                                </option>
                            ))}
                    </optgroup>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="title">Episode/Article Title *</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., 'The Future of AI Coding Tools'"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="insight">Key Insight *</label>
                <textarea
                    id="insight"
                    value={keyInsight}
                    onChange={(e) => setKeyInsight(e.target.value)}
                    placeholder="What's the main takeaway? What did you learn?"
                    rows={3}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="interview">Interview Angle (Optional)</label>
                <textarea
                    id="interview"
                    value={interviewAngle}
                    onChange={(e) => setInterviewAngle(e.target.value)}
                    placeholder="How could you mention this in an interview?"
                    rows={2}
                />
                <small>Example: "This relates to scaling challenges I saw in Co-op Scout..."</small>
            </div>

            <div className="form-actions">
                <button type="submit" className="btn-primary">
                    Save Entry
                </button>
            </div>
        </form>
    );
}

export default AddEntryForm;