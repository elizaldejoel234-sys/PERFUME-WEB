export type Category = 'ALL' | 'COUTURE' | 'PARFUMS' | 'ACCESSORIES';

export interface Product {
  id: string;
  codeNumber: string; // e.g., '01', '02'
  name: string;
  subtitle: string;
  category: 'COUTURE' | 'PARFUMS' | 'ACCESSORIES';
  price: number; // EUR or USD
  priceOnRequest?: boolean;
  currency: '€' | '$';
  image: string;
  altText: string;
  description: string;
  materialOrVolume: string;
  details?: string[];
  gridSpan: {
    cols: number; // e.g. 8, 4, 12, 5, 7, 3, 6
    heightClass: string;
    isFeatured?: boolean;
    isLandscape?: boolean;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSizeOrVariant?: string;
}

export type ActiveView = 'collections' | 'cart' | 'atelier' | 'journal';
