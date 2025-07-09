import React from 'react';
import type { Listing } from '../types';

interface ListingCardProps {
    listing: Listing;
}

const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
    }).format(price);
};

const LocationIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
    const API_URL = 'http://157.173.204.194:3001';
    const imageUrl = `${API_URL}${listing.image_url}`;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out flex flex-col h-full">
            <div className="relative">
                <img src={imageUrl} alt={listing.title} className="w-full h-48 object-cover" />
                <span className="absolute top-2 right-2 bg-yellow-400 text-slate-800 text-xs font-bold px-2 py-1 rounded">{listing.category}</span>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-md font-semibold text-slate-800 mb-2 flex-grow min-h-[40px]">{listing.title}</h3>
                <div className="flex items-center text-sm text-slate-600 mb-3">
                    <LocationIcon />
                    <span>{listing.location}</span>
                </div>
                <div className="mt-auto text-right">
                    <p className="text-xl font-bold text-blue-600">{formatPrice(listing.price, listing.currency)}</p>
                </div>
            </div>
        </div>
    );
};

export default ListingCard;