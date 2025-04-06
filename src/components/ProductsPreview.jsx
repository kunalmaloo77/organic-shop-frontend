import React from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const ProductsPreview = ({ heading, products }) => {
  return (
    <div className="m-auto max-w-[1200px] pb-12 px-4">
      <div className="pt-32 text-center">
        <h1 className="text-4xl font-[Merriweather] font-semibold">
          {heading}
        </h1>
        <img
          src={require("../images/logo-leaf-new.png")}
          className="m-auto pb-10 pt-6"
          alt="leaf logo"
        />
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product.key}`}
            className="p-2.5"
          >
            <ProductCard
              title={product.title}
              name={product.name}
              price={product.price}
              small_image_url={product.small_image_url}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsPreview;
