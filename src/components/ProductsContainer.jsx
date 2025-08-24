import React from "react";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { isNotNullOrEmptyArray } from "../utils/utils";

const ProductsContainer = ({ heading, products, desc }) => {
  const productFilter = useSelector(
    (state) => state.filterProducts.filteredProducts
  );
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const pageProducts =
    productFilter.length > 0
      ? productFilter.slice((currentPage - 1) * 9, currentPage * 9)
      : products.slice((currentPage - 1) * 9, currentPage * 9);

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
      {isNotNullOrEmptyArray(productFilter) ? (
        <div className="mb-6 lg:mb-10">
          <h3 className="text-2xl sm:text-3xl lg:text-5xl text-[#8BC34A] font-merriweather font-bold leading-tight">
            Search Results
          </h3>
          <div className="text-sm text-gray-600 mt-2">
            {productFilter.length} product
            {productFilter.length !== 1 ? "s" : ""} found
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
        {pageProducts.length > 0 ? (
          pageProducts.map((product) => {
            return (
              <React.Fragment key={product.key}>
                <div className="w-full">
                  <Link
                    to={`/product/${product.key}`}
                    className="block h-full hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden"
                  >
                    <ProductCard {...product} />
                  </Link>
                </div>
              </React.Fragment>
            );
          })
        ) : (
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
              {productFilter.length > 0
                ? "Try adjusting your search or filter criteria"
                : "Products will appear here when they become available"}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {isNotNullOrEmptyArray(productFilter) && (
        <div className="flex justify-center pb-8">
          <Pagination
            products={
              isNotNullOrEmptyArray(productFilter) ? productFilter : products
            }
          />
        </div>
      )}
    </div>
  );
};

export default ProductsContainer;
