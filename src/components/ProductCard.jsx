import React from "react";

const ProductCard = (props) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="w-full aspect-[1/1] overflow-hidden">
          <img
            src={props.small_image_url}
            className="w-full h-full object-contain"
            alt={props.name}
          />
        </div>

        <div className="flex items-center flex-col">
          <p className="opacity-50">{props.title}</p>
          <p className="font-medium text-lg">{props.name}</p>
          <p>✰✰✰✰✰</p>
          <p className="font-medium">
            {props.sale && props.sale_price ? (
              <span className="flex items-center gap-2">
                <span className="text-gray-500 line-through">
                  ₹{props.price}
                </span>
                <span className="text-gray-900 font-semibold">
                  ₹{props.sale_price}
                </span>
              </span>
            ) : (
              <span className="text-gray-900 font-semibold">
                ₹{props.price}
              </span>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
