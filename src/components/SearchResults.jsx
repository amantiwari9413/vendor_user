import { useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';

const SearchResults = () => {
  const location = useLocation();
  const { results, query } = location.state || { results: [], query: '' };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-8">
        Search Results for "{query}"
      </h2>
      {results.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No products found matching your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {results.map((product) => (
            <ProductCard
              key={product._id}
              product={{
                id: product._id,
                title: product.itemName,
                price: product.itemPrice,
                category: product.categoryId,
                image: product.itemImg,
                vendorName: product.vendorId.name
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults; 