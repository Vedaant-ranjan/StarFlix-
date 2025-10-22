
import React from 'react';
import type { View } from '../App';

interface NavIconProps {
    label: string;
    isActive: boolean;
    children: React.ReactNode;
    onClick?: () => void;
}

const NavIcon: React.FC<NavIconProps> = ({ label, children, isActive, onClick }) => (
    <a href="#" onClick={(e) => { e.preventDefault(); onClick?.(); }} className={`flex items-center space-x-4 p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 ${isActive ? 'bg-white/10' : ''}`}>
        {children}
        <span className={`text-lg sidebar-label whitespace-nowrap ${isActive ? 'font-bold text-white' : 'font-semibold text-gray-300'}`}>{label}</span>
    </a>
);

const SearchIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);
const HomeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);
const TvIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);
const FilmIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
    </svg>
);
const ListIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

interface SidebarProps {
    currentView: View;
    setView: (view: View) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
    return (
        <nav className="fixed top-0 left-0 h-full w-20 bg-black/30 backdrop-blur-md z-30 flex flex-col items-center justify-between py-6 sidebar transition-all duration-300 ease-in-out" tabIndex={0}>
            <div className="flex flex-col items-start space-y-4 w-full px-4">
                 <a href="#" onClick={(e) => { e.preventDefault(); setView('home'); }} className="flex items-center space-x-4 p-3 rounded-lg mb-8" aria-label="StarFlix+ Home">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/StreamFlix%2B.png" alt="StarFlix+ Logo" className="h-8 object-contain flex-shrink-0" />
                 </a>
                <NavIcon label="Search" isActive={currentView === 'search'} onClick={() => setView('search')}><SearchIcon /></NavIcon>
                <NavIcon label="Home" isActive={currentView === 'home'} onClick={() => setView('home')}><HomeIcon /></NavIcon>
                <NavIcon label="Shows" isActive={currentView === 'shows'} onClick={() => setView('shows')}><TvIcon /></NavIcon>
                <NavIcon label="Movies" isActive={currentView === 'movies'} onClick={() => setView('movies')}><FilmIcon /></NavIcon>
                <NavIcon label="My List" isActive={currentView === 'myList'} onClick={() => setView('myList')}><ListIcon /></NavIcon>
            </div>
            <div className="flex flex-col items-start space-y-4 w-full px-4">
                {/* Placeholder for future items like settings or profile */}
            </div>
        </nav>
    );
};
