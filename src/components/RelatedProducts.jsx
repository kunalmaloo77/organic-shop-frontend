import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import axios from "axios";
import backendUrl from "../config";

export const RelatedProducts = ({ productTitle, productKey }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    async function getRelatedProducts() {
      try {
        const res = await axios.get(
          `${backendUrl}/products/get-related-products`,
          {
            params: { title: productTitle, key: productKey },
          }
        );
        setRelatedProducts(res.data.products);
      } catch (error) {
        console.error("Error fetching related products:", error);
        setRelatedProducts([]); // Optionally set to an empty array in case of failure
      }
    }
    if (productTitle && productKey) {
      getRelatedProducts();
    }
  }, [productTitle, productKey]);
  return (
    <div>
      <div className="pt-10">
        <h1 className="text-4xl font-[Merriweather] font-semibold mb-3">
          Related Products
        </h1>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 justify-center">
          {relatedProducts.map((product) => {
            return (
              <React.Fragment key={product.key}>
                <Link to={`/product/${product.key}`}>
                  <div className="p-2.5">
                    <ProductCard
                      title={product.title}
                      name={product.name}
                      price={product.price}
                      small_image_url={product.small_image_url}
                      key={product.key}
                    />
                  </div>
                </Link>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
