import React, { useEffect, useRef } from 'react';

interface VideoPlayerProps {
    videoUrl: string;
    title: string;
    onClose: () => void;
}

const XMarkIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);


export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title, onClose }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Autoplay when component mounts
        videoRef.current?.play().catch(error => {
            console.error("Autoplay was prevented:", error);
        });
    }, []);

    return (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center animate-fade-in">
            <button 
                onClick={onClose} 
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-50"
                aria-label="Close video player"
            >
                <XMarkIcon className="w-10 h-10"/>
            </button>
            <div className="w-full h-full">
                <video 
                    ref={videoRef}
                    src={videoUrl} 
                    controls 
                    className="w-full h-full"
                    title={title}
                >
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};
