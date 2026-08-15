import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = products.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      p.name.toLowerCase().includes(term) ||
      p.subtitle.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-2xl p-6 md:p-12 overflow-y-auto animate-in fade-in duration-300 flex flex-col justify-start">
      <div className="max-w-4xl mx-auto w-full">
        {/* Top Header */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#444748]/30">
          <span className="font-label-caps text-xs text-[#e9c349] tracking-widest uppercase">
            RECHERCHE DANS L'ARCHIVE L'ÉLITE LUXE
          </span>
          <button
            onClick={onClose}
            className="p-2 text-[#c4c7c7] hover:text-[#E5E4E2] transition-colors"
            title="Fermer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Input Field */}
        <div className="relative mb-12">
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Mots-clés: Nuit, Obsidienne, Or, Cuir, Parfum..."
            className="w-full bg-transparent border-b-2 border-[#E5E4E2] pb-4 text-2xl md:text-4xl font-display-xl text-[#E5E4E2] placeholder:text-[#444748] focus:outline-none focus:border-[#e9c349]"
          />
          <Search className="w-8 h-8 text-[#e9c349] absolute right-2 top-2" />
        </div>

        {/* Suggestions / Popular Searches */}
        {!searchTerm && (
          <div className="mb-12">
            <h4 className="font-label-caps text-xs text-[#8e9192] uppercase tracking-widest mb-4">
              RECHERCHES POPULAIRES
            </h4>
            <div className="flex flex-wrap gap-3">
              {['Nuit d\'Obsidienne', 'Sac L\'Ombre', 'Parfum', 'Anneau', 'Couture', 'Cachemire'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchTerm(tag)}
                  className="px-4 py-2 border border-[#444748]/40 rounded-full font-label-tech text-xs text-[#c4c7c7] hover:border-[#e9c349] hover:text-[#e9c349] transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Grid */}
        {searchTerm && (
          <div>
            <h4 className="font-label-caps text-xs text-[#8e9192] uppercase tracking-widest mb-6">
              RÉSULTATS ({filtered.length})
            </h4>

            {filtered.length === 0 ? (
              <p className="font-body-rt text-sm text-[#8e9192] font-light">
                Aucun article ne correspond à votre recherche.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      onSelectProduct(prod);
                      onClose();
                    }}
                    className="flex gap-4 p-4 bg-[#131313] border border-[#444748]/30 hover:border-[#e9c349] rounded cursor-pointer transition-all duration-300 group"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-20 h-24 object-cover rounded bg-[#20201f] shrink-0"
                    />
                    <div className="flex flex-col justify-between flex-grow">
                      <div>
                        <span className="font-label-caps text-[9px] text-[#e9c349] block mb-1">
                          {prod.category} // {prod.codeNumber}
                        </span>
                        <h5 className="font-headline-lg text-xl text-[#E5E4E2] group-hover:text-[#e9c349] transition-colors">
                          {prod.name}
                        </h5>
                        <p className="font-label-caps text-[10px] text-[#8e9192]">
                          {prod.subtitle}
                        </p>
                      </div>
                      <div className="flex justify-between items-center text-xs font-label-tech text-[#E5E4E2] mt-2">
                        <span>
                          {prod.priceOnRequest
                            ? 'PRIX SUR DEMANDE'
                            : `${prod.currency} ${prod.price}`}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
