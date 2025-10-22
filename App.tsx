import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { ContentCarousel } from './components/ContentCarousel';
import { DetailsModal } from './components/DetailsModal';
import { VideoPlayer } from './components/VideoPlayer';
import { HERO_DATA, CONTENT_ROWS } from './constants';
import type { ContentItem } from './types';

const App: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [playingItem, setPlayingItem] = useState<ContentItem | null>(null);

  const handleSelect = (item: ContentItem) => {
    setSelectedItem(item);
  };

  const handlePlay = (item: ContentItem) => {
    if (item.videoUrl) {
      setPlayingItem(item);
      setSelectedItem(null); // Close modal if open
    } else {
      console.log("No video URL for this item.");
    }
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handleClosePlayer = () => {
    setPlayingItem(null);
  };
  
  // Handle ESC key to close modal or player
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (playingItem) {
          handleClosePlayer();
        } else if (selectedItem) {
          handleCloseModal();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem, playingItem]);

  return (
    <div className="bg-[#1a0c05] text-white min-h-screen font-sans">
      <Sidebar />
      <main className="pl-20">
        <Hero 
          heroData={HERO_DATA} 
          onPlay={() => handlePlay(HERO_DATA)} 
          onMoreInfo={() => handleSelect(HERO_DATA)} 
        />
        <div className="py-4">
          {CONTENT_ROWS.map(row => (
            <ContentCarousel key={row.id} row={row} onSelect={handleSelect} />
          ))}
        </div>
      </main>
      
      {selectedItem && (
        <DetailsModal 
          item={selectedItem} 
          onClose={handleCloseModal}
          onPlay={handlePlay}
        />
      )}

      {playingItem && playingItem.videoUrl && (
        <VideoPlayer 
          videoUrl={playingItem.videoUrl} 
          title={playingItem.title} 
          onClose={handleClosePlayer}
        />
      )}
    </div>
  );
};

export default App;
