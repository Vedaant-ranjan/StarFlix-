import React, { useState, useRef, useEffect } from 'react';

// Icons for player controls
const PlayIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M8 5v14l11-7z"></path></svg>;
const PauseIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>;
const VolumeUpIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>;
const VolumeOffIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path></svg>;
const FullscreenIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path></svg>;
const ArrowBackIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>;


interface NetflixPlayerProps {
    videoUrl: string;
    title: string;
    onClose: () => void;
}

export const NetflixPlayer: React.FC<NetflixPlayerProps> = ({ videoUrl, title, onClose }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showControls, setShowControls] = useState(true);
    let controlTimeout: number;

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    const handleMuteToggle = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    const handleProgressUpdate = () => {
        if (videoRef.current) {
            setProgress(videoRef.current.currentTime);
        }
    };

    const handleDurationChange = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };
    
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (videoRef.current) {
            videoRef.current.currentTime = Number(e.target.value);
            setProgress(Number(e.target.value));
        }
    };

    const toggleFullScreen = () => {
        if (containerRef.current) {
            if (!document.fullscreenElement) {
                containerRef.current.requestFullscreen().catch(err => {
                    alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                });
            } else {
                document.exitFullscreen();
            }
        }
    };
    
    const formatTime = (time: number) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    
    const hideControls = () => {
        setShowControls(false);
    };

    const handleMouseMove = () => {
        setShowControls(true);
        clearTimeout(controlTimeout);
        if (isPlaying) {
             controlTimeout = window.setTimeout(hideControls, 3000);
        }
    };

    useEffect(() => {
        videoRef.current?.play().catch(console.error);
        handleMouseMove(); // Show controls on load
        return () => clearTimeout(controlTimeout);
    }, []);

    return (
        <div 
            ref={containerRef}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center text-white"
            onMouseMove={handleMouseMove}
            onMouseLeave={hideControls}
        >
            <video 
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full"
                onClick={handlePlayPause}
                onTimeUpdate={handleProgressUpdate}
                onDurationChange={handleDurationChange}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />

            <div className={`absolute inset-0 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                {/* Top Controls */}
                <div className="absolute top-0 left-0 right-0 p-4 flex items-center space-x-4 bg-gradient-to-b from-black/70 to-transparent">
                    <button onClick={onClose} aria-label="Go back"><ArrowBackIcon /></button>
                    <h2 className="text-xl font-bold">{title}</h2>
                </div>

                {/* Bottom Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                     <div className="flex items-center space-x-4">
                        <span className="text-sm font-semibold w-12 text-center">{formatTime(progress)}</span>
                        <input
                            type="range"
                            min="0"
                            max={duration || 0}
                            value={progress}
                            onChange={handleSeek}
                            className="netflix-player-seek-bar"
                        />
                        <span className="text-sm font-semibold w-12 text-center">{formatTime(duration)}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-4">
                           <button onClick={handlePlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>{isPlaying ? <PauseIcon /> : <PlayIcon />}</button>
                           <button onClick={handleMuteToggle} aria-label={isMuted ? 'Unmute' : 'Mute'}>{isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}</button>
                        </div>
                         <button onClick={toggleFullScreen} aria-label="Toggle fullscreen"><FullscreenIcon /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};