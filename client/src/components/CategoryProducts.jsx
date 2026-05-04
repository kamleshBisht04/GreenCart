import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';
import { shuffleProduct } from '../utils/utils';
import ProgressDots from './ProgressDots';

const CategoryProducts = ({ title, category, limit = 7 }) => {
  const { products } = useAppContext();

  const filteredProducts = shuffleProduct(products)
    .filter(
      (p) => p.inStock && p.category?.toLowerCase() === category.toLowerCase(),
    ).slice(0, limit);

  return (
    <div className="mt-16">
      <p className="text-2xl font-medium md:text-3xl">{title}</p>
      <ProgressDots/>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-5 xl:grid-cols-7">
        {filteredProducts.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
