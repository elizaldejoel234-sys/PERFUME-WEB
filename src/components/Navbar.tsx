import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, Lock, Sparkles, ChevronRight } from 'lucide-react';
import { ActiveView } from '../types';

interface NavbarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  cartCount: number;
  onOpenCartDrawer: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  cartCount,
  onOpenCartDrawer,
  onOpenSearch,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        id="main-nav"
        className={`hidden md:flex fixed top-0 left-0 w-full z-50 justify-between items-center px-8 md:px-16 py-4 transition-all duration-300 glass-overlay ${
          scrolled ? 'border-b border-[#444748]/30 bg-[#0A0A0A]/90' : 'bg-transparent'
        }`}
      >
        {/* Left Side Links */}
        <div className="flex items-center gap-8 w-1/3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center justify-center p-2 text-[#E5E4E2] hover:text-[#e9c349] transition-colors duration-500 group"
            title="Menu"
            id="mobile-menu-trigger-desktop"
          >
            <Menu className="w-5 h-5 group-hover:scale-90 transition-transform" />
          </button>
          <div className="flex gap-8 ml-2">
            <button
              onClick={() => setActiveView('collections')}
              className={`font-label-caps text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                activeView === 'collections'
                  ? 'text-[#e9c349] border-b border-[#e9c349] pb-0.5'
                  : 'text-[#c4c7c7] nav-link hover:text-[#e9c349]'
              }`}
            >
              Archive & Collections
            </button>
            <button
              onClick={() => setActiveView('collections')}
              className="font-label-caps text-[11px] tracking-[0.2em] uppercase text-[#c4c7c7] nav-link hover:text-[#e9c349] transition-colors duration-500"
            >
              Parfums
            </button>
            <button
              onClick={() => setActiveView('atelier')}
              className={`font-label-caps text-[11px] tracking-[0.2em] uppercase transition-colors duration-500 ${
                activeView === 'atelier'
                  ? 'text-[#e9c349] border-b border-[#e9c349] pb-0.5'
                  : 'text-[#c4c7c7] nav-link hover:text-[#e9c349]'
              }`}
            >
              Atelier
            </button>
            <button
              onClick={() => setActiveView('journal')}
              className={`font-label-caps text-[11px] tracking-[0.2em] uppercase transition-colors duration-500 ${
                activeView === 'journal'
                  ? 'text-[#e9c349] border-b border-[#e9c349] pb-0.5'
                  : 'text-[#c4c7c7] nav-link hover:text-[#e9c349]'
              }`}
            >
              Journal
            </button>
          </div>
        </div>

        {/* Center Brand Title */}
        <div className="w-1/3 flex justify-center">
          <button
            onClick={() => setActiveView('collections')}
            className="font-display-xl text-3xl md:text-4xl tracking-tighter text-[#c9c6c5] hover:opacity-80 transition-opacity uppercase"
          >
            L'ÉLITE LUXE
          </button>
        </div>

        {/* Right Actions */}
        <div className="w-1/3 flex justify-end items-center gap-6">
          {/* Quick Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="relative hidden lg:flex items-center gap-2 border-b border-[#444748]/50 pb-1 w-44 text-left group cursor-pointer"
            id="search-trigger-button"
          >
            <span className="font-label-caps text-[10px] text-[#c4c7c7]/60 group-hover:text-[#c4c7c7] transition-colors uppercase tracking-[0.2em]">
              RECHERCHER...
            </span>
            <Search className="w-4 h-4 text-[#c4c7c7] absolute right-0 group-hover:text-[#e9c349] transition-colors" />
          </button>

          {/* Cart View toggle */}
          <button
            onClick={() => setActiveView('cart')}
            className={`font-label-caps text-[10px] tracking-widest px-3 py-1.5 border transition-all duration-300 hidden xl:flex items-center gap-1.5 ${
              activeView === 'cart'
                ? 'border-[#e9c349] text-[#e9c349] bg-[#e9c349]/10'
                : 'border-[#444748]/50 text-[#c4c7c7] hover:border-[#E5E4E2] hover:text-[#E5E4E2]'
            }`}
            id="view-cart-page-button"
          >
            PANIER ({cartCount})
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCartDrawer}
            className="relative p-2 hover:text-[#e9c349] transition-colors duration-300"
            title="Mon Panier"
            id="open-cart-drawer-icon"
          >
            <ShoppingBag className="w-6 h-6 text-[#c9c6c5]" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-[#e9c349] text-[#3c2f00] text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Header Navigation */}
      <nav className="flex md:hidden fixed top-0 left-0 w-full z-50 justify-between items-center px-4 py-3 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-[#444748]/20 min-h-[56px]">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-[#c9c6c5] hover:text-[#e9c349] active:scale-95 transition-all p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md"
          id="mobile-hamburger-btn"
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <button
          onClick={() => setActiveView('collections')}
          className="font-display-xl text-2xl tracking-tighter text-[#c9c6c5] uppercase active:opacity-80"
        >
          L'ÉLITE LUXE
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={onOpenSearch}
            className="text-[#c9c6c5] hover:text-[#e9c349] p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md active:scale-95"
            aria-label="Rechercher"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={onOpenCartDrawer}
            className="relative text-[#c9c6c5] hover:text-[#e9c349] p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md active:scale-95"
            aria-label="Mon Panier"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#e9c349] text-[#3c2f00] text-[9px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar (App-like UX) */}
      <nav className="flex md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0e0e0e]/95 backdrop-blur-2xl border-t border-[#444748]/30 px-3 py-2 justify-around items-center text-center shadow-2xl">
        <button
          onClick={() => setActiveView('collections')}
          className={`flex flex-col items-center gap-1 py-1 px-3 min-w-[56px] min-h-[44px] transition-colors ${
            activeView === 'collections' ? 'text-[#e9c349]' : 'text-[#8e9192]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span className="font-label-caps text-[9px] tracking-wider uppercase">Archive</span>
        </button>

        <button
          onClick={() => setActiveView('atelier')}
          className={`flex flex-col items-center gap-1 py-1 px-3 min-w-[56px] min-h-[44px] transition-colors ${
            activeView === 'atelier' ? 'text-[#e9c349]' : 'text-[#8e9192]'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span className="font-label-caps text-[9px] tracking-wider uppercase">Atelier</span>
        </button>

        <button
          onClick={onOpenSearch}
          className="flex flex-col items-center gap-1 py-1 px-3 min-w-[56px] min-h-[44px] text-[#8e9192] hover:text-[#e9c349] transition-colors"
        >
          <Search className="w-4 h-4" />
          <span className="font-label-caps text-[9px] tracking-wider uppercase">Chercher</span>
        </button>

        <button
          onClick={() => setActiveView('cart')}
          className={`relative flex flex-col items-center gap-1 py-1 px-3 min-w-[56px] min-h-[44px] transition-colors ${
            activeView === 'cart' ? 'text-[#e9c349]' : 'text-[#8e9192]'
          }`}
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 bg-[#e9c349] text-[#3c2f00] text-[8px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="font-label-caps text-[9px] tracking-wider uppercase">Panier</span>
        </button>

        <button
          onClick={() => setActiveView('journal')}
          className={`flex flex-col items-center gap-1 py-1 px-3 min-w-[56px] min-h-[44px] transition-colors ${
            activeView === 'journal' ? 'text-[#e9c349]' : 'text-[#8e9192]'
          }`}
        >
          <ChevronRight className="w-4 h-4 transform rotate-90" />
          <span className="font-label-caps text-[9px] tracking-wider uppercase">Journal</span>
        </button>
      </nav>

      {/* Mobile Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-14 z-40 bg-[#0A0A0A]/98 backdrop-blur-2xl md:hidden flex flex-col p-6 pb-20 justify-between animate-in fade-in duration-300 border-t border-[#444748]/30 overflow-y-auto">
          <div className="flex flex-col gap-5 mt-2">
            <button
              onClick={() => {
                setActiveView('collections');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between text-left font-display-xl text-2xl text-[#E5E4E2] hover:text-[#e9c349] active:text-[#e9c349] transition-colors border-b border-[#444748]/20 pb-4 min-h-[48px]"
            >
              <span>ARCHIVE &amp; COLLECTIONS</span>
              <ChevronRight className="w-5 h-5 text-[#e9c349]" />
            </button>
            <button
              onClick={() => {
                setActiveView('cart');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between text-left font-display-xl text-2xl text-[#E5E4E2] hover:text-[#e9c349] active:text-[#e9c349] transition-colors border-b border-[#444748]/20 pb-4 min-h-[48px]"
            >
              <span>MON PANIER ({cartCount})</span>
              <ChevronRight className="w-5 h-5 text-[#e9c349]" />
            </button>
            <button
              onClick={() => {
                setActiveView('atelier');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between text-left font-display-xl text-2xl text-[#E5E4E2] hover:text-[#e9c349] active:text-[#e9c349] transition-colors border-b border-[#444748]/20 pb-4 min-h-[48px]"
            >
              <span>L'ATELIER &amp; SAVOIR-FAIRE</span>
              <ChevronRight className="w-5 h-5 text-[#e9c349]" />
            </button>
            <button
              onClick={() => {
                setActiveView('journal');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between text-left font-display-xl text-2xl text-[#E5E4E2] hover:text-[#e9c349] active:text-[#e9c349] transition-colors border-b border-[#444748]/20 pb-4 min-h-[48px]"
            >
              <span>LE JOURNAL DE L'ÉLITE</span>
              <ChevronRight className="w-5 h-5 text-[#e9c349]" />
            </button>
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-[#444748]/30">
            <div className="flex items-center gap-2 text-[#c4c7c7] font-label-tech text-xs">
              <Lock className="w-3.5 h-3.5 text-[#e9c349]" />
              <span>PAIEMENT SÉCURISÉ &amp; EXPÉDITION MONDIALE</span>
            </div>
            <p className="font-label-caps text-[10px] text-[#8e9192] uppercase tracking-widest">
              L'ÉLITE LUXE PARIS © 2026
            </p>
          </div>
        </div>
      )}
    </>
  );
};
