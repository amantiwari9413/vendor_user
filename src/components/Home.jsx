import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import VendorCard from './VendorCard';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/category/getAllUniqueCategories`);
        const data = await response.json();
        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchVendors = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/vendor/getAllVendor`);
        const data = await response.json();
        if (data.success) {
          setVendors(data.data);
        }
      } catch (error) {
        console.error('Error fetching vendors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    fetchVendors();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero section */}
      <div className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover opacity-50 transform scale-105 animate-pulse-slow"
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt=""
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl transform transition-all duration-500 hover:scale-105">
            Smart supply solutions for street vendors
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl transform transition-all duration-500 hover:scale-105">
            Discover amazing products at unbeatable prices. Shop with confidence and enjoy a seamless shopping experience.
          </p>
          <div className="mt-10">
            <Link
              to="/products"
              className="inline-block bg-indigo-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-indigo-700 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Categories section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transform transition-all duration-500 hover:scale-105">Shop by Category</h2>
        {loading ? (
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex-shrink-0 w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/category/${category}`}
                className="flex-shrink-0 w-32 h-32 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white text-center px-2">
                  {category}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Vendors section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-8 transform transition-all duration-500 hover:scale-105">Our Vendors</h2>
        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse"
              >
                <div className="h-32 bg-gray-200 dark:bg-gray-700" />
                <div className="p-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {vendors.map((vendor, index) => (
              <div
                key={vendor._id}
                className="transform transition-all duration-500"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <VendorCard vendor={vendor} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home; 