
import React from 'react';
import ListingCard from './ListingCard';
import type { Listing } from '../types';

interface ListingGridProps {
    listings: Listing[];
    isLoading: boolean;
    error: string | null;
}

const SkeletonCard: React.FC = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
        <div className="bg-slate-300 h-48 w-full"></div>
        <div className="p-4">
            <div className="h-4 bg-slate-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-slate-300 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-slate-300 rounded w-1/3 ml-auto"></div>
        </div>
    </div>
);

const ListingGrid: React.FC<ListingGridProps> = ({ listings, isLoading, error }) => {
    if (error) {
        return <div className="text-center py-10 text-red-500 font-semibold">{error}</div>;
    }

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {Array.from({ length: 10 }).map((_, index) => <SkeletonCard key={index} />)}
            </div>
        );
    }
    
    if (listings.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-lg shadow">
                 <i className="fa-solid fa-box-open text-5xl text-slate-300 mb-4"></i>
                <h3 className="text-xl font-semibold text-slate-700">Sonuç Bulunamadı</h3>
                <p className="text-slate-500 mt-2">Arama kriterlerinize uygun ilan bulunamadı. Farklı kelimelerle tekrar deneyin.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
            ))}
        </div>
    );
};

export default ListingGrid;
