import type { MediaType } from '../types';
import '../styles/SearchFilter.css';

interface SearchFilterProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedType: MediaType | 'all';
    onTypeChange: (type: MediaType | 'all') => void;
    dateRange: 'all' | 'week' | 'month' | 'year';
    onDateRangeChange: (range: 'all' | 'week' | 'month' | 'year') => void;
}

function SearchFilter({
                          searchQuery,
                          onSearchChange,
                          selectedType,
                          onTypeChange,
                          dateRange,
                          onDateRangeChange,
                      }: SearchFilterProps) {
    return (
        <div className="search-filter">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search titles, sources, or insights..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="search-input"
                />
                {searchQuery && (
                    <button
                        className="clear-search"
                        onClick={() => onSearchChange('')}
                        aria-label="Clear search"
                    >
                        ✕
                    </button>
                )}
            </div>

            <div className="filters">
                <div className="filter-group">
                    <label>Type:</label>
                    <select
                        value={selectedType}
                        onChange={(e) => onTypeChange(e.target.value as MediaType | 'all')}
                        className="filter-select"
                    >
                        <option value="all">All Types</option>
                        <option value="podcast">🎧 Podcasts</option>
                        <option value="newsletter">📰 Newsletters</option>
                        <option value="video">🎥 Videos</option>
                        <option value="article">📝 Articles</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Date:</label>
                    <select
                        value={dateRange}
                        onChange={(e) =>
                            onDateRangeChange(e.target.value as 'all' | 'week' | 'month' | 'year')
                        }
                        className="filter-select"
                    >
                        <option value="all">All Time</option>
                        <option value="week">Past Week</option>
                        <option value="month">Past Month</option>
                        <option value="year">Past Year</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default SearchFilter;