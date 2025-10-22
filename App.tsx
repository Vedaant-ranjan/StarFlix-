import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { ContentCarousel } from './components/ContentCarousel';
import { VideoPlayer } from './components/VideoPlayer';
import { DetailsModal } from './components/DetailsModal';
import { HERO_DATA, CONTENT_ROWS } from './constants';
import type { ContentItem, HeroData } from './types';

const App: React.FC = () => {
  const [playingItem, setPlayingItem] = useState<ContentItem | null>(null);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  const handleSelectItem = useCallback((item: ContentItem) => {
    setSelectedItem(item);
  }, []);

  const handlePlay = useCallback((item: ContentItem | HeroData) => {
    setSelectedItem(null); // Close modal when playing
    setPlayingItem(item);
  }, []);

  const handleClosePlayer = useCallback(() => {
    setPlayingItem(null);
  }, []);
  
  const handleCloseModal = useCallback(() => {
    setSelectedItem(null);
  }, []);


  return (
    <div className="bg-[#1a0c05] text-white min-h-screen">
      <Sidebar />
      <main className="with-sidebar">
        <Hero data={HERO_DATA} onPlay={handlePlay} />
        <div className="pt-8 pb-16">
            {CONTENT_ROWS.map(row => (
                <ContentCarousel key={row.id} row={row} onSelect={handleSelectItem} />
            ))}
        </div>
      </main>
      {selectedItem && <DetailsModal item={selectedItem} onClose={handleCloseModal} onPlay={handlePlay} />}
      {playingItem && <VideoPlayer item={playingItem} onClose={handleClosePlayer} />}
    </div>
  );
};

export default App;
