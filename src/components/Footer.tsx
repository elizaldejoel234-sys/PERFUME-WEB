import React from 'react';

interface FooterProps {
  onNavigate?: (view: 'collections' | 'cart' | 'atelier' | 'journal') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0e0e0e] font-label-caps text-xs text-[#c4c7c7] w-full py-12 border-t border-[#444748]/20 px-6 md:px-16 max-w-[1440px] mx-auto mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col gap-2">
          <span className="font-display-xl text-3xl md:text-4xl text-[#c9c6c5] uppercase tracking-tighter">
            L'ÉLITE LUXE
          </span>
          <p className="text-[#c7c6c4] font-light text-[11px] tracking-widest uppercase">
            © 2026 L'ÉLITE LUXE PARIS. TOUS DROITS RÉSERVÉS.
          </p>
        </div>

        <div className="flex flex-wrap md:justify-end gap-x-8 gap-y-3 text-[11px] tracking-widest uppercase">
          <button
            onClick={() => onNavigate?.('collections')}
            className="text-[#797978] hover:text-[#c9c6c5] transition-colors"
          >
            Collections &amp; Archive
          </button>
          <button
            onClick={() => onNavigate?.('atelier')}
            className="text-[#797978] hover:text-[#c9c6c5] transition-colors"
          >
            Atelier Privé
          </button>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-[#797978] hover:text-[#c9c6c5] transition-colors"
          >
            Politique de Confidentialité
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-[#797978] hover:text-[#c9c6c5] transition-colors"
          >
            Conditions Générales
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-[#797978] hover:text-[#c9c6c5] transition-colors"
          >
            Livraison &amp; Retours
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-[#797978] hover:text-[#c9c6c5] transition-colors"
          >
            Store Locator
          </a>
        </div>
      </div>
    </footer>
  );
};
