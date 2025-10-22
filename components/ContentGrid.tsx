
import React from 'react';
import type { ContentItem } from '../types';
import { ContentCard } from './ContentCard';

interface ContentGridProps {
    title: string;
    items: ContentItem[];
    onSelect: (item: ContentItem) => void;
}

export const ContentGrid: React.FC<ContentGridProps> = ({ title, items, onSelect }) => {
    return (
        <div className="py-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 px-6 md:px-16">{title}</h1>
            {items.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-6 md:px-16">
                    {items.map(item => (
                        <ContentCard key={item.id} item={item} onSelect={onSelect} />
                    ))}
                </div>
            ) : (
                <p className="text-xl text-gray-400 px-6 md:px-16">No items found.</p>
            )}
        </div>
    );
};
