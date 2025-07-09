import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Modal from './Modal';
import { api } from '../services/api';
import { Listing } from '../types';

interface AddListingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onListingAdded: (newListing: Listing) => void;
}

const AddListingModal: React.FC<AddListingModalProps> = ({ isOpen, onClose, onListingAdded }) => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('Emlak');
    const [image, setImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    
    const resetForm = () => {
        setTitle('');
        setPrice('');
        setLocation('');
        setCategory('Emlak');
        setImage(null);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) {
            toast.error("Lütfen bir resim yükleyin.");
            return;
        }
        setIsLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('location', location);
        formData.append('category', category);
        formData.append('image', image);
        formData.append('currency', 'TRY');


        try {
            const res = await api.post('/listings', formData);
            const newListing = res.listing || res; // Handle both nested and direct response

            if (newListing && newListing.id) {
                onListingAdded(newListing);
                toast.success('İlanınız başarıyla eklendi!');
                resetForm();
                onClose();
            } else {
                 throw new Error('İlan eklendi ancak sunucudan geçersiz yanıt alındı.');
            }
            
        } catch (error: any) {
            console.error("Error adding document: ", error);
            const errorMessage = error.response?.data?.message || error.message || 'İlan eklenirken bir hata oluştu.';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
     return (
        <Modal isOpen={isOpen} onClose={onClose} title="Yeni İlan Ekle">
            <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                    <label htmlFor="title" className="block text-sm font-medium text-slate-700">İlan Başlığı</label>
                    <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>
                 <div>
                    <label htmlFor="price" className="block text-sm font-medium text-slate-700">Fiyat (TRY)</label>
                    <input id="price" type="number" value={price} onChange={e => setPrice(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>
                 <div>
                    <label htmlFor="location" className="block text-sm font-medium text-slate-700">Konum (İl, İlçe)</label>
                    <input id="location" type="text" value={location} onChange={e => setLocation(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Örn: İstanbul, Kadıköy" />
                </div>
                 <div>
                    <label htmlFor="category" className="block text-sm font-medium text-slate-700">Kategori</label>
                    <select id="category" value={category} onChange={e => setCategory(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        <option>Emlak</option>
                        <option>Vasıta</option>
                        <option>Elektronik</option>
                        <option>Ev Eşyası</option>
                        <option>Bebek Ürünleri</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="image" className="block text-sm font-medium text-slate-700">İlan Resmi</label>
                    <input id="image" type="file" onChange={handleImageChange} required className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                </div>
                 <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 flex justify-center items-center">
                    {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'İlanı Yayınla'}
                </button>
            </form>
        </Modal>
    );
};

export default AddListingModal;