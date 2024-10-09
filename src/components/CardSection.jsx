import React, { useEffect, useState } from "react";
import { Card } from ".";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicVegetables } from "../redux/stockSlice";
import { Spin } from "antd";
import { useParams } from "react-router-dom";
import api from "../utils/api";

function CardSection({ heading, qTShow }) {
  const dispatch = useDispatch();
  const { categoryId } = useParams();

  const { stocks } = useSelector((state) => state.stock);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(fetchPublicVegetables());
  }, [dispatch]);

  useEffect(() => {
    if (categoryId) {
      setIsLoading(true);
      setError(null);
      api
        .get(`v1/public-category-vegetable/${categoryId}/show/`)
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
    } else {
      setCategoryProducts(null); // Reset when no category is selected
    }
  }, [categoryId]);

  function convertImage(url) {
    if (url) {
      return url.replace(/(\/)(media\/)/, "$1haat/$2");
    } else {
      return url;
    }
  }

  // Use categoryProducts if available, otherwise use filtered stocks
  const displayProducts = categoryId ? categoryProducts : stocks;

  const cardData = displayProducts.map((item) => ({
    title: item.variety?.name || item.name,
    image:
      item.media?.length > 0
        ? convertImage(item.media[0].file)
        : convertImage(item.variety?.photo || item.photo),
    maxQty: item.stock_quantity,
    wholesale_price: `रु.${Math.floor(
      item.retail_price_per_unit || item.retail_price
    )}`,
    Retail_price: `रु.${Math.floor(
      item.wholesale_price_per_unit || item.wholesale_price
    )}`,
    seller: item.user?.username || "N/A",
    stockId: item.id,
  }));

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (error) return <div className="container">{error}</div>;

  return (
    <section>
      <div className="container">
        {heading && (
          <div className="flex justify-between">
            <h3 className="text-2xl font-semibold mx-auto sm:mx-0 w-fit mb-3">
              {heading}
            </h3>
          </div>
        )}
        {cardData.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {cardData.slice(0, qTShow).map((card, index) => (
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
          <div>
            {" "}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <Spin size="large" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CardSection;
