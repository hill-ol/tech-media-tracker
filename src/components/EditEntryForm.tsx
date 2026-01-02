import { useState, type FormEvent } from 'react';
import { useMediaStore } from '../store/mediaStore';
import type { ConsumptionEntry } from '../types';
import '../styles/Forms.css';

interface EditEntryFormProps {
    entry: ConsumptionEntry;
    onSuccess: () => void;
    onCancel: () => void;
}

function EditEntryForm({ entry, onSuccess, onCancel }: EditEntryFormProps) {
    const updateEntry = useMediaStore((state) => state.updateEntry);

    const [title, setTitle] = useState(entry.title);
    const [keyInsight, setKeyInsight] = useState(entry.keyInsight);
    const [interviewAngle, setInterviewAngle] = useState(entry.interviewAngle || '');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        updateEntry(entry.id, {
            title,
            keyInsight,
            interviewAngle: interviewAngle || undefined,
        });

        onSuccess();
    };

    return (
        <div className="custom-source-modal">
            <div className="modal-overlay" onClick={onCancel}></div>
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Edit Entry</h3>
                    <button className="modal-close" onClick={onCancel}>✕</button>
                </div>

                <form className="entry-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Source</label>
                        <div className="readonly-field">
                            {entry.sourceName}
                        </div>
                        <small>Source cannot be changed</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="title">Title *</label>
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
                        <button type="button" onClick={onCancel} className="btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditEntryForm;