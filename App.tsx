
import React, { useState, useCallback, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { ContentCarousel } from './components/ContentCarousel';
import { VideoPlayer } from './components/VideoPlayer';
import { DetailsModal } from './components/DetailsModal';
import { ContentGrid } from './components/ContentGrid';
import { PlaceholderView } from './components/PlaceholderView';
import { SearchView } from './components/SearchView';
import { HERO_DATA, CONTENT_ROWS as staticContentRows } from './constants';
import type { ContentItem, HeroData, ContentRow } from './types';

const getAllContentItems = (rows: ContentRow[]): ContentItem[] => {
    const allItems = rows.flatMap(row => row.items);
    // Ensure Hero data is part of the searchable/filterable content
    const heroDataAsContentItem: ContentItem = HERO_DATA;
    if (!allItems.some(item => item.id === heroDataAsContentItem.id)) {
        return [heroDataAsContentItem, ...allItems];
    }
    return allItems;
};
const allContentItems = getAllContentItems(staticContentRows);

const getWatchHistory = (): { [id: string]: { progress: number; duration: number; lastWatched: number } } => {
    try {
        const history = localStorage.getItem('watchHistory');
        return history ? JSON.parse(history) : {};
    } catch (e) {
        console.error("Failed to parse watch history:", e);
        return {};
    }
};

export type View = 'home' | 'search' | 'shows' | 'movies' | 'myList';

const App: React.FC = () => {
  const [playingItem, setPlayingItem] = useState<ContentItem | null>(null);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [contentRows, setContentRows] = useState<ContentRow[]>(staticContentRows);
  const [currentView, setCurrentView] = useState<View>('home');
  const [myListIds, setMyListIds] = useState<Set<number>>(new Set());

  // Load My List from localStorage on initial render
  useEffect(() => {
    try {
      const storedList = localStorage.getItem('starflix_myList');
      if (storedList) {
        setMyListIds(new Set(JSON.parse(storedList)));
      }
    } catch (e) {
      console.error("Failed to load My List:", e);
      setMyListIds(new Set());
    }
  }, []);

  // Save My List to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('starflix_myList', JSON.stringify(Array.from(myListIds)));
    } catch (e) {
      console.error("Failed to save My List:", e);
    }
  }, [myListIds]);


  const updateContinueWatching = useCallback(() => {
    const history = getWatchHistory();
    const updatedHistory = { ...history };
    let historyWasCleaned = false;

    const continueWatchingItems: ContentItem[] = Object.entries(history)
        .sort(([, a], [, b]) => b.lastWatched - a.lastWatched)
        .map(([id, historyItem]): ContentItem | null => {
            const item = allContentItems.find(i => i.id.toString() === id);
            if (!item || !historyItem.duration || historyItem.duration === 0) return null;

            const progressPercent = (historyItem.progress / historyItem.duration) * 100;

            if (progressPercent < 5 || progressPercent > 95) {
                delete updatedHistory[id];
                historyWasCleaned = true;
                return null;
            }

            return { ...item, progress: progressPercent };
        })
        .filter((item): item is ContentItem => item !== null);

    if (historyWasCleaned) {
        localStorage.setItem('watchHistory', JSON.stringify(updatedHistory));
    }

    setContentRows(() => {
        const otherRows = staticContentRows.filter(row => row.id !== 'continue-watching');
        if (continueWatchingItems.length > 0) {
            return [
                { id: 'continue-watching', title: 'Continue Watching', items: continueWatchingItems },
                ...otherRows,
            ];
        }
        return otherRows;
    });
  }, []);

  useEffect(() => {
    updateContinueWatching();
  }, [updateContinueWatching]);
  
  const handleSelectItem = useCallback((item: ContentItem) => {
    setSelectedItem(item);
  }, []);

  const handlePlay = useCallback((item: ContentItem | HeroData) => {
    setSelectedItem(null); 
    setPlayingItem(item);
  }, []);

  const handleClosePlayer = useCallback(() => {
    setPlayingItem(null);
    updateContinueWatching();
  }, [updateContinueWatching]);
  
  const handleCloseModal = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const handleToggleMyList = useCallback((item: ContentItem) => {
    setMyListIds(prevIds => {
        const newIds = new Set(prevIds);
        if (newIds.has(item.id)) {
            newIds.delete(item.id);
        } else {
            newIds.add(item.id);
        }
        return newIds;
    });
  }, []);
  
  const isItemInMyList = (item: ContentItem) => myListIds.has(item.id);

  const renderMainContent = () => {
    switch (currentView) {
        case 'home':
            return (
                <>
                    <Hero data={HERO_DATA} onPlay={handlePlay} />
                    <div className="pt-8 pb-16">
                        {contentRows.map(row => (
                            <ContentCarousel key={row.id} row={row} onSelect={handleSelectItem} />
                        ))}
                    </div>
                </>
            );
        case 'movies':
            const movies = allContentItems.filter(item => item.category === 'Movie');
            return <div className="pt-20"><ContentGrid title="Movies" items={movies} onSelect={handleSelectItem} /></div>;
        case 'shows':
            const shows = allContentItems.filter(item => item.category === 'Show');
            return <div className="pt-20"><ContentGrid title="TV Shows" items={shows} onSelect={handleSelectItem} /></div>;
        case 'search':
            return <SearchView allItems={allContentItems} onSelect={handleSelectItem} />;
        case 'myList':
            const myListItems = allContentItems.filter(item => myListIds.has(item.id));
            if (myListItems.length === 0) {
              return <PlaceholderView title="My List" message="You haven't added anything to your list yet." />;
            }
            return <div className="pt-20"><ContentGrid title="My List" items={myListItems} onSelect={handleSelectItem} /></div>;
        default:
            return null;
    }
  };

  return (
    <div className="bg-[#1a0c05] text-white min-h-screen">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      <main className="with-sidebar">
        {renderMainContent()}
      </main>
      {selectedItem && 
        <DetailsModal 
            item={selectedItem} 
            onClose={handleCloseModal} 
            onPlay={handlePlay}
            isItemInMyList={isItemInMyList(selectedItem)}
            onToggleMyList={() => handleToggleMyList(selectedItem)}
        />}
      {playingItem && <VideoPlayer item={playingItem} onClose={handleClosePlayer} />}
    </div>
  );
};

export default App;
