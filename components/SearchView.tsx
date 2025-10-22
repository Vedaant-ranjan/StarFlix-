
import React, { useState, useEffect } from 'react';
import type { ContentItem } from '../types';
import { ContentGrid } from './ContentGrid';
import { PlaceholderView } from './PlaceholderView';

interface SearchViewProps {
    allItems: ContentItem[];
    onSelect: (item: ContentItem) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({ allItems, onSelect }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<ContentItem[]>([]);

    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }

        const lowerCaseQuery = query.toLowerCase();
        const filtered = allItems.filter(item =>
            item.title.toLowerCase().includes(lowerCaseQuery) ||
            item.description.toLowerCase().includes(lowerCaseQuery) ||
            item.genres.some(genre => genre.toLowerCase().includes(lowerCaseQuery))
        );
        setResults(filtered);
    }, [query, allItems]);

    return (
        <div className="pt-20 px-6 md:px-16 min-h-screen">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for titles, genres..."
                className="w-full max-w-xl mx-auto block bg-black/50 border border-gray-600 rounded-full py-3 px-6 text-lg mb-8 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                autoFocus
                aria-label="Search"
            />
            {query.trim() !== '' ? (
                 <ContentGrid
                    title={results.length > 0 ? `Results for "${query}"` : ''}
                    items={results}
                    onSelect={onSelect}
                />
            ) : (
                <div className="text-center pt-16">
                    <h2 className="text-2xl font-bold text-gray-300">Search StarFlix+</h2>
                    <p className="text-gray-500 mt-2">Find your next favorite movie or show.</p>
                </div>
            )}
        </div>
    );
};
