import React, { useRef } from 'react';
import type { ContentRow, ContentItem } from '../types';
import { ContentCard } from './ContentCard';

const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
);

export const ContentCarousel: React.FC<{ row: ContentRow; onSelect: (item: ContentItem) => void }> = ({ row, onSelect }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.8;
            const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

  return (
    <div className="py-4 md:py-6 group">
      <h2 className="text-xl md:text-2xl font-bold mb-3 px-6 md:px-16">{row.title}</h2>
      <div className="relative">
        <button 
          onClick={() => scroll('left')}
          tabIndex={-1} // Not focusable, for mouse users only
          className="absolute left-0 top-0 bottom-0 z-20 w-16 bg-gradient-to-r from-[#1a0c05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center cursor-pointer">
          <ChevronLeftIcon className="w-8 h-8 text-white" />
        </button>
        <div ref={scrollRef} className="flex space-x-4 overflow-x-auto pb-4 px-6 md:px-16 no-scrollbar">
          {row.items.map(item => (
            <ContentCard key={item.id} item={item} onSelect={onSelect} />
          ))}
        </div>
        <button 
          onClick={() => scroll('right')}
          tabIndex={-1} // Not focusable, for mouse users only
          className="absolute right-0 top-0 bottom-0 z-20 w-16 bg-gradient-to-l from-[#1a0c05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center cursor-pointer">
          <ChevronRightIcon className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  );
};