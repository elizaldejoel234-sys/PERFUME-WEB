import React from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onViewFullCart: () => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onViewFullCart,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const formatPrice = (val: number) => {
    return `€ ${val.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#0A0A0A]/80 backdrop-blur-md transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#131313] border-l border-[#e5e2e1]/20 p-6 md:p-8 flex flex-col justify-between shadow-2xl relative">
          {/* Top Bar */}
          <div>
            <div className="flex justify-between items-center pb-6 border-b border-[#444748]/20">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#e9c349]" />
                <h2 className="font-headline-lg text-2xl text-[#E5E4E2]">VOTRE PANIER</h2>
                <span className="font-label-tech text-xs text-[#8e9192]">
                  ({cartItems.reduce((a, b) => a + b.quantity, 0)})
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-[#c4c7c7] hover:text-[#E5E4E2] transition-colors"
                title="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items List */}
            <div className="mt-6 space-y-6 max-h-[55vh] overflow-y-auto pr-2">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="font-body-rt text-sm text-[#8e9192] font-light">
                    Aucun article dans votre sélection.
                  </p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 pb-4 border-b border-[#444748]/20"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover rounded bg-[#20201f] shrink-0"
                    />
                    <div className="flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-headline-lg text-lg text-[#E5E4E2] leading-tight">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-[#8e9192] hover:text-[#ffb4ab] text-xs p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="font-label-caps text-[10px] text-[#8e9192] block mt-1">
                          {item.product.subtitle}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="w-6 h-6 border border-[#444748]/40 rounded-full flex items-center justify-center text-xs text-[#E5E4E2] hover:border-[#e9c349]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-label-tech text-xs text-[#E5E4E2]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="w-6 h-6 border border-[#444748]/40 rounded-full flex items-center justify-center text-xs text-[#E5E4E2] hover:border-[#e9c349]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-body-rt text-sm text-[#E5E4E2]">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-6 border-t border-[#444748]/20 space-y-4">
            <div className="flex justify-between items-end">
              <span className="font-label-caps text-xs text-[#8e9192]">SOUS-TOTAL</span>
              <span className="font-headline-lg text-2xl text-[#E5E4E2]">
                {formatPrice(subtotal)}
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                onCheckout();
              }}
              disabled={cartItems.length === 0}
              className={`w-full py-3.5 border font-label-caps text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                cartItems.length === 0
                  ? 'border-[#444748] text-[#8e9192] cursor-not-allowed'
                  : 'border-[#E5E4E2] text-[#E5E4E2] hover:bg-[#E5E4E2] hover:text-black'
              }`}
            >
              COMMANDER MAINTENANT <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                onClose();
                onViewFullCart();
              }}
              className="w-full text-center font-label-caps text-[11px] text-[#c4c7c7] hover:text-[#e9c349] transition-colors uppercase tracking-widest"
            >
              VOIR LE PANIER DÉTAILLÉ
            </button>

            <div className="flex items-center justify-center gap-2 text-[#8e9192] font-label-tech text-[10px] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#e9c349]" />
              <span>EXPÉDITION EXPRESS &amp; RETOURS OFFERTS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
