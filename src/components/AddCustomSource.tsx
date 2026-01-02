import { useState, type FormEvent } from 'react';
import { useMediaStore } from '../store/mediaStore';
import type {MediaType} from '../types';
import '../styles/Forms.css';

interface AddCustomSourceProps {
    onSuccess: () => void;
    onCancel: () => void;
}

function AddCustomSource({ onSuccess, onCancel }: AddCustomSourceProps) {
    const addCustomSource = useMediaStore((state) => state.addCustomSource);

    const [name, setName] = useState('');
    const [type, setType] = useState<MediaType>('video');
    const [frequency, setFrequency] = useState('');
    const [duration, setDuration] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        addCustomSource({
            id: `custom-${Date.now()}`,
            name,
            type,
            frequency,
            duration: duration || undefined,
            topics: ['Custom'],
            bestFor: ['Personal interest'],
            url: url || undefined,
            publishDays: []
        });

        // Reset form
        setName('');
        setType('video');
        setFrequency('');
        setDuration('');
        setUrl('');

        onSuccess();
    };

    return (
        <div className="custom-source-modal">
            <div className="modal-overlay" onClick={onCancel}></div>
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Add Custom Source</h3>
                    <button className="modal-close" onClick={onCancel}>✕</button>
                </div>

                <form className="entry-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Source Name *</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., 'Fireship', 'ThePrimeagen'"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="type">Type *</label>
                        <select
                            id="type"
                            value={type}
                            onChange={(e) => setType(e.target.value as MediaType)}
                            required
                        >
                            <option value="video">Video (YouTube, etc.)</option>
                            <option value="podcast">Podcast</option>
                            <option value="newsletter">Newsletter</option>
                            <option value="article">Article/Blog</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="frequency">Frequency *</label>
                        <input
                            id="frequency"
                            type="text"
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value)}
                            placeholder="e.g., 'Weekly', 'Daily', 'As needed'"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="duration">Duration (Optional)</label>
                        <input
                            id="duration"
                            type="text"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="e.g., '15 min', '5 min read'"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="url">URL (Optional)</label>
                        <input
                            id="url"
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://youtube.com/@fireship"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onCancel} className="btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary">
                            Add Source
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddCustomSource;