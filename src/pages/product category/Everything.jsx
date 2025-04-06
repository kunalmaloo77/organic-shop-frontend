import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { searchFilterAction } from "../../features/filterProductsSlice";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Filter from "../../components/Filter";
import ProductsContainer from "../../components/ProductsContainer";
import backendUrl from "../../config";
import { useLocation } from "react-router-dom";

const Everything = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const category = location.pathname.split("/").pop();

  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      try {
        const res = await axios.get(`${backendUrl}/products`);
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    getProducts();
    dispatch(searchFilterAction([]));
  }, [dispatch]);

  const categoryConfig = {
    grocery: {
      title: "Groceries",
      description:
        "Discover the finest selection of fresh produce, dairy essentials, and pantry staples. Packed with quality, our range ensures every meal is delicious and nutritious. From locally sourced fruits to gourmet ingredients, we've got everything you need to elevate your culinary creations. Convenient, affordable, and handpicked for your satisfaction.",
      filter: (product) => product.title === "Groceries",
    },
    juice: {
      title: "Juice",
      description:
        "Refresh your senses with our vibrant collection of fruit juices, crafted to bring nature's finest flavors to your glass. From zesty citrus to luscious berry blends, every sip is a burst of pure goodness. Perfect for any time of the day, our juices are packed with nutrition and free from artificial additives, ensuring quality you can trust.",
      filter: (product) => product.title === "Juice",
    },
    shop: {
      title: "Shop",
      description: null,
      filter: () => true,
    },
  };
  const currentCategory = categoryConfig[category] || categoryConfig.shop;
  const filteredProducts = products.filter(currentCategory.filter);

  const filterSideProducts =
    products.length > 0 ? [products[7], products[5], products[10]] : [];

  return (
    <>
      <Header />
      <div className="bg-content-background">
        <div className="flex flex-col-reverse lg:flex-row max-w-[1260px] m-auto">
          <Filter sideProducts={filterSideProducts} products={products} />
          <div className="grow">
            <ProductsContainer
              heading={currentCategory.title}
              products={filteredProducts}
              desc={currentCategory.description}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Everything;
