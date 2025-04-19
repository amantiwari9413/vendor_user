import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200 dark:bg-gray-700">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
          {product.title}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {product.vendorName}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
            ₹{product.price}
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700 transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 