import React from 'react';

interface PlaceholderViewProps {
    title: string;
    message: string;
}

export const PlaceholderView: React.FC<PlaceholderViewProps> = ({ title, message }) => (
    <div className="pt-20 text-center flex flex-col items-center justify-center h-full min-h-[calc(100vh-80px)]">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-xl text-gray-400">{message}</p>
    </div>
);