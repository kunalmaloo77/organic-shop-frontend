import React from "react";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductsContainer = ({ heading, products, desc }) => {
  const searchFilter = useSelector(
    (state) => state.filterProducts.filteredProducts
  );
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const pageProducts =
    searchFilter.length > 0
      ? searchFilter.slice((currentPage - 1) * 9, currentPage * 9)
      : products.slice((currentPage - 1) * 9, currentPage * 9);
  return (
    <>
      <div className="mt-16 px-6 lg:pl-[3.75rem]">
        <div className="mb-10">
          <div>
            <Link to="/">Home</Link>/{heading}
          </div>
        </div>
        {searchFilter.length > 0 ? (
          <div className="mb-10">
            <h3 className="text-5xl text-[#8BC34A] font-merriweather font-bold">
              Search Results :{" "}
            </h3>
          </div>
        ) : (
          <div className="mb-10">
            <h3 className="text-5xl text-[#8BC34A] font-merriweather font-bold">
              {heading}
            </h3>
          </div>
        )}

        <div className="mb-10">
          <p>{desc}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pageProducts.map((product) => {
            return (
              <React.Fragment key={product.key}>
                <div>
                  <Link to={`/product/${product.key}`}>
                    <ProductCard {...product} />
                  </Link>
                </div>
              </React.Fragment>
            );
          })}
        </div>
        <div>
          <Pagination
            products={searchFilter.length > 0 ? searchFilter : products}
          />
        </div>
      </div>
    </>
  );
};

export default ProductsContainer;
