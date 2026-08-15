import React from 'react';
import { X, Minus, Plus, ArrowRight, ShieldCheck, Lock, ShoppingBag, ArrowLeft } from 'lucide-react';
import { CartItem, Product } from '../types';

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onContinueShopping: () => void;
  onCheckout: () => void;
}

export const CartView: React.FC<CartViewProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onContinueShopping,
  onCheckout,
}) => {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const formatPrice = (val: number) => {
    return `€ ${val.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}`;
  };

  return (
    <div className="pt-20 sm:pt-28 md:pt-36 pb-28 md:pb-24 px-4 sm:px-6 md:px-16 max-w-[1440px] mx-auto w-full animate-in fade-in duration-300">
      {/* Back button link */}
      <button
        onClick={onContinueShopping}
        className="font-label-caps text-xs text-[#c4c7c7] hover:text-[#e9c349] transition-colors flex items-center gap-2 mb-6 sm:mb-8 uppercase tracking-widest min-h-[44px]"
      >
        <ArrowLeft className="w-4 h-4" /> RETOURNER À LA COLLECTION
      </button>

      {/* Main Grid: Items (8 cols) + Order Summary (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-12">
        {/* Header section spanning 12 cols */}
        <div className="lg:col-span-12 mb-4 sm:mb-6">
          <h1 className="font-display-xl text-4xl sm:text-5xl md:text-7xl text-[#e5e2e1] mb-2 sm:mb-3 tracking-tighter">
            PANIER
          </h1>
          <p className="font-label-caps text-xs text-[#c4c7c7] tracking-widest uppercase">
            {String(totalItemsCount).padStart(2, '0')} ARTICLES DANS VOTRE SÉLECTION
          </p>
          <div className="thin-rule mt-4 sm:mt-6 w-full" />
        </div>

        {/* Cart Items List */}
        <div className="lg:col-span-8 flex flex-col gap-6 sm:gap-8">
          {cartItems.length === 0 ? (
            <div className="py-12 sm:py-16 text-center border border-[#444748]/30 rounded-lg bg-[#121212] p-6 sm:p-8">
              <ShoppingBag className="w-12 h-12 text-[#8e9192] mx-auto mb-4 stroke-1" />
              <h3 className="font-headline-lg text-2xl sm:text-3xl text-[#e5e2e1] mb-2">
                VOTRE PANIER EST VIDE
              </h3>
              <p className="font-body-rt text-xs sm:text-sm text-[#c4c7c7] max-w-md mx-auto mb-6 sm:mb-8 font-light">
                Explorez notre archive de haute couture, parfums d'exception et joaillerie pour ajouter des pièces uniques à votre sélection.
              </p>
              <button
                onClick={onContinueShopping}
                className="py-3.5 px-6 sm:px-8 border border-[#E5E4E2] text-[#E5E4E2] font-label-caps text-xs uppercase tracking-widest hover:bg-[#E5E4E2] hover:text-black transition-all duration-300 min-h-[44px]"
              >
                DÉCOUVRIR LES CRÉATIONS
              </button>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={item.product.id}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 pb-6 sm:pb-8 thin-rule group"
                id={`cart-item-${item.product.id}`}
              >
                {/* Product Thumbnail */}
                <div className="w-full sm:w-40 md:w-48 h-48 sm:h-40 md:h-48 shrink-0 overflow-hidden bg-[#353535] relative rounded-sm">
                  <img
                    src={item.product.image}
                    alt={item.product.altText || item.product.name}
                    className="w-full h-full object-cover image-desaturate absolute inset-0"
                  />
                  <div className="absolute top-2 left-2 px-2 py-1 bg-[#0e0e0e]/80 backdrop-blur-md border border-[#444748]/30 rounded-sm">
                    <span className="font-label-tech text-xs text-[#e5e2e1]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Info & Quantity controls */}
                <div className="flex flex-col justify-between w-full">
                  <div>
                    <div className="flex justify-between items-start mb-1 sm:mb-2">
                      <h2 className="font-headline-lg text-xl sm:text-2xl md:text-3xl text-[#e5e2e1]">
                        {item.product.name}
                      </h2>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        aria-label="Remove item"
                        className="text-[#c4c7c7] hover:text-[#ffb4ab] active:text-[#ffb4ab] transition-colors p-2 min-w-[40px] min-h-[40px] flex items-center justify-center"
                        title="Supprimer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="font-label-caps text-[11px] sm:text-xs text-[#c4c7c7] uppercase mb-3">
                      {item.product.subtitle}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-2 pt-2 sm:pt-0">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center border border-[#444748]/40 rounded-full hover:border-[#e9c349] active:scale-95 transition-all text-[#e5e2e1]"
                        aria-label="Réduire la quantité"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-label-tech text-base text-[#e5e2e1] min-w-[20px] text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center border border-[#444748]/40 rounded-full hover:border-[#e9c349] active:scale-95 transition-all text-[#e5e2e1]"
                        aria-label="Augmenter la quantité"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <span className="font-body-rt text-base sm:text-lg md:text-xl text-[#e5e2e1] font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Summary Panel (Sticky) */}
        <div className="lg:col-span-4 mt-8 lg:mt-0">
          <div className="glass-panel p-8 rounded-lg sticky top-28 inner-glow">
            <h3 className="font-headline-lg text-2xl md:text-3xl text-[#e5e2e1] mb-6">
              RÉSUMÉ
            </h3>

            <div className="flex flex-col gap-4 font-body-rt text-sm text-[#c4c7c7] mb-8 font-light">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span className="text-[#e5e2e1] font-normal">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Expédition Sécurisée</span>
                <span className="text-[#e9c349] font-normal">Offerte</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (TVA incl.)</span>
                <span className="text-[#e5e2e1] font-normal">Calculé à la caisse</span>
              </div>
            </div>

            <div className="thin-rule mb-6" />

            <div className="flex justify-between items-end mb-8">
              <span className="font-label-caps text-xs text-[#c4c7c7] uppercase tracking-widest">
                TOTAL
              </span>
              <span className="font-headline-lg text-3xl text-[#e5e2e1]">
                {formatPrice(subtotal)}
              </span>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={onCheckout}
              disabled={cartItems.length === 0}
              className={`w-full py-4 border border-[#E5E4E2] font-label-caps text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 ${
                cartItems.length === 0
                  ? 'bg-transparent text-[#8e9192] border-[#444748] cursor-not-allowed opacity-50'
                  : 'bg-transparent text-[#E5E4E2] hover:bg-[#E5E4E2] hover:text-black cursor-pointer'
              }`}
              id="finalize-order-button"
            >
              FINALISER LA COMMANDE
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="mt-6 flex flex-col gap-2 items-center text-center">
              <ShieldCheck className="w-5 h-5 text-[#c4c7c7]" />
              <p className="font-label-tech text-xs text-[#c4c7c7]">
                Paiement 100% Sécurisé &amp; Chiffré
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
