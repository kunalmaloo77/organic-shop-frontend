import { useState } from "react";

export const ReviewSection = ({ productName }) => {
  const [rating, setRating] = useState(0);

  return (
    <div className="bg-content-background">
      <p className="text-gray-500 my-4">There are no reviews yet.</p>
      <div className="border-[1px] border-gray-300 p-6 my-6">
        <h3 className="text-xl font-semibold mb-4">
          Be the first to review <span className="font-bold">"{productName}"</span>
        </h3>
        <p className="text-gray-500 mb-2">
          Your email address will not be published. Required fields are marked{" "}
          <span className="text-red-500">*</span>
        </p>

        {/* Rating */}
        <div className="mb-4">
          <label className="font-medium block mb-1">Your rating <span className="text-red-500">*</span></label>
          <div className="flex space-x-1">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <svg
                  key={i}
                  onClick={() => setRating(i + 1)}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 cursor-pointer ${i < rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  />
                </svg>
              ))}
          </div>
        </div>

        {/* Review */}
        <div className="mb-4">
          <label className="font-medium block mb-1">
            Your review
            <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full h-32 p-3 border border-gray-300 rounded-md"
            placeholder="Write your review here"
          />
        </div>

        {/* Name and Email */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="font-medium block mb-1">
              Name
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="font-medium block mb-1">
              Email
              <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Your Email"
            />
          </div>
        </div>

        {/* Save information checkbox */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-green-500"
            />
            <span className="ml-2 text-gray-600">
              Save my name, email, and website in this browser for the next time I comment.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button className="bg-[#6a9739] text-white px-6 py-2 rounded-md hover:bg-[#8BC34A]">
          Submit
        </button>
      </div>
    </div>
  );
};
