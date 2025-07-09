import { api } from './api';
import type { Listing } from '../types';

export const fetchListingsFromAPI = async (): Promise<Listing[]> => {
    try {
        const response = await api.get('/listings');
        return response;
    } catch (error) {
        console.error("Error fetching listings from API:", error);
        throw error;
    }
};