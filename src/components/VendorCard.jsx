const VendorCard = ({ vendor }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200 dark:bg-gray-700">
        <img
          src="https://store.webkul.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/o/mobikul-cs-cart-vendor-app.png"
          alt={vendor.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-3">
        <h3 className="text-base font-medium text-gray-900 dark:text-white truncate">
          {vendor.name}
        </h3>
        <div className="mt-1 space-y-0.5">
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            <span className="font-medium">Phone:</span> {vendor.phone}
          </p>
          <div className="flex items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Rating:</span>
            <div className="ml-1 flex items-center">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`h-3 w-3 ${
                    index < vendor.rating
                      ? 'text-yellow-400'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorCard; 