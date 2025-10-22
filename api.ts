
/**
 * Mock API for StarFlix+ Authentication.
 * In a real-world application, this would be a set of secure backend endpoints.
 * Here, we use localStorage to simulate a persistent user database and
 * setTimeout to mimic network latency.
 */

const USERS_DB_KEY = 'starflix_users_hashed';

/**
 * Hashes a string using the SHA-256 algorithm.
 * @param text The string to hash.
 * @returns A promise that resolves to the hex-encoded hash string.
 */
async function hashText(text: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Simulates an API call to register a new user.
 * @param email The user's email.
 * @param password The user's plaintext password.
 * @returns A promise that resolves on successful registration or rejects with an error message.
 */
export const registerUser = (email: string, password: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            await new Promise(res => setTimeout(res, 500)); // Simulate network delay

            const users = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '{}');

            if (users[email]) {
                return reject(new Error('An account with this email already exists.'));
            }

            const hashedPassword = await hashText(password);
            const newUsers = { ...users, [email]: hashedPassword };
            localStorage.setItem(USERS_DB_KEY, JSON.stringify(newUsers));
            
            resolve();

        } catch (error) {
            console.error('Registration failed:', error);
            reject(new Error('An unexpected error occurred during sign-up.'));
        }
    });
};

/**
 * Simulates an API call to log in a user.
 * @param email The user's email.
 * @param password The user's plaintext password.
 * @returns A promise that resolves on successful login or rejects with an error message.
 */
export const loginUser = (email: string, password: string): Promise<void> => {
     return new Promise(async (resolve, reject) => {
        try {
            await new Promise(res => setTimeout(res, 500)); // Simulate network delay

            const users = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '{}');
            const hashedPassword = await hashText(password);
            
            if (users[email] && users[email] === hashedPassword) {
                resolve();
            } else {
                reject(new Error('Invalid username or password.'));
            }
        } catch (error) {
            console.error('Login failed:', error);
            reject(new Error('An unexpected error occurred during sign-in.'));
        }
    });
};