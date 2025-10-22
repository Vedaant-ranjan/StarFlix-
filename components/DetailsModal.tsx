import React from 'react';
import type { ContentItem } from '../types';

const XMarkIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);

const PlayIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
    </svg>
);

interface DetailsModalProps {
    item: ContentItem;
    onClose: () => void;
    onPlay: (item: ContentItem) => void;
}

export const DetailsModal: React.FC<DetailsModalProps> = ({ item, onClose, onPlay }) => {
    
    // Stop background scroll when modal is open
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handlePlayClick = () => {
        onPlay(item);
    }

    return (
        <div 
            className="fixed inset-0 bg-black/70 z-40 flex items-center justify-center animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div 
                className="bg-[#181818] w-full max-w-3xl rounded-lg overflow-hidden m-4 relative animate-slide-up"
                onClick={e => e.stopPropagation()} // Prevent closing modal when clicking inside
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-3 right-3 text-white/70 hover:text-white bg-black/50 rounded-full p-1 transition-colors z-10"
                    aria-label="Close details"
                >
                    <XMarkIcon className="w-6 h-6"/>
                </button>
                
                <div className="relative aspect-video">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 left-8">
                        <h2 id="modal-title" className="text-4xl font-bold mb-4">{item.title}</h2>
                        {item.videoUrl && (
                            <button 
                                onClick={handlePlayClick}
                                className="flex items-center justify-center bg-white text-black px-6 py-2.5 rounded-md font-semibold text-lg hover:bg-white/80 transition-colors duration-200">
                                <PlayIcon className="w-6 h-6 mr-2"/>
                                <span>Play</span>
                            </button>
                        )}
                    </div>
                </div>

                <div className="p-8">
                    <div className="flex space-x-4 items-center mb-4 text-green-500 font-semibold">
                        <span>{item.year}</span>
                        <span className="border px-2 py-0.5 text-sm">{item.rating}</span>
                        <span>{item.genres.join(', ')}</span>
                    </div>
                    <p className="text-white/90 leading-relaxed">{item.description}</p>
                </div>
            </div>
        </div>
    );
};
