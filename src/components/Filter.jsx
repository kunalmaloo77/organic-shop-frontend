import { Link, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productAction, startLoading } from "../features/productsSlice";
import { setTotalPages } from "../features/paginationSlice";
import { Range, getTrackBackground } from "react-range";
import { ProductCardSkeleton } from "./ProductsContainer";
import useDebounce from "../hooks/useDebounce";
import instance from "../utils/axios";

const Filter = ({ category }) => {
  const STEP = 50;
  const MIN = 0;
  const MAX = 1000;
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const loading = useSelector((state) => state.products.loading);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [values, setValues] = useState([
    parseInt(searchParams.get("min_price")) || MIN,
    parseInt(searchParams.get("max_price")) || MAX,
  ]);
  const [minPrice, setMinPrice] = useState(
    parseInt(searchParams.get("min_price")) || MIN
  );
  const [maxPrice, setMaxPrice] = useState(
    parseInt(searchParams.get("max_price")) || MAX
  );
  const [sideProducts, setSideProducts] = useState([]);

  const debounceSearch = useDebounce(search);
  const page = searchParams.get("page") || 1;

  useEffect(() => {
    fetchProducts();
  }, [debounceSearch, page, minPrice, maxPrice, category]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("min_price", minPrice.toString());
    params.set("max_price", maxPrice.toString());
    setSearchParams(params);
  }, [minPrice, maxPrice]);

  async function fetchProducts() {
    try {
      dispatch(startLoading());
      const { data } = await instance.get(
        `/products?search=${debounceSearch}&page=${page}&min_price=${minPrice}&max_price=${maxPrice}&category=${category}`
      );
      const allProducts = await data.data.products;
      const totalPages = data.data.totalPages;

      if (allProducts.length > 0) {
        setSideProducts(allProducts.slice(0, 3));
      }
      dispatch(productAction(allProducts));
      dispatch(setTotalPages(totalPages));
    } catch (error) {
      console.error("Failed to fetch products:", error);
      dispatch(productAction([]));
    }
  }

  const handleSubmitPriceFilter = (e) => {
    e.preventDefault();
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
  };

  return (
    <div className="lg:mt-16 px-4 lg:px-6 lg:border-r-2 lg:border-gray-300">
      <form className="mb-8">
        <label htmlFor="searchName"></label>
        <input
          type="search"
          id="searchName"
          name="searchName"
          placeholder="Search products..."
          onChange={(e) => setSearch(e.target.value)}
          className="px-[0.5rem] py-[0.375rem] border-[1px] border-slate-300 w-full"
        />
      </form>

      <div className="mb-10">
        <h3 className="text-2xl mb-4 font-merriweather">Filter by price</h3>
        <div className="flex flex-col">
          <Range
            values={values}
            step={STEP}
            min={MIN}
            max={MAX}
            onChange={(values) => setValues(values)}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: "36px",
                  display: "flex",
                  width: "100%",
                }}
              >
                <div
                  ref={props.ref}
                  style={{
                    height: "5px",
                    width: "100%",
                    borderRadius: "4px",
                    background: getTrackBackground({
                      values: values,
                      colors: ["#ccc", "#8bc34a", "#ccc"],
                      min: MIN,
                      max: MAX,
                    }),
                    alignSelf: "center",
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "16px",
                  width: "16px",
                  borderRadius: "50%",
                  backgroundColor: "#8bc34a",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></div>
            )}
          />
          <div className="flex w-full justify-between mt-2">
            <div className="p-3 bg-white">{values[0]}</div>
            <div className="p-3 bg-white">{values[1]}</div>
          </div>
          <button
            onClick={handleSubmitPriceFilter}
            className="mt-4 px-2 py-2 border-2 rounded hover:bg-nature-green hover:text-white"
          >
            Go
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <ul>
          <li className="pl-2 text-[#8bc34a] mb-[10px]">
            <Link to="/product-category/grocery">Groceries</Link>
          </li>
          <li className="pl-2 text-[#8bc34a] mb-[10px]">
            <Link to="/product-category/juice">Juices</Link>
          </li>
        </ul>
      </div>
      <div>
        {loading &&
          Array.from({ length: 2 }).map((_, i) => (
            <div className="flex flex-col mb-4">
              <ProductCardSkeleton key={i} />
            </div>
          ))}

        {!loading &&
          sideProducts.length > 0 &&
          sideProducts.map((product) => {
            return (
              <React.Fragment key={product.key}>
                <div className="flex flex-col">
                  <a href="/">
                    <img
                      src={product.small_image_url}
                      alt={`${product.image}`}
                      className="h-60 w-60 mb-2"
                    />
                    <h1 className="text-[#8bc34a] cursor-pointer">
                      {product.name}
                    </h1>
                    <p className="mb-4 font-light">₹{product.price}</p>
                  </a>
                </div>
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
};

export default Filter;
