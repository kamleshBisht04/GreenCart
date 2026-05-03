import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { categories } from '../assets/assets';
import ProductCard from '../components/ProductCard';
import ProgressDots from '../components/ProgressDots';
import CategoryNavbar from '../components/CategoryNavbar';
import { shuffleProduct } from '../utils/utils';

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();

  const normalizedCategory = category?.toLowerCase();

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === normalizedCategory,
  );

  let filteredProducts = products.filter(
    (product) =>
      product?.category?.toLowerCase() === normalizedCategory &&
      product?.inStock,
  );
  filteredProducts = shuffleProduct(filteredProducts);

  return (
    <>
      <CategoryNavbar />
      <div className="mt-[9rem] px-4">
        {searchCategory && (
          <div className="item-end flex w-max flex-col">
            <p className="text-2xl font-medium">{searchCategory.text}</p>
            <ProgressDots />
          </div>
        )}

        {filteredProducts.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-14 lg:grid-cols-5 xl:grid-cols-7">
            {filteredProducts.map((product) => (
              <div key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-20 flex flex-col items-center justify-center text-center">
            <p className="text-lg font-semibold text-gray-700">
              No products found 😕
            </p>
            <p className="text-sm text-gray-500">Try another category</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCategory;
