
import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { ContentItem } from '../types';

// Player Icons
const PlayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" /></svg>;
const PauseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm9 0a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" /></svg>;
const VolumeUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.66 1.905H6.44l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06ZM18.584 12c0-1.857-.87-3.534-2.274-4.634a.75.75 0 1 0-.916 1.168A3.003 3.003 0 0 1 17.084 12a3 3 0 0 1-1.69 2.465.75.75 0 1 0 .916 1.169c1.403-1.1 2.274-2.777 2.274-4.634Z" /><path d="M21.168 12c0-3.23-1.58-6.107-4.133-7.85a.75.75 0 1 0-.916 1.168A6.002 6.002 0 0 1 19.668 12a6.002 6.002 0 0 1-3.545 5.313.75.75 0 0 0 .916 1.168C19.588 18.107 21.168 15.23 21.168 12Z" /></svg>;
const VolumeMuteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.66 1.905H6.44l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06ZM16.598 12l2.206-2.206a.75.75 0 0 0-1.06-1.06L15.537 10.94l-2.206-2.207a.75.75 0 0 0-1.061 1.061L14.476 12l-2.206 2.206a.75.75 0 1 0 1.06 1.06L15.537 13.06l2.206 2.206a.75.75 0 0 0 1.06-1.06L16.598 12Z" /></svg>;
const FullscreenEnterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>;
const FullscreenExitIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9V4.5M15 9h4.5M15 9l5.25-5.25M15 15v4.5M15 15h4.5M15 15l5.25 5.25" /></svg>;
const BackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>;

interface VideoPlayerProps {
  item: ContentItem;
  onClose: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ item, onClose }) => {
  const { id, videoUrl, title, progress: initialProgressPercent } = item;
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const controlsTimeoutRef = useRef<number | null>(null);

  const clearProgress = useCallback(() => {
    if (typeof id === 'undefined') return;
    try {
        const history = JSON.parse(localStorage.getItem('watchHistory') || '{}');
        if (history[id]) {
            delete history[id];
            localStorage.setItem('watchHistory', JSON.stringify(history));
        }
    } catch (e) {
        console.error("Failed to clear watch history:", e);
    }
  }, [id]);

  const saveProgress = useCallback((video: HTMLVideoElement) => {
    if (typeof id === 'undefined' || !video.duration || isNaN(video.duration)) return;

    const currentTime = video.currentTime;
    const duration = video.duration;
    const progressPercent = (currentTime / duration) * 100;

    if (progressPercent < 5 || progressPercent > 95) {
      clearProgress();
      return;
    }

    try {
        const history = JSON.parse(localStorage.getItem('watchHistory') || '{}');
        history[id] = { progress: currentTime, duration: duration, lastWatched: Date.now() };
        localStorage.setItem('watchHistory', JSON.stringify(history));
    } catch (e) {
        console.error("Failed to save watch history:", e);
    }
  }, [id, clearProgress]);


  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, []);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const seekTime = Number(e.target.value);
      videoRef.current.currentTime = seekTime;
      setProgress(seekTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     if (videoRef.current) {
      const newVolume = Number(e.target.value);
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      const newMuted = !videoRef.current.muted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
      if(!newMuted && videoRef.current.volume === 0) {
        videoRef.current.volume = 0.5;
        setVolume(0.5);
      }
    }
  }, []);

  const toggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
        playerContainerRef.current?.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
  }, []);

  const showControls = useCallback(() => {
    setIsControlsVisible(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (!videoRef.current?.paused) {
        setIsControlsVisible(false);
      }
    }, 3000);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setProgress(video.currentTime);
    const handleLoadedMetadata = () => {
        setDuration(video.duration);
        if (initialProgressPercent && video.duration > 0) {
            const startTime = (initialProgressPercent / 100) * video.duration;
            if (startTime < video.duration * 0.95) {
                video.currentTime = startTime;
            }
        }
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => clearProgress();
    
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    
    video.play().catch(() => setIsPlaying(false));
    showControls();

    const progressInterval = setInterval(() => {
        if (video && !video.paused) {
            saveProgress(video);
        }
    }, 5000);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      
      clearInterval(progressInterval);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      if (video) saveProgress(video);
    };
  }, [id, initialProgressPercent, saveProgress, clearProgress, showControls]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        showControls();
        
        const activeEl = document.activeElement as HTMLElement;
        const isInputFocused = activeEl?.tagName === 'INPUT' && activeEl.getAttribute('type') === 'range';

        const keyMap: Record<string, () => void> = {
            ' ': handlePlayPause,
            'Enter': () => {
              if (activeEl && typeof activeEl.click === 'function') {
                activeEl.click();
              } else {
                handlePlayPause();
              }
            },
            'Escape': onClose,
            'f': toggleFullScreen,
            'm': toggleMute,
            'ArrowRight': () => { if (videoRef.current && !isInputFocused) videoRef.current.currentTime += 5; },
            'ArrowLeft': () => { if (videoRef.current && !isInputFocused) videoRef.current.currentTime -= 5; },
            'ArrowUp': () => { if (videoRef.current) setVolume(v => Math.min(1, v + 0.1)); },
            'ArrowDown': () => { if (videoRef.current) setVolume(v => Math.max(0, v - 0.1)); },
        };
        if (keyMap[e.key]) {
            e.preventDefault();
            keyMap[e.key]();
        }
    };
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);

    const container = playerContainerRef.current;
    container?.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      container?.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [onClose, handlePlayPause, toggleFullScreen, toggleMute, volume, showControls]);

  useEffect(() => {
    if(videoRef.current) videoRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    // Focus the player container so it can receive key events
    playerContainerRef.current?.focus();
  }, []);
  
  return (
    <div ref={playerContainerRef} tabIndex={-1} className="fixed inset-0 bg-black z-[100] flex justify-center items-center cursor-none outline-none">
      <video ref={videoRef} src={videoUrl} className="w-full h-full object-contain" />
      
      <div className={`fixed inset-0 transition-opacity duration-300 ${isControlsVisible ? 'opacity-100' : 'opacity-0'}`} onClick={e => e.stopPropagation()}>
        {/* Top Overlay */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent flex items-center">
            <button onClick={onClose} className="text-white p-2 rounded-full hover:bg-white/20">
                <BackIcon />
            </button>
            <h2 className="text-2xl font-bold ml-4">{title}</h2>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          {/* Seek Bar */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold">{formatTime(progress)}</span>
            <input
              type="range"
              min="0"
              max={duration}
              value={progress}
              onChange={handleSeek}
              className="w-full netflix-player-seek-bar"
              aria-label="Seek progress"
            />
            <span className="text-sm font-semibold">{formatTime(duration)}</span>
          </div>
          {/* Control Buttons */}
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-4">
              <button onClick={handlePlayPause} className="text-white p-2" aria-label={isPlaying ? 'Pause' : 'Play'}>
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <div className="flex items-center gap-2 group">
                <button onClick={toggleMute} className="text-white p-2" aria-label={isMuted || volume === 0 ? 'Unmute' : 'Mute'}>
                    {isMuted || volume === 0 ? <VolumeMuteIcon/> : <VolumeUpIcon/>}
                </button>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-24 netflix-player-volume-slider opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200"
                    aria-label="Volume control"
                />
              </div>
            </div>
            <div>
              <button onClick={toggleFullScreen} className="text-white p-2" aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>
                {isFullscreen ? <FullscreenExitIcon /> : <FullscreenEnterIcon />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};