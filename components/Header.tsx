import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import AuthModal from './AuthModal';
import AddListingModal from './AddListingModal';
import type { Listing } from '../types';

interface HeaderProps {
    onListingAdded: (newListing: Listing) => void;
}

const Header: React.FC<HeaderProps> = ({ onListingAdded }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setSignupModalOpen] = useState(false);
    const [isAddListingModalOpen, setAddListingModalOpen] = useState(false);

    const { currentUser, logout } = useAuth();

    const handleLogout = () => {
        logout();
        toast.success("Başarıyla çıkış yaptınız.");
    };
    
    const UserActions: React.FC<{isMobile?: boolean}> = ({ isMobile = false }) => {
        if (currentUser) {
            return (
                <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'items-center space-x-2'}`}>
                     <button onClick={() => setAddListingModalOpen(true)} className="bg-blue-600 text-white font-bold text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition-colors shadow w-full">
                        <i className="fa-solid fa-plus mr-1"></i>
                        Ücretsiz İlan Ver
                    </button>
                    <button onClick={handleLogout} className={`text-sm font-medium ${isMobile ? 'text-center text-slate-700 hover:bg-slate-100 p-3 rounded-md border border-slate-300 w-full' : 'text-slate-700 hover:text-blue-600 px-3 py-2'}`}>
                        Çıkış Yap
                    </button>
                </div>
            );
        }
        return (
            <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'items-center space-x-2'}`}>
                 <button onClick={() => {
                     if (currentUser) {
                        setAddListingModalOpen(true)
                     } else {
                         setLoginModalOpen(true)
                         toast.info("İlan vermek için giriş yapmalısınız.")
                     }
                    }} className="bg-blue-600 text-white font-bold text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition-colors shadow w-full">
                    <i className="fa-solid fa-plus mr-1"></i>
                    Ücretsiz İlan Ver
                </button>
                <div className={`flex ${isMobile ? 'space-x-2 w-full' : 'items-center space-x-2'}`}>
                    <button onClick={() => setLoginModalOpen(true)} className={`text-sm font-medium ${isMobile ? 'flex-1 text-center text-slate-700 hover:bg-slate-100 p-3 rounded-md border border-slate-300' : 'text-slate-700 hover:text-blue-600 px-3 py-2'}`}>
                        <i className="fa-regular fa-user mr-1"></i>
                        Giriş Yap
                    </button>
                    { !isMobile && <span className="text-slate-300">|</span>}
                    <button onClick={() => setSignupModalOpen(true)} className={`text-sm font-medium ${isMobile ? 'flex-1 text-center text-slate-700 hover:bg-slate-100 p-3 rounded-md border border-slate-300' : 'text-slate-700 hover:text-blue-600 px-3 py-2'}`}>
                        Üye Ol
                    </button>
                </div>
            </div>
        );
    };


    return (
        <>
            <header className="bg-white shadow-md sticky top-0 z-30">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <h1 className="text-2xl sm:text-3xl font-bold text-yellow-500">ilan<span className="text-slate-800">portali</span>.com</h1>

                    <div className="hidden md:flex items-center flex-grow justify-center">
                        <nav className="flex items-center space-x-6 text-sm font-medium text-slate-600">
                            <a href="#" className="hover:text-yellow-500 transition-colors">Emlak</a>
                            <a href="#" className="hover:text-yellow-500 transition-colors">Vasıta</a>
                            <a href="#" className="hover:text-yellow-500 transition-colors">Yedek Parça</a>
                            <a href="#" className="hover:text-yellow-500 transition-colors">İkinci El ve Sıfır Alışveriş</a>
                        </nav>
                    </div>

                    <div className="hidden md:flex items-center space-x-2">
                        <UserActions />
                    </div>

                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)} 
                            className="text-slate-800 focus:outline-none"
                            aria-label="Menüyü aç"
                            aria-expanded={isMenuOpen}
                        >
                            <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl transition-transform duration-300`}></i>
                        </button>
                    </div>
                </div>

                <div className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ease-in-out z-20 ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <nav className="flex flex-col items-start p-4 space-y-1 border-b border-slate-200">
                        <a href="#" className="text-slate-700 hover:bg-slate-100 transition-colors w-full p-2 rounded">Emlak</a>
                        <a href="#" className="text-slate-700 hover:bg-slate-100 transition-colors w-full p-2 rounded">Vasıta</a>
                        <a href="#" className="text-slate-700 hover:bg-slate-100 transition-colors w-full p-2 rounded">Yedek Parça</a>
                        <a href="#" className="text-slate-700 hover:bg-slate-100 transition-colors w-full p-2 rounded">İkinci El ve Sıfır Alışveriş</a>
                    </nav>
                    <div className="p-4">
                         <UserActions isMobile={true} />
                    </div>
                </div>
            </header>

            <AuthModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} mode="login" />
            <AuthModal isOpen={isSignupModalOpen} onClose={() => setSignupModalOpen(false)} mode="signup" />
            {currentUser && <AddListingModal isOpen={isAddListingModalOpen} onClose={() => setAddListingModalOpen(false)} onListingAdded={onListingAdded} />}
        </>
    );
};

export default Header;