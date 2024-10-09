import React, { useEffect, useState } from "react";
import { Spin } from "antd"; // Importing Spin for loading spinner
import profile from "../assets/images/profile.png";
import "../App.css";
import {
  Header,
  Footer,
  Button,
  QuantitySelector,
  ProductGallery,
  Icon,
} from "../components";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicStockById } from "../redux/stockSlice";
import { useParams } from "react-router-dom";

function Product() {
  const { stockId } = useParams();
  const dispatch = useDispatch();
  const { stockDetails, loading, error } = useSelector((state) => state.stock);
  const [quantity, setQuantity] = useState(1); // Initial quantity
  const [isMobile, setIsMobile] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Calculate the total price dynamically
  const totalPrice = stockDetails
    ? stockDetails.retail_price_per_unit * quantity
    : 0;

  // Handler to update the quantity
  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  useEffect(() => {
    if (stockId) {
      dispatch(fetchPublicStockById(stockId));
    }
  }, [dispatch, stockId]);

  // Check if screen is mobile-sized
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Set breakpoint for mobile devices
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize); // Listen for window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const bottomHeader = document.querySelector(".bottom-header");
      if (bottomHeader) {
        let stickyOffset = 90;

        if (window.innerWidth <= 768) {
          stickyOffset = 75;
        }
        setIsSticky(window.pageYOffset > stickyOffset);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Loading and error handling
  if (loading) {
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
  if (error) return <p>त्रुटि: {error}</p>;
  if (!stockDetails) return <p>कुनै स्टक विवरण फेला परेन.</p>;
  function convertImage(url) {
    if (url) {
      // Use regex to add "haat" before "/media"
      return url.replace(/(\/)(media\/)/, "$1haat/$2");
    } else {
      return url;
    }
  }
  return (
    <>
      <Header isSticky={isSticky} />

      <div
        className={`container flex flex-col md:flex-row mx-auto pt-4 md:pt-6 mb-7 md:mb-6 gap-6 md:gap-24 ${
          isSticky ? "mt-14 md:mt-20" : ""
        }`}
      >
        <div className="md:w-3/5">
          {/* Loading spinner for the gallery section */}
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <Spin size="large" /> {/* Ant Design Spin component */}
            </div>
          ) : stockDetails &&
            stockDetails.media &&
            stockDetails.media.length > 0 ? (
            <ProductGallery
              images={stockDetails.media.map(
                (mediaItem) => `${mediaItem.file}`
              )}
            />
          ) : stockDetails &&
            stockDetails.variety &&
            stockDetails.variety.photo ? (
            <ProductGallery images={[stockDetails.variety.photo]} />
          ) : (
            <p>No images available</p> // Fallback text if there is no media or variety photo
          )}
        </div>
        <div className="md:w-2/5 text-left">
          {loading ? (
            // Loading spinner for the product details section
            <div className="flex justify-center items-center h-48">
              <Spin size="large" /> {/* Ant Design Spin component */}
            </div>
          ) : error ? (
            <p>Error: {error}</p>
          ) : stockDetails ? (
            <>
              <h2 className="text-3xl">{stockDetails.variety.name}</h2>
              <h3 className="my-3 md:my-4 font-suse text-xl">
                Rs. {stockDetails.retail_price_per_unit}
              </h3>
              <p>
                {stockDetails.description ||
                  "Product description not available."}
              </p>
              <div className="flex justify-between items-center my-1 md:mt-2 md:mb-3 gap-4">
                <QuantitySelector
                  isCart={false}
                  onQuantityChange={handleQuantityChange}
                />
                <h3 className="my-3 md:my-4 font-suse text-xl">
                  Total: Rs. {totalPrice}
                </h3>
              </div>
              <div className="opacity-80 md:mb-1">
                <p>For wholesale :</p>
                <div className="flex justify-between items-center">
                  <p>Minimum Order Quantity : 50Kg</p>
                  <p>Price Per Kg : Rs 80</p>
                </div>
              </div>
              <p className="mb-3 md:mb-3 flex-center before:content-[''] before:block before:w-full before:h-[1px] before:bg-gray-400 before:mr-4 after:content-[''] after:block after:w-full after:h-[1px] after:bg-gray-400 after:ml-4">
                -
              </p>
              <div className="flex justify-between items-center mb-6 md:mb-6">
                <div className="flex items-center md:flex-center gap-3">
                  <h4 className="text-lg">Inquiry:</h4>
                  <ul className="list-none flex items-center gap-2 text-lg">
                    <Icon isFooter={false} />
                  </ul>
                </div>
                <Link to="/cart">
                  <Button
                    faCode={faCartShopping}
                    text={isMobile ? "Cart" : "Add to Cart"}
                  />
                </Link>
              </div>
              <h4 className="text-lg font-semibold">Seller Details :</h4>
              <div className="bg-[#dff9bd] border px-4 py-3 rounded-lg hover:shadow-xl mt-2">
                <div className="flex items-center gap-6">
                  <img className="md:w-20" src={profile} alt="" />
                  <div>
                    <p>
                      {stockDetails.user.username ||
                        "Seller name not available."}
                    </p>
                    <Link
                      to={`tel:${stockDetails.user.email || "not available"}`}
                    >
                      {stockDetails.user.email ||
                        "Contact number not available."}
                    </Link>
                    <p>123 - Karma Street, Karmandu</p>
                    <Link to="tel:9876543210">9876543210</Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>No stock details found.</p>
          )}
        </div>
      </div>
      {/* <div className="pt-6 pb-7 md:pb-10 bg-[#fff7cb]">
        <div className="flex justify-between mb-3 container">
          <h3 className="text-2xl font-semibold md:text-left w-fit">
            सम्बन्धित उत्पादनहरू
          </h3>
          <Link
            className="font-semibold group sm:flex-center hidden"
            to="/products"
          >
            View More
            <FontAwesomeIcon
              className="ms-2 transition-transform group-hover:animate-swish"
              icon={faMinus}
            />
          </Link>
        </div>
        <CardSection />
      </div> */}
      <Footer />
    </>
  );
}

export default Product;
