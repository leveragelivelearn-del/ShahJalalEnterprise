import NavbarV1 from './navbars/NavbarV1';
import NavbarV2 from './navbars/NavbarV2';
import NavbarV3 from './navbars/NavbarV3';
import NavbarV4 from './navbars/NavbarV4';
import NavbarV5 from './navbars/NavbarV5';

export const NavbarSelector = ({ style }: { style: string }) => {
  switch (style) {
    case 'v1': return <NavbarV1 />;
    case 'v2': return <NavbarV2 />;
    case 'v3': return <NavbarV3 />;
    case 'v4': return <NavbarV4 />;
    case 'v5': return <NavbarV5 />;
    default: return <NavbarV1 />;
  }
};

// --- HEROS ---
import HeroV1 from './heros/HeroV1';

export const HeroSelector = ({ style, banners }: { style: string, banners: any[] }) => {
  return <HeroV1 banners={banners} />;
};

// --- PRODUCT CARDS ---
import ProductCardV1 from './product-cards/ProductCardV1';

export const ProductCardSelector = ({ style, product, isFlashSale, priority }: { style: string, product: any, isFlashSale?: boolean, priority?: boolean }) => {
  return <ProductCardV1 product={product} isFlashSale={isFlashSale} />;
};

// --- CATEGORIES ---
import CategoryV1 from './categories/CategoryV1';

export const CategorySelector = ({ style, categories }: { style: string, categories: any[] }) => {
  return <CategoryV1 categories={categories} />;
};

