import { useState, type FormEvent } from 'react';
import { useMediaStore } from '../store/mediaStore';
import { mediaSources } from '../data/mediaSources';
import AddCustomSource from './AddCustomSource';
import '../styles/Forms.css';

interface AddEntryFormProps {
    onSuccess: () => void;
}

function AddEntryForm({ onSuccess }: AddEntryFormProps) {
    const addEntry = useMediaStore((state) => state.addEntry);
    const customSources = useMediaStore((state) => state.customSources);

    const [sourceId, setSourceId] = useState('');
    const [title, setTitle] = useState('');
    const [keyInsight, setKeyInsight] = useState('');
    const [interviewAngle, setInterviewAngle] = useState('');
    const [showCustomSourceModal, setShowCustomSourceModal] = useState(false);

    // Combine default and custom sources
    const allSources = [...mediaSources, ...customSources];

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const source = allSources.find((s) => s.id === sourceId);
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

        // Reset form
        setSourceId('');
        setTitle('');
        setKeyInsight('');
        setInterviewAngle('');

        onSuccess();
    };

    return (
        <>
            <form className="entry-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="source">Source *</label>
                    <div className="source-select-group">
                        <select
                            id="source"
                            value={sourceId}
                            onChange={(e) => setSourceId(e.target.value)}
                            required
                        >
                            <option value="">Select a source...</option>
                            <optgroup label="Podcasts">
                                {allSources
                                    .filter((s) => s.type === 'podcast')
                                    .map((source) => (
                                        <option key={source.id} value={source.id}>
                                            {source.name}
                                        </option>
                                    ))}
                            </optgroup>
                            <optgroup label="Newsletters">
                                {allSources
                                    .filter((s) => s.type === 'newsletter')
                                    .map((source) => (
                                        <option key={source.id} value={source.id}>
                                            {source.name}
                                        </option>
                                    ))}
                            </optgroup>
                            {allSources.filter((s) => s.type === 'video').length > 0 && (
                                <optgroup label="Videos/YouTube">
                                    {allSources
                                        .filter((s) => s.type === 'video')
                                        .map((source) => (
                                            <option key={source.id} value={source.id}>
                                                {source.name}
                                            </option>
                                        ))}
                                </optgroup>
                            )}
                            {allSources.filter((s) => s.type === 'article').length > 0 && (
                                <optgroup label="Articles/Blogs">
                                    {allSources
                                        .filter((s) => s.type === 'article')
                                        .map((source) => (
                                            <option key={source.id} value={source.id}>
                                                {source.name}
                                            </option>
                                        ))}
                                </optgroup>
                            )}
                        </select>
                        <button
                            type="button"
                            className="btn-add-source"
                            onClick={() => setShowCustomSourceModal(true)}
                        >
                            + Add New Source
                        </button>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="title">Title *</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., 'JavaScript in 100 Seconds'"
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

            {showCustomSourceModal && (
                <AddCustomSource
                    onSuccess={() => setShowCustomSourceModal(false)}
                    onCancel={() => setShowCustomSourceModal(false)}
                />
            )}
        </>
    );
}

export default AddEntryForm;