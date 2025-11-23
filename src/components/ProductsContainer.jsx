import React from "react";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { isNotNullOrEmptyArray } from "../utils/utils";

export const ProductCardSkeleton = () => {
  return (
    <div className="h-full animate-pulse">
      <div className="w-full aspect-[1/1] bg-[#ebe8e4] flex items-center justify-center">
        <svg
          className="w-16 h-16 text-[#c5c2bf]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      <div className="flex flex-col items-center mt-2 space-y-1">
        <div className="h-4 w-24 bg-[#ebe8e4] rounded" />
        <div className="h-5 w-32 bg-[#ebe8e4] rounded" />
        <div className="h-4 w-20 bg-[#ebe8e4] rounded" />
        <div className="h-5 w-24 bg-[#ebe8e4] rounded" />
      </div>
    </div>
  );
};

const ProductsContainer = ({ heading, desc, hasActiveFilters }) => {
  const products = useSelector((state) => state.products.products);
  const totalPages = useSelector((state) => state.pagination.totalPages);
  const loading = useSelector((state) => state.loading.isLoading);
  return (
    <div className="mt-6 lg:mt-16 px-4 lg:px-6 lg:pl-[3.75rem]">
      {/* Breadcrumb Navigation */}
      <div className="mb-6 lg:mb-10">
        <div className="text-sm lg:text-base text-gray-600">
          <Link to="/" className="hover:text-[#8BC34A] transition-colors">
            Home
          </Link>
          <span className="mx-1 lg:mx-2">/</span>
          <span className="text-gray-900">{heading}</span>
        </div>
      </div>

      {/* Page Title */}
      {hasActiveFilters && isNotNullOrEmptyArray(products) ? (
        <div className="mb-6 lg:mb-10">
          <h3 className="text-2xl sm:text-3xl lg:text-5xl text-[#8BC34A] font-merriweather font-bold leading-tight">
            Search Results:
          </h3>
          <div className="text-sm text-gray-600 mt-2">
            {products.length} product
            {products.length !== 1 ? "s" : ""} found
          </div>
        </div>
      ) : (
        <div className="mb-6 lg:mb-10">
          <h3 className="text-2xl sm:text-3xl lg:text-5xl text-[#8BC34A] font-merriweather font-bold leading-tight">
            {heading}
          </h3>
          {isNotNullOrEmptyArray(products) && (
            <div className="text-sm text-gray-600 mt-2 lg:hidden">
              {products.length} product{products.length !== 1 ? "s" : ""}{" "}
              available
            </div>
          )}
        </div>
      )}

      {/* Description */}
      {desc && (
        <div className="mb-8 lg:mb-10">
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            {desc}
          </p>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 mb-8 lg:mb-10">
        {/* Loading State */}
        {loading &&
          Array.from({ length: 9 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}

        {/* Products Available */}
        {!loading &&
          products.length > 0 &&
          products.map((product) => (
            <div key={product._id} className="w-full">
              <Link
                to={`/product/${product._id}`}
                className="block h-full rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg"
              >
                <ProductCard {...product} />
              </Link>
            </div>
          ))}

        {/* No Products */}
        {!loading && products.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No products found
            </h3>

            <p className="text-gray-500 text-sm max-w-sm">
              {products.length > 0
                ? "Try adjusting your search or filter criteria"
                : "Products will appear here when they become available"}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {isNotNullOrEmptyArray(products) && (
        <div className="flex justify-center pb-8">
          <Pagination products={products} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
};

export default ProductsContainer;
