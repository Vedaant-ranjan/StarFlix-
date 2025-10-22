import React, { useRef } from 'react';
import type { ContentItem } from '../types';

const PlayCircleIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
    </svg>
);


export const ContentCard: React.FC<{ item: ContentItem; onSelect: (item: ContentItem) => void }> = ({ item, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleSelect = () => {
    onSelect(item);
  };

  const handleFocus = () => {
    cardRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
        handleSelect();
    }
  };
    
  return (
    <div 
        ref={cardRef}
        className="flex-shrink-0 w-60 md:w-72 group outline-none rounded-lg cursor-pointer" 
        title={item.title}
        tabIndex={0}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onClick={handleSelect}
        role="button"
        aria-label={`View details for ${item.title}`}
    >
      <div 
        className="relative aspect-video rounded-md overflow-hidden transition-transform duration-300 ease-in-out group-hover:scale-105 group-focus:scale-110 group-focus:z-10">
        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
        
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            {item.videoUrl && <PlayCircleIcon className="w-16 h-16 text-white/80" />}
        </div>
        
        {item.progress && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/30">
            <div className="h-full bg-red-600" style={{ width: `${item.progress}%` }}></div>
          </div>
        )}
      </div>
    </div>
  );
};