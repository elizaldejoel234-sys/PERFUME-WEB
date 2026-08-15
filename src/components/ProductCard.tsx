import React from 'react';
import { ArrowRight, Plus, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onAddToCart,
}) => {
  const formatPrice = (p: Product) => {
    if (p.priceOnRequest) {
      return 'PRIX SUR DEMANDE';
    }
    return `${p.currency} ${p.price.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}`;
  };

  // Grid column span mappings for Tailwind
  const getColSpanClass = (cols: number) => {
    switch (cols) {
      case 8:
        return 'md:col-span-8';
      case 7:
        return 'md:col-span-7';
      case 6:
        return 'md:col-span-6';
      case 5:
        return 'md:col-span-5';
      case 4:
        return 'md:col-span-4';
      case 3:
        return 'md:col-span-3';
      case 12:
        return 'md:col-span-12';
      default:
        return 'md:col-span-4';
    }
  };

  if (product.gridSpan.isLandscape) {
    return (
      <article
        onClick={() => onSelectProduct(product)}
        className="md:col-span-12 product-card group relative overflow-hidden surface-t1 thin-border flex flex-col md:flex-row h-auto md:h-[420px] cursor-pointer bg-[#121212] transition-all duration-500 hover:border-[#e9c349]/50"
        id={`product-card-${product.id}`}
      >
        <div className="w-full md:w-1/2 h-[220px] sm:h-[300px] md:h-full relative bg-[#0A0A0A] overflow-hidden">
          <img
            src={product.image}
            alt={product.altText || product.name}
            className="absolute inset-0 w-full h-full object-cover editorial-img"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#0e0e0e]/90 backdrop-blur-md border border-[#444748]/30 rounded-sm">
            <span className="font-label-tech text-[11px] text-[#e5e2e1]">{product.codeNumber}</span>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-5 sm:p-8 md:p-14 flex flex-col justify-between bg-[#1c1b1b]/80">
          <div>
            <span className="font-label-caps text-[11px] text-[#c4c7c7] mb-2 block tracking-widest uppercase">
              {product.category} // {product.codeNumber}
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl text-[#dbdad9] mb-3 group-hover:text-[#e9c349] transition-colors leading-tight">
              {product.name}
            </h2>
            <p className="font-body-rt text-xs sm:text-sm md:text-base text-[#c4c7c7] mb-5 line-clamp-3 opacity-80 font-light">
              {product.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-auto pt-4 md:pt-6 border-t border-[#444748]/20">
            <p className="font-label-tech text-sm sm:text-base text-[#e5e2e1] font-medium">
              {formatPrice(product)}
            </p>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectProduct(product);
                }}
                className="flex-1 sm:flex-none min-h-[44px] font-label-caps text-xs border border-[#444748]/40 px-3.5 py-2.5 text-[#c4c7c7] hover:border-[#E5E4E2] hover:text-[#E5E4E2] transition-all flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" /> DÉTAILS
              </button>
              <button
                onClick={(e) => onAddToCart(product, e)}
                className="flex-1 sm:flex-none min-h-[44px] font-label-caps text-xs bg-[#E5E4E2] text-[#0A0A0A] border border-[#E5E4E2] px-4 py-2.5 hover:bg-[#e9c349] hover:border-[#e9c349] transition-all duration-300 flex items-center justify-center gap-2 font-medium"
                id={`add-cart-btn-${product.id}`}
              >
                <ShoppingBag className="w-4 h-4" /> AJOUTER
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      onClick={() => onSelectProduct(product)}
      className={`${getColSpanClass(
        product.gridSpan.cols
      )} product-card group relative overflow-hidden surface-t1 thin-border flex flex-col min-h-[380px] h-[420px] sm:h-[460px] md:${
        product.gridSpan.heightClass || 'h-[500px]'
      } cursor-pointer bg-[#121212] transition-all duration-500 hover:border-[#e9c349]/50`}
      id={`product-card-${product.id}`}
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 bg-[#0A0A0A] z-0 overflow-hidden">
        <img
          src={product.image}
          alt={product.altText || product.name}
          className="w-full h-full object-cover editorial-img opacity-80"
          loading="lazy"
        />
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent z-10 opacity-90 group-hover:opacity-75 transition-opacity" />
      </div>

      {/* Code Number Badge */}
      <div className="absolute top-3 left-3 z-20 px-2.5 py-1 bg-[#0e0e0e]/85 backdrop-blur-md border border-[#444748]/30 rounded-sm">
        <span className="font-label-tech text-[11px] text-[#e5e2e1]">{product.codeNumber}</span>
      </div>

      {/* Quick Action Button top right - optimized 44px touch target */}
      <button
        onClick={(e) => onAddToCart(product, e)}
        className="absolute top-3 right-3 z-20 w-11 h-11 rounded-full bg-[#0e0e0e]/85 backdrop-blur-md border border-[#444748]/40 flex items-center justify-center text-[#e5e2e1] hover:bg-[#e9c349] hover:text-[#3c2f00] hover:border-[#e9c349] transition-all duration-300 shadow-lg active:scale-95"
        title="Ajouter au Panier"
        id={`quick-add-${product.id}`}
      >
        <Plus className="w-5 h-5" />
      </button>

      {/* Card Content Footer */}
      <div className="relative z-20 mt-auto p-5 sm:p-6 md:p-8 w-full flex flex-col justify-end">
        <span className="font-label-caps text-[10px] text-[#c4c7c7] mb-1.5 block tracking-widest uppercase">
          {product.category} // {product.codeNumber}
        </span>
        <h2 className="font-headline-lg text-xl sm:text-2xl md:text-3xl text-[#dbdad9] mb-1 leading-tight group-hover:text-[#e9c349] transition-colors">
          {product.name}
        </h2>
        <p className="font-label-caps text-[10px] sm:text-[11px] text-[#8e9192] uppercase mb-3 opacity-80 line-clamp-1">
          {product.subtitle}
        </p>

        <div className="flex justify-between items-center mt-1 pt-3 border-t border-[#444748]/30">
          <p className="font-label-tech text-xs sm:text-sm text-[#e5e2e1] font-medium">
            {formatPrice(product)}
          </p>
          <span className="font-label-tech text-[11px] sm:text-xs text-[#c4c7c7] group-hover:text-[#e9c349] transition-colors flex items-center gap-1">
            DÉTAILS <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </article>
  );
};
