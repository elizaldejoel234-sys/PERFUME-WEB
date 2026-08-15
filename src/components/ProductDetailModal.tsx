import React, { useState } from 'react';
import { X, ShoppingBag, ShieldCheck, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, variant?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<string>('Standard');

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedVariant);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 2000);
  };

  const formatPrice = (p: Product) => {
    if (p.priceOnRequest) {
      return 'PRIX SUR DEMANDE';
    }
    return `${p.currency} ${(p.price * quantity).toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-[#0A0A0A]/90 backdrop-blur-2xl overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl bg-[#131313] border border-[#e5e2e1]/20 rounded-lg shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center bg-[#0e0e0e]/80 backdrop-blur-md text-[#c4c7c7] hover:text-[#E5E4E2] hover:bg-[#20201f] rounded-full transition-colors border border-[#444748]/30"
          title="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Display */}
        <div className="w-full md:w-1/2 h-[260px] sm:h-[350px] md:h-auto md:min-h-[400px] bg-[#0E0E0E] relative overflow-hidden flex items-center justify-center p-4 sm:p-6 border-b md:border-b-0 md:border-r border-[#444748]/20 shrink-0">
          <img
            src={product.image}
            alt={product.altText || product.name}
            className="w-full h-full object-cover editorial-img rounded"
          />
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#0e0e0e]/90 backdrop-blur-md border border-[#444748]/30 rounded-sm">
            <span className="font-label-tech text-xs text-[#e5e2e1]">{product.codeNumber}</span>
          </div>
          <div className="absolute bottom-3 left-3 right-3 p-2.5 bg-[#131313]/90 backdrop-blur-md border border-[#444748]/30 text-[11px] font-label-tech text-[#c4c7c7] flex justify-between items-center">
            <span className="truncate max-w-[65%]">SPEC: {product.materialOrVolume}</span>
            <span className="text-[#e9c349] shrink-0">AUTHENTIQUE</span>
          </div>
        </div>

        {/* Right Column: Information & Actions */}
        <div className="w-full md:w-1/2 p-5 sm:p-8 md:p-12 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-[75vh]">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="font-label-caps text-[11px] text-[#e9c349] tracking-widest uppercase">
                {product.category} // {product.codeNumber}
              </span>
              <span className="text-[#444748]">•</span>
              <span className="font-label-tech text-[11px] text-[#8e9192]">ÉDITION ÉLITE</span>
            </div>

            <h1 className="font-headline-lg text-2xl sm:text-4xl md:text-5xl text-[#E5E4E2] mb-2 sm:mb-3 leading-tight">
              {product.name}
            </h1>

            <p className="font-label-caps text-[11px] text-[#c4c7c7] uppercase tracking-widest mb-4 sm:mb-6">
              {product.subtitle}
            </p>

            <div className="text-xl sm:text-2xl font-body-rt text-[#e5e2e1] mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-[#444748]/20">
              {formatPrice(product)}
            </div>

            <p className="font-body-rt text-xs sm:text-sm md:text-base text-[#c4c7c7] leading-relaxed mb-5 font-light">
              {product.description}
            </p>

            {/* Specifications / Notes List */}
            {product.details && product.details.length > 0 && (
              <div className="mb-5 bg-[#1c1b1b] p-3.5 sm:p-4 rounded border border-[#444748]/30">
                <h4 className="font-label-caps text-[11px] text-[#e9c349] uppercase tracking-widest mb-2.5">
                  CARACTÉRISTIQUES D'EXCEPTION
                </h4>
                <ul className="space-y-1.5">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 font-body-rt text-xs text-[#c4c7c7]">
                      <Sparkles className="w-3.5 h-3.5 text-[#e9c349] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Quantity and Add Button */}
          <div className="pt-4 sm:pt-6 border-t border-[#444748]/20 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-xs text-[#c4c7c7] uppercase tracking-widest">
                QUANTITÉ
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center border border-[#444748]/40 rounded-full hover:border-[#e9c349] active:scale-95 transition-all text-base text-[#e5e2e1]"
                  aria-label="Réduire la quantité"
                >
                  -
                </button>
                <span className="font-label-tech text-base text-[#e5e2e1] w-6 text-center font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center border border-[#444748]/40 rounded-full hover:border-[#e9c349] active:scale-95 transition-all text-base text-[#e5e2e1]"
                  aria-label="Augmenter la quantité"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              disabled={addedSuccess}
              className={`w-full py-4 min-h-[48px] border font-label-caps text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 rounded-sm active:scale-98 ${
                addedSuccess
                  ? 'bg-[#e9c349] border-[#e9c349] text-[#3c2f00]'
                  : 'bg-transparent border-[#E5E4E2] text-[#E5E4E2] hover:bg-[#E5E4E2] hover:text-black'
              }`}
              id={`modal-add-to-cart-${product.id}`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4" /> AJOUTÉ AU PANIER
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" /> AJOUTER AU PANIER
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[#8e9192] font-label-tech text-[10px] sm:text-[11px] pt-1 text-center">
              <ShieldCheck className="w-4 h-4 text-[#e9c349] shrink-0" />
              <span>EXPÉDITION SÉCURISÉE AVEC SUIVI EN TEMPS RÉEL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
