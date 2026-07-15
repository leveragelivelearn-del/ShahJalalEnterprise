import dynamic from 'next/dynamic';

// --- FOOTERS ---
import FooterV1 from './footers/FooterV1';

export const FooterSelector = ({ style }: { style: string }) => {
  return <FooterV1 />;
};

// --- PRODUCT DETAILS ---
export const ProductDetailsSelector = ({ style, product }: { style: string, product: any }) => {
  return null;
};

// --- BLOG DETAILS ---
import BlogDetailsV1 from './blog-details/BlogDetailsV1';

export const BlogDetailsSelector = ({ style, blog, readingTime }: { style: string, blog: any, readingTime: number }) => {
  return <BlogDetailsV1 blog={blog} readingTime={readingTime} />;
};

// --- SHOP LISTING ---
export const ShopListingSelector = ({ style, productCardStyle, products, categories, searchParams }: { style: string, productCardStyle?: string, products: any[], categories: any[], searchParams: any }) => {
  return null;
};

// --- BLOG LISTING ---
const BlogListingV1 = dynamic(() => import('./blog-listing/BlogListingV1'));

export const BlogListingSelector = ({ 
  style, 
  variant,
  blogs, 
  totalBlogs, 
  totalPages, 
  currentPage, 
  q,
  searchTerm
}: { 
  style?: string, 
  variant?: string,
  blogs: any[], 
  totalBlogs: number, 
  totalPages: number, 
  currentPage: number, 
  q?: string,
  searchTerm?: string
}) => {
  const activeStyle = style || variant || 'v1';
  const activeQ = q || searchTerm || '';

  switch (activeStyle) {
    case 'v1': return <BlogListingV1 blogs={blogs} totalBlogs={totalBlogs} totalPages={totalPages} currentPage={currentPage} q={activeQ} style={activeStyle} />;
    default: return <BlogListingV1 blogs={blogs} totalBlogs={totalBlogs} totalPages={totalPages} currentPage={currentPage} q={activeQ} style={activeStyle} />;
  }
};

