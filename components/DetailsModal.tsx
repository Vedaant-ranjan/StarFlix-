import React, { useEffect, useRef } from 'react';
import type { ContentItem } from '../types';

const PlayIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
    </svg>
);

const ResumeIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
  </svg>
);

interface DetailsModalProps {
    item: ContentItem;
    onClose: () => void;
    onPlay: (item: ContentItem) => void;
}

export const DetailsModal: React.FC<DetailsModalProps> = ({ item, onClose, onPlay }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const playButtonRef = useRef<HTMLButtonElement>(null);
    const hasProgress = item.progress && item.progress > 0;

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        
        // Focus the play button when the modal opens
        playButtonRef.current?.focus();

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center animate-fade-in"
            onClick={onClose}
        >
             <style>{`
                @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
                }
                .animate-fade-in {
                animation: fadeIn 0.3s ease-in-out;
                }
            `}</style>
            <div 
                ref={modalRef}
                className="w-full max-w-4xl h-[80vh] bg-[#1a0c05] rounded-xl shadow-2xl overflow-hidden relative flex flex-col"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                <div className="absolute inset-0">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a0c05] via-[#1a0c05]/80 to-transparent"></div>
                </div>

                <div className="relative z-10 flex flex-col justify-end flex-grow p-8 md:p-12 text-white">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                        {item.title}
                    </h1>

                    <div className="flex items-center space-x-4 text-sm text-gray-300 mb-4">
                        <span className="font-bold text-green-400">{item.rating}</span>
                        <span>{item.year}</span>
                        <div className="flex space-x-2">
                           {item.genres.map(g => <span key={g}>{g}</span>)}
                        </div>
                    </div>
                    
                    <p className="max-w-xl text-base md:text-lg text-gray-200 mb-8">
                        {item.description}
                    </p>

                    <div className="flex items-center space-x-4">
                        <button 
                            ref={playButtonRef}
                            onClick={() => item.videoUrl && onPlay(item)}
                            disabled={!item.videoUrl}
                            className="flex items-center justify-center gap-x-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-opacity-80 transition-all duration-200 focus:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {hasProgress ? <ResumeIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
                            <span>{hasProgress ? 'Resume' : 'Play Now'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
