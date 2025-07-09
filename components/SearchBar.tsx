
import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
    isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
    const [query, setQuery] = useState<string>('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <section className="bg-yellow-400 py-8 px-4">
            <div className="container mx-auto">
                <form onSubmit={handleSearch} className="bg-white p-2 rounded-md shadow-lg flex flex-col sm:flex-row items-center gap-2">
                    <div className="flex-grow w-full">
                        <label htmlFor="search-input" className="sr-only">Arama</label>
                        <input
                            id="search-input"
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Kelime, ilan no veya kategori ile ara..."
                            className="w-full p-3 text-slate-700 placeholder-slate-400 focus:outline-none rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-600 text-white font-bold px-8 py-3 rounded-md hover:bg-blue-700 transition-all duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center w-full sm:w-40"
                    >
                        {isLoading ? (
                            <i className="fa-solid fa-spinner fa-spin"></i>
                        ) : (
                            <>
                                <i className="fa-solid fa-search mr-2"></i>
                                ARA
                            </>
                        )}
                    </button>
                </form>
                <div className="text-center mt-4">
                    <a href="#" className="text-sm text-slate-800 font-medium hover:underline">Detaylı Arama</a>
                </div>
            </div>
        </section>
    );
};

export default SearchBar;
