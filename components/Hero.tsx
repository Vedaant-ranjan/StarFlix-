import React from 'react';
import type { HeroData } from '../types';

const PlayIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
    </svg>
);

const InformationCircleIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.386-.225a8.25 8.25 0 0 1 4.312-4.312l.225-.386m-4.062 4.062a8.25 8.25 0 0 0-4.312 4.312l-.225.386m4.062-4.062-.386.225a8.25 8.25 0 0 1-4.312 4.312l-.225.386m-4.062-4.062a8.25 8.25 0 0 0 4.312-4.312l.225-.386M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0v-4.5m0-4.5v-2.25" />
    </svg>
);


interface HeroProps {
    heroData: HeroData;
    onPlay: () => void;
    onMoreInfo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ heroData, onPlay, onMoreInfo }) => {
    const { title, description, details, backgroundImageUrl } = heroData;

    return (
        <div className="relative h-[56.25vw] min-h-[400px] max-h-[800px] flex items-center">
            <div className="absolute inset-0 z-0">
                <img src={backgroundImageUrl} alt={title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0c05] via-[#1a0c05]/50 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a0c05] via-[#1a0c05]/30 to-transparent"></div>
            </div>

            <div className="relative z-10 px-6 md:px-16 w-full md:w-1/2 lg:w-2/5">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-4">{title}</h1>
                <p className="text-sm md:text-base lg:text-lg mb-6 leading-relaxed">
                    {description}
                </p>
                <div className="flex items-center space-x-4">
                    <button 
                        onClick={onPlay}
                        className="flex items-center justify-center bg-white text-black px-6 py-2.5 rounded-md font-semibold text-lg hover:bg-white/80 transition-colors duration-200">
                        <PlayIcon className="w-6 h-6 mr-2"/>
                        <span>Play</span>
                    </button>
                    <button 
                        onClick={onMoreInfo}
                        className="flex items-center justify-center bg-white/30 text-white px-6 py-2.5 rounded-md font-semibold text-lg hover:bg-white/40 transition-colors duration-200 backdrop-blur-sm">
                        <InformationCircleIcon className="w-6 h-6 mr-2" />
                        <span>More Info</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
