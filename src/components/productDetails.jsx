import { useState } from "react";
import { ReviewSection } from "./ReviewSection";
import { RelatedProducts } from "./RelatedProducts";

export const ProductDetails = ({
  description,
  productName,
  productKey,
  productTitle,
}) => {
  const [descReviews, setDescReviews] = useState(true);
  return (
    <div className="m-auto max-w-[1240px] p-5">
      <div
        className={`flex flex-col gap-y-2 md:flex-row md:gap-x-5 border-t-2 w-full relative`}
      >
        <button
          className={`flex relative w-full md:w-auto font-semibold text-lg ${
            descReviews ? "selected-tab text-[#808080]" : "text-[#36454F]"
          }`}
          onClick={() => setDescReviews(true)}
        >
          <span>Description</span>
        </button>
        <button
          className={`flex relative w-full md:w-auto font-semibold  text-lg ${
            !descReviews ? "selected-tab text-[#808080]" : "text-[#36454F]"
          }`}
          onClick={() => setDescReviews(false)}
        >
          <span>Reviews</span>
        </button>
      </div>
      {descReviews && <div className="py-5">{description}</div>}
      {!descReviews && <ReviewSection productName={productName} />}
      {productName && (
        <RelatedProducts productTitle={productTitle} productKey={productKey} />
      )}
    </div>
  );
};
