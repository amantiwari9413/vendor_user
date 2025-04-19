import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice';

const Cart = () => {
  const { items, totalItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Shopping Cart ({totalItems} items)
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Your cart is empty
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Add some products to your cart
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.vendorName}
                    </p>
                    <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                      ₹{item.price}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-medium">₹{calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        Total
                      </span>
                      <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                        ₹{calculateTotal()}
                      </span>
                    </div>
                  </div>
                  <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart; 