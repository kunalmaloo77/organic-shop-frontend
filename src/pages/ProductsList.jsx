import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Filter from "../components/Filter";
import ProductsContainer from "../components/ProductsContainer";
import Header from "../components/Header/Header";
import { useLocation, useSearchParams } from "react-router-dom";

const ProductsList = () => {
  const location = useLocation();
  const category = location.pathname.split("/").pop();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("page")) {
      searchParams.set("page", 1);
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  // Check if filters are active
  const search = searchParams.get("search") || "";
  const minPrice = searchParams.get("min_price");
  const maxPrice = searchParams.get("max_price");
  const hasActiveFilters =
    search.trim() !== "" ||
    (minPrice && minPrice !== "0") ||
    (maxPrice && maxPrice !== "1000");

  const categoryConfig = {
    grocery: {
      title: "Grocery",
      description:
        "Discover the finest selection of fresh produce, dairy essentials, and pantry staples. Packed with quality, our range ensures every meal is delicious and nutritious. From locally sourced fruits to gourmet ingredients, we've got everything you need to elevate your culinary creations. Convenient, affordable, and handpicked for your satisfaction.",
    },
    juice: {
      title: "Juice",
      description:
        "Refresh your senses with our vibrant collection of fruit juices, crafted to bring nature's finest flavors to your glass. From zesty citrus to luscious berry blends, every sip is a burst of pure goodness. Perfect for any time of the day, our juices are packed with nutrition and free from artificial additives, ensuring quality you can trust.",
    },
    shop: {
      title: "Shop",
      description: null,
    },
  };
  const currentCategory = categoryConfig[category] || categoryConfig["shop"];
  return (
    <>
      <Header />
      <div className="bg-content-background">
        <div className="flex flex-col-reverse lg:flex-row max-w-[1260px] m-auto">
          <div className="shrink-0">
            <Filter category={category} />
          </div>
          <div className="grow">
            <ProductsContainer
              heading={currentCategory.title}
              desc={currentCategory.description}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductsList;
