import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User } from '../types';
import { api, setAuthToken } from '../services/api';
import { toast } from 'react-toastify';

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    login: (credentials: { email: string, password: string }) => Promise<void>;
    signup: (credentials: { email: string, password:string }) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    
    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setAuthToken(null);
        setCurrentUser(null);
    }, []);

    const verifyUser = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthToken(token);
            try {
                const res = await api.get('/auth/me');
                // Handle both { user: {...} } and {...} as valid responses
                const userPayload = res.user || res;
                if (userPayload && userPayload.id) {
                    setCurrentUser(userPayload);
                } else {
                    logout();
                }
            } catch (err) {
                // Token is likely invalid or expired
                logout();
            }
        }
        setLoading(false);
    }, [logout]);

    useEffect(() => {
        verifyUser();
    }, [verifyUser]);

    const login = async (credentials: {email: string, password: string}) => {
        const res = await api.post('/auth/login', credentials);
        const { token, user } = res;

        if (!token || !user) {
            throw new Error('Sunucudan geçersiz yanıt alındı. Lütfen tekrar deneyin.');
        }

        localStorage.setItem('token', token);
        setAuthToken(token);
        setCurrentUser(user);
    };
    
    const signup = async (credentials: {email: string, password: string}) => {
        const res = await api.post('/auth/register', credentials);
        const { token, user } = res;

        if (!token || !user) {
            throw new Error('Sunucudan geçersiz kayıt yanıtı alındı. Lütfen tekrar deneyin.');
        }

        localStorage.setItem('token', token);
        setAuthToken(token);
        setCurrentUser(user);
    };


    const value = {
        currentUser,
        loading,
        login,
        signup,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};