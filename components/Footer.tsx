
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-800 text-white mt-12">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-sm">
                    <div>
                        <h4 className="font-bold mb-3">Kurumsal</h4>
                        <ul className="space-y-2 text-slate-300">
                            <li><a href="#" className="hover:text-yellow-400">Hakkımızda</a></li>
                            <li><a href="#" className="hover:text-yellow-400">İnsan Kaynakları</a></li>
                            <li><a href="#" className="hover:text-yellow-400">İletişim</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-3">Hizmetlerimiz</h4>
                        <ul className="space-y-2 text-slate-300">
                            <li><a href="#" className="hover:text-yellow-400">Doping</a></li>
                            <li><a href="#" className="hover:text-yellow-400">Güvenli e-Ticaret</a></li>
                            <li><a href="#" className="hover:text-yellow-400">Reklam</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-3">Gizlilik ve Kullanım</h4>
                        <ul className="space-y-2 text-slate-300">
                            <li><a href="#" className="hover:text-yellow-400">Gizlilik Politikası</a></li>
                            <li><a href="#" className="hover:text-yellow-400">Kullanım Koşulları</a></li>
                            <li><a href="#" className="hover:text-yellow-400">Çerez Politikası</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-3">Bizi Takip Edin</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-slate-300 hover:text-yellow-400"><i className="fab fa-facebook-f text-xl"></i></a>
                            <a href="#" className="text-slate-300 hover:text-yellow-400"><i className="fab fa-twitter text-xl"></i></a>
                            <a href="#" className="text-slate-300 hover:text-yellow-400"><i className="fab fa-instagram text-xl"></i></a>
                            <a href="#" className="text-slate-300 hover:text-yellow-400"><i className="fab fa-youtube text-xl"></i></a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-slate-700 pt-6 text-center text-xs text-slate-400">
                    <p>ilanportali.com, bir classifieds clone projesidir.</p>
                    <p>&copy; {new Date().getFullYear()} Tüm hakları saklıdır.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
