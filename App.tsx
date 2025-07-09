import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ListingGrid from './components/ListingGrid';
import Footer from './components/Footer';
import type { Listing } from './types';
import { fetchListingsFromAPI } from './services/listingService';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';


const App: React.FC = () => {
    const [allListings, setAllListings] = useState<Listing[]>([]);
    const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('Öne Çıkan İlanlar');
    const [sortOrder, setSortOrder] = useState('newest');

    const fetchListings = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchListingsFromAPI();
            setAllListings(data);
            setFilteredListings(data); // Initially show all
        } catch (err) {
            setError('İlanlar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchListings();
    }, [fetchListings]);

    const handleSearch = (query: string) => {
        setTitle(query ? `"${query}" için Arama Sonuçları` : 'Tüm İlanlar');
        if (!query) {
            setFilteredListings(allListings);
            return;
        }
        const lowercasedQuery = query.toLowerCase();
        const results = allListings.filter(listing =>
            listing.title.toLowerCase().includes(lowercasedQuery) ||
            listing.category.toLowerCase().includes(lowercasedQuery) ||
            listing.location.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredListings(results);
    };

    const handleListingAdded = (newListing: Listing) => {
        const updatedListings = [newListing, ...allListings];
        setAllListings(updatedListings);
        setFilteredListings(updatedListings);
    };

    const sortedListings = useMemo(() => {
        return [...filteredListings].sort((a, b) => {
            switch (sortOrder) {
                case 'price_asc':
                    return a.price - b.price;
                case 'price_desc':
                    return b.price - a.price;
                case 'newest':
                default:
                    // Compare dates by converting string to Date object
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            }
        });
    }, [filteredListings, sortOrder]);


    return (
        <AuthProvider>
            <div className="flex flex-col min-h-screen">
                <Header onListingAdded={handleListingAdded} />
                <SearchBar onSearch={handleSearch} isLoading={isLoading} />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
                        <div className="flex items-center space-x-2 text-sm w-full sm:w-auto justify-end">
                            <label htmlFor="sorting-select" className="text-slate-600 font-medium">Sırala:</label>
                            <select 
                                id="sorting-select" 
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
                            >
                                <option value="newest">Tarihe Göre (En Yeni)</option>
                                <option value="price_asc">Fiyata Göre (Artan)</option>
                                <option value="price_desc">Fiyata Göre (Azalan)</option>
                            </select>
                        </div>
                    </div>
                    <ListingGrid listings={sortedListings} isLoading={isLoading} error={error} />
                </main>
                <Footer />
                <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
            </div>
        </AuthProvider>
    );
};

export default App;