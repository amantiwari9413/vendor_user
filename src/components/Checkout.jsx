import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const [formData, setFormData] = useState({
    deliveryAddress: '',
    paymentMethod: 'upi'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/signin', { state: { from: location } });
      return;
    }
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate, location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('Please login to continue');
      setLoading(false);
      return;
    }

    console.log(cartItems);
    try {
      const orderData = {
        user: localStorage.getItem('userId'),
        vendor: cartItems[0].vendorId,
        items: cartItems.map(item => ({
          item: item.id,
          quantity: item.quantity
        })),
        deliveryAddress: formData.deliveryAddress,
        paymentMethod: formData.paymentMethod
      };

      console.log('Order Data:', orderData);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/order/createOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (data.success) {
        // Clear cart and redirect to success page
        navigate('/order-success');
      } else {
        setError(data.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Order Error:', error);
      setError(`An error occurred while placing the order: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Checkout</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Delivery Address
            </label>
            <textarea
              id="deliveryAddress"
              name="deliveryAddress"
              rows="3"
              required
              value={formData.deliveryAddress}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="Enter your delivery address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Payment Method
            </label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input
                  id="cash"
                  name="paymentMethod"
                  type="radio"
                  value="cash"
                  checked={formData.paymentMethod === 'cash'}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <label htmlFor="cash" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Cash on Delivery
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="card"
                  name="paymentMethod"
                  type="radio"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Credit/Debit Card
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="upi"
                  name="paymentMethod"
                  type="radio"
                  value="upi"
                  checked={formData.paymentMethod === 'upi'}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <label htmlFor="upi" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  UPI Payment
                </label>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Order Summary</h3>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="text-gray-900 dark:text-white">{item.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="text-gray-900 dark:text-white font-medium">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
            <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="text-gray-900 dark:text-white">
                  ₹{cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                <span className="text-gray-900 dark:text-white">Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span className="text-gray-900 dark:text-white">Total</span>
                <span className="text-indigo-600 dark:text-indigo-400">
                  ₹{cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)}
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout; 