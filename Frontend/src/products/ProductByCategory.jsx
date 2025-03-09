import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PhoneHeader } from "../components/Navbar";
import { getProductByCategory } from "../ApiCallsproducts";
import ProductCard from "../cards/ProductCard";

const ProductByCategory = () => {
  const { category } = useParams(); // Destructure `category` from `useParams`
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch products by category
  const fetchProduct = async () => {
    try {
      const response = await getProductByCategory(category);
      setProducts(response); // Assuming the API returns data in `response.data`
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products. Please try again later.");
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchProduct();
  }, [category]); // Refetch when `category` changes

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  // Show message if no products are found
  if (products?.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-600">
          No products found in this category.
        </p>
      </div>
    );
  }

  return (
    <>
      <PhoneHeader />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center capitalize">
          {category}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product) => {
            const { _id, name, actualPrice, offerPrice, rating, expiryDate, image } =
              product;
            return (
              <ProductCard
                key={_id}
                id={_id}
                name={name}
                price={actualPrice}
                discountedPrice={offerPrice}
                rating={rating}
                expiry={expiryDate}
                image={image.url}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductByCategory;