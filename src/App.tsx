import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartView } from './components/CartView';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { AtelierView } from './components/AtelierView';
import { JournalView } from './components/JournalView';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, Category, CartItem, ActiveView } from './types';
import { Sparkles, Check } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('collections');
  const [selectedCategory, setSelectedCategory] = useState<Category>('ALL');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Initialize cart with the 3 exact items specified in the prompt HTML
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 }, // Nuit d'Obsidienne (€340)
    { product: PRODUCTS[1], quantity: 1 }, // Sac L'Ombre (€2,150)
    { product: PRODUCTS[2], quantity: 1 }, // Anneau d'Argent (€890)
  ]);

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (
    product: Product,
    quantity: number = 1,
    e?: React.MouseEvent
  ) => {
    if (e) {
      e.stopPropagation();
    }
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`"${product.name}" ajouté à votre panier`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Article retiré de la sélection');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Filter products by selected category
  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCategory === 'ALL') return true;
    return p.category === selectedCategory;
  });

  const cartTotalCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E5E4E2] font-body-rt flex flex-col justify-between selection:bg-[#e9c349] selection:text-[#3c2f00] relative">
      {/* Navigation Bar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        cartCount={cartTotalCount}
        onOpenCartDrawer={() => setIsCartDrawerOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-grow">
        {activeView === 'cart' && (
          <CartView
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onContinueShopping={() => setActiveView('collections')}
            onCheckout={() => setIsCheckoutOpen(true)}
          />
        )}

        {activeView === 'atelier' && <AtelierView />}

        {activeView === 'journal' && <JournalView />}

        {activeView === 'collections' && (
          <section className="pt-20 sm:pt-28 md:pt-44 pb-28 md:pb-24 px-4 sm:px-6 md:px-16 max-w-[1440px] mx-auto w-full animate-in fade-in duration-300">
            {/* Header section matching prompt's "THE ARCHIVE" */}
            <header className="mb-10 sm:mb-16 md:mb-24 flex flex-col items-center text-center">
              <span className="font-label-caps text-[10px] sm:text-xs text-[#e9c349] tracking-widest uppercase mb-2 sm:mb-3 block">
                MAISON L'ÉLITE LUXE PARIS
              </span>
              <h1 className="font-display-xl text-4xl sm:text-6xl md:text-8xl text-[#dbdad9] mb-4 sm:mb-6 tracking-tighter leading-none uppercase">
                THE ARCHIVE
              </h1>
              <p className="font-body-rt text-sm sm:text-base md:text-lg text-[#c4c7c7] max-w-2xl mx-auto opacity-80 font-light leading-relaxed px-2">
                Une exposition sélective de nos créations les plus éminentes. Chaque artefact est une étude sur la tension des matériaux, équilibrant profondeur abyssale et structure immaculée.
              </p>

              {/* Category Filter Buttons - Touch friendly horizontal scroll on mobile */}
              <div className="mt-8 sm:mt-10 flex overflow-x-auto max-w-full pb-3 md:pb-0 justify-start md:justify-center gap-2.5 sm:gap-3 px-2 w-full no-scrollbar scroll-smooth">
                {(['ALL', 'COUTURE', 'PARFUMS', 'ACCESSORIES'] as Category[]).map(
                  (cat) => {
                    const active = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`font-label-tech text-xs px-4 sm:px-5 py-3 sm:py-2.5 thin-border transition-all duration-300 inner-glow flex items-center gap-2 uppercase tracking-wider shrink-0 min-h-[44px] active:scale-95 ${
                          active
                            ? 'bg-[#2a2a2a] text-[#E5E4E2] border-[#e9c349]'
                            : 'text-[#c4c7c7] hover:text-[#E5E4E2] hover:bg-[#2a2a2a]/60'
                        }`}
                        id={`filter-btn-${cat.toLowerCase()}`}
                      >
                        {active && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#e9c349]" />
                        )}
                        {cat === 'ALL' ? 'TOUS LES ARTICLES' : cat}
                      </button>
                    );
                  }
                )}
              </div>
            </header>

            {/* Asymmetrical Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
              {filteredProducts.map((product, idx) => (
                <React.Fragment key={product.id}>
                  {/* Editorial Note Break every 8 items */}
                  {idx === 6 && selectedCategory === 'ALL' && (
                    <div className="md:col-span-12 py-16 md:py-24 flex items-center justify-center border-y border-[#444748]/20 my-8">
                      <p className="font-display-xl text-2xl md:text-4xl text-center text-[#dbdad9] tracking-tighter leading-snug max-w-4xl italic opacity-85">
                        "Le silence est l'esthétique la plus puissante. Nous concevons pour les espaces entre l'ombre et la lumière."
                      </p>
                    </div>
                  )}

                  <ProductCard
                    product={product}
                    onSelectProduct={setSelectedProduct}
                    onAddToCart={(p, e) => handleAddToCart(p, 1, e)}
                  />
                </React.Fragment>
              ))}
            </div>

            {/* Pagination / Discover More Footer */}
            <div className="mt-24 flex justify-center border-t border-[#444748]/20 pt-16">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="font-label-caps text-xs text-[#c4c7c7] hover:text-[#e9c349] transition-colors flex flex-col items-center gap-4 uppercase tracking-widest"
              >
                <span className="w-[1px] h-12 bg-[#444748]/40" />
                RETOUR EN HAUT DE L'ARCHIVE
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={setActiveView} />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, qty) => {
          handleAddToCart(p, qty);
          setSelectedProduct(null);
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onViewFullCart={() => setActiveView('cart')}
        onCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onClearCart={handleClearCart}
      />

      {/* Search Overlay */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 bg-[#1c1b1b]/95 backdrop-blur-md border border-[#e9c349]/50 text-[#E5E4E2] px-4 sm:px-5 py-3 sm:py-3.5 rounded shadow-2xl flex items-center gap-2.5 font-label-tech text-xs animate-in slide-in-from-bottom-5 duration-300 max-w-[calc(100vw-2rem)]">
          <Check className="w-4 h-4 text-[#e9c349] shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
