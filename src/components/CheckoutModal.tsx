import React, { useState } from 'react';
import { X, CheckCircle, Lock, ShieldCheck, CreditCard, Sparkles, Building, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onClearCart,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'wire'>('card');
  const [formData, setFormData] = useState({
    firstName: 'Jean-Luc',
    lastName: 'Moreau',
    email: 'j.moreau@elite-luxe.com',
    address: '12 Place Vendôme',
    city: 'Paris',
    postalCode: '75001',
    country: 'France',
    cardNumber: '4532 •••• •••• 8892',
    expiry: '08/29',
    cvv: '•••',
  });
  const [orderRef, setOrderRef] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `ELITE-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(generatedRef);
    setStep('success');
    onClearCart();
  };

  const formatPrice = (val: number) => {
    return `€ ${val.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#0A0A0A]/95 backdrop-blur-2xl overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl bg-[#131313] border border-[#e5e2e1]/20 rounded-lg shadow-2xl p-6 md:p-10 my-auto max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#c4c7c7] hover:text-[#E5E4E2] transition-colors"
          title="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Lock className="w-4 h-4 text-[#e9c349]" />
              <span className="font-label-caps text-xs text-[#e9c349] tracking-widest uppercase">
                PAIEMENT SÉCURISÉ &amp; CONFIDENTIEL
              </span>
            </div>
            <h2 className="font-headline-lg text-3xl md:text-4xl text-[#E5E4E2] mb-6">
              FINALISATION DE LA COMMANDE
            </h2>

            {/* Order Summary Brief */}
            <div className="bg-[#1c1b1b] p-4 rounded mb-8 border border-[#444748]/30">
              <div className="flex justify-between items-center text-xs font-label-caps text-[#c4c7c7]">
                <span>TOTAL À RÉGLER ({cartItems.reduce((a, b) => a + b.quantity, 0)} ARTICLES)</span>
                <span className="font-headline-lg text-xl text-[#E5E4E2]">{formatPrice(subtotal)}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Details */}
              <div>
                <h3 className="font-label-caps text-xs text-[#c4c7c7] uppercase tracking-widest mb-4">
                  01. COORDONNÉES ET LIVRAISON
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-body-rt text-sm">
                  <div>
                    <label className="block text-xs font-label-tech text-[#8e9192] mb-1">PRÉNOM</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full bg-[#20201f] border border-[#444748]/40 rounded px-3 py-2 text-[#E5E4E2] focus:border-[#e9c349] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-label-tech text-[#8e9192] mb-1">NOM</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full bg-[#20201f] border border-[#444748]/40 rounded px-3 py-2 text-[#E5E4E2] focus:border-[#e9c349] focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-label-tech text-[#8e9192] mb-1">EMAIL DE CONFIRMATION</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#20201f] border border-[#444748]/40 rounded px-3 py-2 text-[#E5E4E2] focus:border-[#e9c349] focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-label-tech text-[#8e9192] mb-1">ADRESSE DE LIVRAISON</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-[#20201f] border border-[#444748]/40 rounded px-3 py-2 text-[#E5E4E2] focus:border-[#e9c349] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-label-tech text-[#8e9192] mb-1">VILLE</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#20201f] border border-[#444748]/40 rounded px-3 py-2 text-[#E5E4E2] focus:border-[#e9c349] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-label-tech text-[#8e9192] mb-1">CODE POSTAL</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full bg-[#20201f] border border-[#444748]/40 rounded px-3 py-2 text-[#E5E4E2] focus:border-[#e9c349] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h3 className="font-label-caps text-xs text-[#c4c7c7] uppercase tracking-widest mb-4">
                  02. MODE DE PAIEMENT
                </h3>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 border rounded text-xs font-label-caps flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#e9c349] bg-[#e9c349]/10 text-[#e9c349]'
                        : 'border-[#444748]/40 text-[#c4c7c7] hover:border-[#E5E4E2]'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>CARTE BANCAIRE</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('applepay')}
                    className={`p-3 border rounded text-xs font-label-caps flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === 'applepay'
                        ? 'border-[#e9c349] bg-[#e9c349]/10 text-[#e9c349]'
                        : 'border-[#444748]/40 text-[#c4c7c7] hover:border-[#E5E4E2]'
                    }`}
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>APPLE PAY</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wire')}
                    className={`p-3 border rounded text-xs font-label-caps flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === 'wire'
                        ? 'border-[#e9c349] bg-[#e9c349]/10 text-[#e9c349]'
                        : 'border-[#444748]/40 text-[#c4c7c7] hover:border-[#E5E4E2]'
                    }`}
                  >
                    <Building className="w-5 h-5" />
                    <span>VIREMENT PRIVE</span>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-3 bg-[#1c1b1b] p-4 rounded border border-[#444748]/30">
                    <div>
                      <label className="block text-xs font-label-tech text-[#8e9192] mb-1">NUMÉRO DE CARTE</label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full bg-[#20201f] border border-[#444748]/40 rounded px-3 py-2 text-[#E5E4E2] font-mono text-xs focus:border-[#e9c349]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-label-tech text-[#8e9192] mb-1">EXPIRATION</label>
                        <input
                          type="text"
                          value={formData.expiry}
                          onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                          className="w-full bg-[#20201f] border border-[#444748]/40 rounded px-3 py-2 text-[#E5E4E2] font-mono text-xs focus:border-[#e9c349]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-label-tech text-[#8e9192] mb-1">CVC</label>
                        <input
                          type="text"
                          value={formData.cvv}
                          onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                          className="w-full bg-[#20201f] border border-[#444748]/40 rounded px-3 py-2 text-[#E5E4E2] font-mono text-xs focus:border-[#e9c349]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 border border-[#E5E4E2] bg-[#E5E4E2] text-black font-label-caps text-xs uppercase tracking-[0.2em] hover:bg-[#e9c349] hover:border-[#e9c349] transition-all duration-300 font-medium flex items-center justify-center gap-3"
                id="confirm-payment-btn"
              >
                CONFIRMER ET PAYER {formatPrice(subtotal)}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-8 animate-in zoom-in-95 duration-500">
            <CheckCircle className="w-16 h-16 text-[#e9c349] mx-auto mb-4 stroke-1" />
            <span className="font-label-caps text-xs text-[#e9c349] tracking-widest uppercase block mb-2">
              COMMANDE CONFIRMÉE
            </span>
            <h2 className="font-headline-lg text-4xl text-[#E5E4E2] mb-4">
              MERCI POUR VOTRE CONFIANCE
            </h2>
            <p className="font-body-rt text-sm text-[#c4c7c7] max-w-lg mx-auto mb-6 font-light">
              Votre commande numéro <strong className="text-[#e9c349] font-mono">{orderRef}</strong> a été enregistrée avec succès. Un e-mail de confirmation contenant les détails du suivi sécurisé vous a été envoyé.
            </p>

            <div className="bg-[#1c1b1b] p-6 rounded border border-[#444748]/30 max-w-md mx-auto text-left mb-8 space-y-2">
              <div className="flex justify-between text-xs font-label-tech text-[#8e9192]">
                <span>DESTINATAIRE:</span>
                <span className="text-[#E5E4E2]">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="flex justify-between text-xs font-label-tech text-[#8e9192]">
                <span>ADRESSE:</span>
                <span className="text-[#E5E4E2]">{formData.address}, {formData.city}</span>
              </div>
              <div className="flex justify-between text-xs font-label-tech text-[#8e9192]">
                <span>LIVRAISON:</span>
                <span className="text-[#e9c349]">BLINDÉE &amp; CONCIERGERIE</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="py-3.5 px-8 border border-[#E5E4E2] text-[#E5E4E2] font-label-caps text-xs uppercase tracking-widest hover:bg-[#E5E4E2] hover:text-black transition-all"
            >
              RETOURNER À L'ARCHIVE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
