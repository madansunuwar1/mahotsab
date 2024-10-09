import React, { useState, useEffect } from "react";
import "../App.css";
import { Card } from ".";
import { useParams } from "react-router-dom";
import api from "../utils/api"; // Add this import

function ProductData() {
  const { id } = useParams();
  const [categoryProducts, setCategoryProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      setError(null);
      api
        .get(`v1/public-category-vegetable/${id}/show/`)
        .then((response) => {
          console.log(response.data.results);
          setCategoryProducts(response.data.results);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching category products:", error);
          setError("Failed to fetch category products. Please try again.");
          setIsLoading(false);
        });
    }
  }, [id]);

  function convertImage(url) {
    if (url) {
      return url.replace(/(\/)(media\/)/, "$1haat/$2");
    } else {
      return url;
    }
  }

  const cardData = categoryProducts?.length
    ? categoryProducts.map((item) => ({
        title: item.variety?.name || item.name || "Unknown",
        image: convertImage(item.variety?.photo || item.photo || ""),
        maxQty: item.stock_quantity || 0,
        wholesale_price: `रु.${
          item.retail_price_per_unit || item.retail_price || 0
        }`,
        Retail_price: `रु.${
          item.wholesale_price_per_unit || item.wholesale_price || 0
        }`,
        seller: item.user?.username || "N/A",
        stockId: item.id || "unknown",
      }))
    : [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      {cardData.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {cardData.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              image={card.image}
              maxQty={card.maxQty}
              price={card.wholesale_price}
              seller={card.seller}
              stockId={card.stockId}
            />
          ))}
        </div>
      ) : (
        <div>No products available for this category.</div>
      )}
    </>
  );
}

export default ProductData;
