import NavbarV1 from './navbars/NavbarV1';

export const NavbarSelector = ({ style }: { style: string }) => {
  return <NavbarV1 />;
};

// --- HEROS ---
import HeroV1 from './heros/HeroV1';

export const HeroSelector = ({ style, banners }: { style: string, banners: any[] }) => {
  return <HeroV1 banners={banners} />;
};

// --- PRODUCT CARDS ---
export const ProductCardSelector = ({ style, product, isFlashSale, priority }: { style: string, product: any, isFlashSale?: boolean, priority?: boolean }) => {
  return null;
};

// --- CATEGORIES ---
export const CategorySelector = ({ style, categories }: { style: string, categories: any[] }) => {
  return null;
};

