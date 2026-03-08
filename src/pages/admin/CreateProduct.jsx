import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import { X, Save, ArrowLeft, Sparkles } from "lucide-react";
import { createEditProdcutSchema } from "../../schemas";
import { useNavigate } from "react-router-dom";
import instance from "../../utils/axios";
import axios from "axios";
import imageCompression from "browser-image-compression";

const CreateProduct = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      key: "",
      title: "grocery",
      name: "",
      price: "",
      sale: false,
      status: "active",
      sale_price: "",
      description: "",
      filename: "",
      fileType: "",
    },
    validationSchema: createEditProdcutSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        const file = fileInputRef.current.files[0];
        if (values.fileType.startsWith("image/") && file) {
          const {
            data: {
              data: { largeImageUploadUrl, smallImageUploadUrl },
            },
          } = await instance.post("/admin/get-upload-image-url", {
            filename: values.filename,
            contentType: values.fileType,
          });
          // Upload large image to s3
          await axios.put(largeImageUploadUrl, file, {
            headers: {
              "Content-Type": values.fileType,
            },
          });

          const options = {
            maxSizeMB: 1, // Max size in megabytes
            maxWidthOrHeight: 300, // Max width or height in pixels
            useWebWorker: true, // Use web worker for better performance
          };

          // Compress image before uploading small version for thumbnail
          try {
            const compressedFile = await imageCompression(file, options);
            // Upload small image to s3
            await axios.put(smallImageUploadUrl, compressedFile, {
              headers: {
                "Content-Type": values.fileType,
              },
            });
          } catch (error) {
            console.error("Error compressing image:", error);
          }
        }

        await instance.post("/admin/create-product", values);
        alert("Product created successfully!");
        navigate("/admin/products");
      } catch (error) {
        console.error("Error creating product:", error);
        alert("Failed to create product. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleImageUpload = () => {
    const file = fileInputRef.current?.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
    formik.setFieldValue("fileType", file?.type);
    formik.setFieldValue("filename", file?.name);
    return () => URL.revokeObjectURL(imageUrl);
  };

  const handleGenerateWithAI = async () => {
    const file = fileInputRef.current?.files[0];
    if (!file) return;

    try {
      setIsGenerating(true);
      const reader = new FileReader();
      const imageBase64 = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const { data } = await instance.post("/admin/generate-ai-description", {
        imageBase64,
        imageType: file.type,
        productName: formik.values.name || "",
      });

      const { description, category, name } = data.data;
      if (description) formik.setFieldValue("description", description);
      if (category && ["grocery", "juice"].includes(category)) {
        formik.setFieldValue("title", category);
      }
      if (name) formik.setFieldValue("name", name);
    } catch (error) {
      console.error("Error generating description:", error);
      alert("Failed to generate description. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    try {
      if (fileInputRef.current) fileInputRef.current.value = null;
    } catch (e) {
      console.log("Error clearing file input:", e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100  transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Create New Product
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Add a new product to your inventory
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white  shadow-sm p-6">
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              {/* Category Title */}
              <div>
                <label
                  htmlFor="title"
                  className="text-sm font-medium text-gray-700 mb-2"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="title"
                  name="title"
                  className={`w-full px-4 py-2 border ${
                    formik.touched.title && formik.errors.title
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                >
                  <option value="grocery">Grocery</option>
                  <option value="juice">Juice</option>
                </select>
                {formik.touched.title && formik.errors.title && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.title}
                  </p>
                )}
              </div>

              {/* Product Name */}
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700 mb-2"
                >
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g., Assorted Coffee"
                  className={`w-full px-4 py-2 border ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 35"
                  className={`w-full px-4 py-2 border ${
                    formik.touched.price && formik.errors.price
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                />
                {formik.touched.price && formik.errors.price && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.price}
                  </p>
                )}
              </div>

              {/* Sale Checkbox */}
              <div className="flex items-center pt-8">
                <input
                  id="sale"
                  name="sale"
                  type="checkbox"
                  className="w-4 h-4 border-gray-300"
                  onChange={(e) => {
                    const checked = e.target.checked;
                    formik.setValues(
                      {
                        ...formik.values,
                        sale: checked,
                        sale_price: checked ? formik.values.sale_price : "",
                      },
                      true,
                    );
                  }}
                  checked={formik.values.sale}
                />
                <label
                  htmlFor="sale"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  Mark as on sale
                </label>
              </div>

              <div className="flex items-center pt-8">
                <input
                  id="status"
                  name="status"
                  type="checkbox"
                  className="w-4 h-4 border-gray-300"
                  onChange={(e) => {
                    const checked = e.target.checked;
                    formik.setValues(
                      {
                        ...formik.values,
                        status: checked ? "active" : "inactive",
                      },
                      true,
                    );
                  }}
                  checked={formik.values.status === "active"}
                />
                <label
                  htmlFor="status"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  Set as Active
                </label>
              </div>

              {/* Sale Price */}
              <div>
                <label
                  htmlFor="sale_price"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  Sale Price ($) <span className="text-red-500">*</span>
                </label>
                <input
                  disabled={!formik.values.sale}
                  id="sale_price"
                  name="sale_price"
                  type="number"
                  placeholder="e.g., 15"
                  className={`w-full px-4 py-2 border ${
                    formik.touched.sale_price && formik.errors.sale_price
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sale_price}
                />
                {formik.touched.sale_price && formik.errors.sale_price && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.sale_price}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  placeholder="Enter product description (minimum 20 characters)"
                  className={`w-full px-4 py-2 border resize-none ${
                    formik.touched.description && formik.errors.description
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                />
                <div className="flex items-center justify-between mt-1">
                  {formik.touched.description && formik.errors.description ? (
                    <p className="text-sm text-red-500">
                      {formik.errors.description}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500">
                      {formik.values.description.length}/500 characters
                    </p>
                  )}
                </div>
              </div>

              {/* Image Upload */}
              <div className="md:col-span-2">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Upload Image <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    id="image"
                    name="image"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className={`flex-1 px-4 py-2 border ${
                      formik.touched.filename && formik.errors.filename
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    onChange={handleImageUpload}
                    onBlur={formik.handleBlur}
                  />
                  {fileInputRef?.current?.files[0] && (
                    <button
                      type="button"
                      onClick={clearImage}
                      className="p-2 text-red-600 hover:bg-red-50  transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                {imagePreview && (
                  <div className="mt-3 relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="object-cover  border border-gray-200 max-h-64"
                    />
                  </div>
                )}
                {imagePreview && (
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={handleGenerateWithAI}
                      disabled={isGenerating}
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                        isGenerating
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-nature-green text-white hover:bg-secondary-nature"
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                      {isGenerating ? "Generating..." : "Generate with AI"}
                    </button>
                    <p className="text-xs text-gray-500 mt-1">
                      AI will fill in the description and category based on the
                      image.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  formik.resetForm();
                  setImagePreview(null);
                  try {
                    if (fileInputRef.current) fileInputRef.current.value = null;
                  } catch (e) {}
                }}
                className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium transition-colors"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !formik.isValid}
                className={`px-6 py-2 font-medium transition-colors flex items-center gap-2 ${
                  isSubmitting || !formik.isValid
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-nature-green text-white hover:bg-secondary-nature"
                }`}
              >
                <Save className="w-4 h-4" />
                {isSubmitting ? "Creating..." : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
