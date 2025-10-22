import React from 'react';
import type { HeroData } from '../types';

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


export const Hero: React.FC<{ data: HeroData; onPlay: (item: HeroData) => void }> = ({ data, onPlay }) => {
  const hasProgress = data.progress && data.progress > 0;
  
  return (
    <div className="relative h-[55vh] md:h-[90vh] overflow-hidden">
      <div className="absolute inset-0 pt-20">
        <img src={data.backgroundImageUrl} alt={data.title} className="w-full h-full object-cover hero-bg-animate" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0c05] via-[#1a0c05]/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0c05] to-transparent"></div>
      </div>
      
      <div className="relative z-10 flex flex-col justify-end h-full pb-10 md:pb-20 px-6 md:px-16 max-w-screen-2xl mx-auto">
        <div className="w-full md:w-1/2 lg:w-2/5 space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-red-600 font-black text-xl italic">S</span>
            <span className="tracking-[0.3em] text-xs font-semibold">{data.category}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
            {data.title}
          </h1>

          <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-sm text-gray-300">
            {data.details.map((detail, index) => (
              <React.Fragment key={index}>
                <span>{detail}</span>
                {index < data.details.length - 1 && <span className="w-1 h-1 bg-gray-500 rounded-full"></span>}
              </React.Fragment>
            ))}
          </div>
          
          <div className="pt-4">
              <button 
                onClick={() => data.videoUrl && onPlay(data)}
                className="flex items-center justify-center gap-x-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-opacity-80 transition-all duration-200 focus:scale-105"
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
