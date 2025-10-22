
import React, { useState } from 'react';
import { loginUser, registerUser } from '../api';

const StarFlixLogo = () => (
    <div className="flex items-center space-x-4 mb-8">
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/StreamFlix%2B.png" alt="StarFlix+ Logo" className="h-12 object-contain" />
    </div>
);

// New Icon components for show/hide password
const EyeIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639l4.43-6.103a2.25 2.25 0 0 1 3.92 0l2.253 3.098a.5.5 0 0 0 .848 0l2.253-3.098a2.25 2.25 0 0 1 3.92 0l4.43 6.103a1.012 1.012 0 0 1 0 .639l-4.43 6.103a2.25 2.25 0 0 1-3.92 0l-2.253-3.098a.5.5 0 0 0-.848 0l-2.253-3.098a2.25 2.25 0 0 1-3.92 0l-4.43-6.103Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 12.322a3.25 3.25 0 1 1-6.5 0 3.25 3.25 0 0 1 6.5 0Z" />
    </svg>
);

const EyeSlashIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3.25 3.25 0 0 1-4.597-4.597m4.597 4.597-4.597-4.597" />
    </svg>
);

interface AuthProps {
    onAuthSuccess: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!username || !password || (!isLogin && !confirmPassword)) {
            setError('Please fill in all fields.');
            setIsLoading(false);
            return;
        }

        if (!isLogin && password !== confirmPassword) {
            setError('Passwords do not match.');
            setIsLoading(false);
            return;
        }
        
        const email = `${username.toLowerCase()}@starflix.plus`;

        try {
            if (isLogin) {
                await loginUser(email, password);
            } else {
                await registerUser(email, password);
            }
            localStorage.setItem('starflix_session', 'true');
            onAuthSuccess();

        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
    
    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setPassword('');
        setConfirmPassword('');
        setUsername('');
        setShowPassword(false);
    };

    return (
        <div className="min-h-screen bg-[#1a0c05] text-white flex flex-col items-center justify-center p-4">
            <div className="absolute inset-0">
                <img src="https://m.media-amazon.com/images/M/MV5BMDhjZWViN2YtMmUzYS00MGI1LTk3MTQtM2U5N2U2YjU5N2E3XkEyXkFqcGdeQXVyNTE0MDc0NTM@._V1_FMjpg_UX1000_.jpg" alt="background" className="w-full h-full object-cover opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0c05] via-[#1a0c05]/80 to-[#1a0c05]"></div>
            </div>
            
            <div className="relative z-10 w-full max-w-md bg-black/50 backdrop-blur-md p-8 rounded-lg shadow-2xl">
                <div className="flex justify-center">
                    <StarFlixLogo />
                </div>
                <h1 className="text-3xl font-bold text-center mb-6">{isLogin ? 'Sign In' : 'Sign Up'}</h1>
                
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="flex items-center w-full bg-gray-700/50 border border-gray-600 rounded-md focus-within:ring-2 focus-within:ring-red-600 transition-all duration-200 px-4">
                             <input
                                type="text"
                                placeholder="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value.replace(/\s/g, ''))}
                                className="flex-grow bg-transparent py-3 focus:outline-none"
                                aria-label="Username"
                                disabled={isLoading}
                                autoCapitalize="none"
                                autoCorrect="off"
                            />
                            <span className="text-gray-400 select-none">@starflix.plus</span>
                        </div>
                       
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-4 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                                aria-label="Password"
                                disabled={isLoading}
                            />
                             <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white transition-colors duration-200"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                            </button>
                        </div>

                        {!isLogin && (
                           <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-4 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                                    aria-label="Confirm Password"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white transition-colors duration-200"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                </button>
                            </div>
                        )}
                    </div>

                    {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
                    
                    <button type="submit" className="w-full py-3 mt-6 bg-red-600 font-bold rounded-md hover:bg-red-700 transition-colors duration-200 disabled:bg-red-800 disabled:cursor-not-allowed" disabled={isLoading}>
                        {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
                    </button>
                </form>

                <p className="mt-8 text-center text-gray-400">
                    {isLogin ? "New to StarFlix+?" : "Already have an account?"}
                    <button onClick={toggleAuthMode} className="font-semibold text-white hover:underline ml-2" disabled={isLoading}>
                        {isLogin ? 'Sign up now.' : 'Sign in.'}
                    </button>
                </p>
            </div>
        </div>
    );
};
