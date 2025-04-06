import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CardHome from "../components/CardHome.jsx";
import BannerImage from "../components/BannerImage.jsx";
import ProductsPreview from "../components/ProductsPreview.jsx";
import FoodPreview from "../components/FoodPreview.jsx";
import CustomerReview from "../components/CustomerReview.jsx";
import axios from "axios";
import backendUrl from "../config.js";

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      try {
        const { data } = await axios.get(`${backendUrl}/products`);
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }
    getProducts();
  }, []);
  const bestSelling =
    products.length >= 8
      ? [products[0], products[5], products[6], products[7]]
      : [];
  const trending =
    products.length >= 8
      ? [products[0], products[3], products[6], products[7]]
      : [];
  return (
    <>
      <Header />
      <BannerImage />
      <CardHome />
      <ProductsPreview
        heading={"Best Selling Products"}
        products={bestSelling}
      />
      <div className="flex justify-center">
        <img
          src={require("../images/basil-leaf.png")}
          alt="basil"
          className="w-40 mb-[-48px] pb-[8px]"
        ></img>
      </div>
      <FoodPreview />
      <ProductsPreview heading={"Trending Products"} products={trending} />
      <CustomerReview />
      <Footer />
    </>
  );
};

export default Home;
