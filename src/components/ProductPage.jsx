import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  addtocartAction,
  totalQuantityAction,
  updateItemQuantity,
} from "../features/addtocartSlice";
import { ProductDetails } from "./productDetails";
import axios from "axios";
import backendUrl from "../config";
import { LoaderCircle } from "lucide-react";
import { startLoading, stopLoading } from "../features/loadingSlice";
import ProgressiveImage from "./ProgressiveImage";

const ProductPage = () => {
  const { id } = useParams();
  const [value, setValue] = useState(1);
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const cartItems = useSelector((state) => state.addtocart.items);
  const isLoading = useSelector((state) => state.loading.isLoading);

  useEffect(() => {
    async function getProduct() {
      dispatch(startLoading());
      try {
        const res = await axios.get(`${backendUrl}/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error(error);
      }
      dispatch(stopLoading());
    }
    getProduct();
  }, [id, dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin text-nature-green w-10 h-10" />
      </div>
    );
  }

  const handleChange = (e) => {
    setValue(parseInt(e.target.value));
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    let alreadyPresent = false;
    if (cartItems) {
      alreadyPresent = cartItems.find((item) => {
        return item._id === product._id;
      });
    }
    if (alreadyPresent) {
      dispatch(updateItemQuantity({ id: product._id, quantity: value }));
      dispatch(totalQuantityAction(value));
      // localStorage.setItem('items', JSON.stringify(updatedCartItems));
    } else {
      const newItem = {
        ...product,
        quantity: value,
      };
      dispatch(addtocartAction(newItem));
      dispatch(totalQuantityAction(value));
    }
    setValue(1);
  };
  return (
    <>
      <Header />
      <div className="bg-content-background">
        <div className="flex m-auto max-w-[1240px] p-5">
          <div className="mt-8">
            <div className="flex flex-col md:flex-row">
              <div>
                <ProgressiveImage
                  lowResSrc={product.small_image_url}
                  highResSrc={product.image_url}
                  alt={`${product.name}`}
                />
              </div>
              <div className="md:pl-10 md:w-1/2">
                <h1 className="font-merriweather font-bold text-3xl mb-4">
                  {product.name}
                </h1>
                <div className="mb-3">
                  <h2 className="font-merriweather font-bold text-2xl inline">
                    £{product.price}
                  </h2>
                  <h3 className="inline"> + Free Shipping</h3>
                </div>

                <p className="mb-4">{product.description}</p>

                <form onSubmit={handleAddToCart}>
                  <div className="mb-5 md:inline">
                    <label htmlFor={`quantity_${product.key}`}></label>
                    <input
                      type="number"
                      id={`quantity_${product.key}`}
                      name="quantity"
                      autoComplete="off"
                      className="w-14 p-2 mr-12"
                      value={value}
                      min={1}
                      onChange={handleChange}
                    />
                  </div>
                  <button
                    type="submit"
                    name="add_to_cart"
                    className="w-64 p-2 rounded-lg bg-[#6a9739] text-white inline hover:bg-[#8bc34a]"
                  >
                    Add to Cart
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <ProductDetails
          description={product.description}
          productName={product.name}
          productKey={product.key}
          productTitle={product.title}
        />
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
